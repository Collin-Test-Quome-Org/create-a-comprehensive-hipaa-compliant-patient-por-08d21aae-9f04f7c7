import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle, AlertCircle, FileText, CalendarCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'

// Fake data for demonstration
type NotificationType = 'appointment' | 'lab' | 'document' | 'general'

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  date: string
  read: boolean
}

const NOTIFICATION_ICON_MAP: Record<NotificationType, JSX.Element> = {
  appointment: <CalendarCheck className="text-blue-700" size={28} />,
  lab: <FileText className="text-green-600" size={28} />,
  document: <FileText className="text-slate-600" size={28} />,
  general: <Bell className="text-gray-400" size={28} />,
}

const fakeNotifications: Notification[] = [
  {
    id: '1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Smith for June 8th at 2:00 PM has been confirmed.',
    type: 'appointment',
    date: '2024-06-01T14:30:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Lab Results Ready',
    message: 'Your recent blood test results are now available in your medical records.',
    type: 'lab',
    date: '2024-05-30T09:00:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Document Uploaded',
    message: 'A new MRI scan has been uploaded to your documents section.',
    type: 'document',
    date: '2024-05-28T16:15:00Z',
    read: true,
  },
  {
    id: '4',
    title: 'Welcome to HIPAA Patient Portal',
    message: 'Thank you for joining our secure healthcare community!',
    type: 'general',
    date: '2024-05-25T12:00:00Z',
    read: true,
  },
]

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    setNotifications(fakeNotifications)
  }, [])

  function markAsRead(id: string) {
    setNotifications(notifications => notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function markAllAsRead() {
    setNotifications(notifications => notifications.map(n => ({ ...n, read: true })))
  }

  const filtered =
    filter === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Bell className="text-blue-700" size={36} />
          <h1 className="text-3xl font-bold font-inter tracking-tight">Notifications</h1>
        </div>
        <p className="font-roboto text-slate-700 mb-2">
          Stay in the loop. Here are your real-time updates and alerts from the HIPAA Patient Portal.
        </p>
      </motion.div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button id="filter-all" variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
          <Button id="filter-unread" variant={filter === 'unread' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('unread')}>Unread</Button>
        </div>
        <Button id="mark-all-read" variant="ghost" onClick={markAllAsRead} disabled={notifications.every(n => n.read)}>
          <CheckCircle className="mr-2 w-4 h-4" /> Mark all as read
        </Button>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-500 py-16"
            >
              <AlertCircle className="mx-auto mb-2 text-slate-300" size={44} />
              <p>No notifications to show.</p>
            </motion.div>
          ) : (
            filtered.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                <Card className={classNames('flex items-start gap-4 p-3', {
                  'border-blue-200 shadow-lg bg-blue-50/50': !n.read,
                  'opacity-80': n.read,
                })}>
                  <div className="flex-shrink-0 mt-2">
                    {NOTIFICATION_ICON_MAP[n.type]}
                  </div>
                  <div className="flex-1">
                    <CardHeader className="p-0 mb-1 flex flex-row items-center gap-2">
                      <span className="font-bold font-inter text-lg text-slate-800">
                        {n.title}
                      </span>
                      {!n.read && <Badge id={`unread-badge-${n.id}`} variant="default" className="bg-blue-700 text-white ml-2">Unread</Badge>}
                    </CardHeader>
                    <CardContent className="p-0 text-slate-700 font-roboto">
                      {n.message}
                    </CardContent>
                    <div className="text-xs text-slate-400 mt-2">
                      {new Date(n.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                  {!n.read && (
                    <Button
                      id={`mark-read-${n.id}`}
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      aria-label="Mark as read"
                      onClick={() => markAsRead(n.id)}
                    >
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                    </Button>
                  )}
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

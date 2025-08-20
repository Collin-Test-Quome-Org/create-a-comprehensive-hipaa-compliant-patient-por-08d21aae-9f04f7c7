import { Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Fake notification data
const fakeNotifications = [
  {
    id: 'n1',
    type: 'Appointment',
    title: 'New appointment scheduled',
    description: 'John Doe has scheduled an appointment for 10/12/2024 at 3:00pm.',
    date: '2024-06-07T15:30:00Z',
    read: false,
  },
  {
    id: 'n2',
    type: 'Lab Result',
    title: 'Lab result available',
    description: 'Lab results for Jane Smith are ready to review.',
    date: '2024-06-06T10:00:00Z',
    read: false,
  },
  {
    id: 'n3',
    type: 'Message',
    title: 'New secure message',
    description: 'Message received from Dr. Lopez regarding patient follow-up.',
    date: '2024-06-05T14:20:00Z',
    read: true,
  },
  {
    id: 'n4',
    type: 'Prescription',
    title: 'Prescription refill requested',
    description: 'Refill request for Amoxicillin (Jane Smith).',
    date: '2024-06-05T09:45:00Z',
    read: true,
  },
]

export function StaffNotificationsPage() {
  const [notifications, setNotifications] = useState(fakeNotifications)

  function markAllRead() {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
        className="flex items-center gap-3 mb-6"
      >
        <Bell className="h-8 w-8 text-blue-700" />
        <h1 className="font-inter font-bold text-3xl text-blue-900 tracking-tight">Staff Notifications</h1>
        <Badge variant="outline" className="ml-2 text-blue-700 border-blue-700 bg-blue-50">
          {notifications.filter(n => !n.read).length} Unread
        </Badge>
        <Button id="mark-all-read-btn" variant="ghost" size="sm" onClick={markAllRead} className="ml-auto">
          Mark all as read
        </Button>
      </motion.div>
      <div className="space-y-4">
        {notifications.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <p className="text-slate-500">No notifications at this time. You’re all caught up!</p>
          </motion.div>
        )}
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className={
              'flex flex-col md:flex-row items-start justify-between border ' +
              (notif.read ? 'border-slate-200 bg-white' : 'border-blue-300 bg-blue-50/70 shadow-md')
            }>
              <CardHeader className="flex-row items-center gap-4 flex-1">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    {notif.title}
                    {!notif.read && <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />}
                  </CardTitle>
                  <div className="text-xs text-slate-500 mt-1">{new Date(notif.date).toLocaleString()}</div>
                </div>
                <Badge variant="secondary" className="ml-4 text-xs">
                  {notif.type}
                </Badge>
              </CardHeader>
              <CardContent className="text-slate-700 flex-1 pb-4 pt-0">
                <div className="mb-2">{notif.description}</div>
                {!notif.read && (
                  <Button id={`mark-read-btn-${notif.id}`} variant="outline" size="sm" onClick={() => markRead(notif.id)}>
                    Mark as read
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

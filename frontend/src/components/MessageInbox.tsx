import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Search, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Mock threads
const mockThreads = [
  {
    id: 'thread-1',
    with: 'Dr. Emily Carter',
    lastMessage: 'Absolutely! I have availability next week—let me know your preferred day.',
    unread: true,
    updated: '2024-06-01T10:15:00Z',
  },
  {
    id: 'thread-2',
    with: 'Care Team',
    lastMessage: 'Your lab results have been uploaded to your portal.',
    unread: false,
    updated: '2024-05-29T16:02:00Z',
  },
  {
    id: 'thread-3',
    with: 'Nurse Jordan Lee',
    lastMessage: 'Your prescription refill has been approved.',
    unread: false,
    updated: '2024-05-28T11:43:00Z',
  },
]

export function MessageInbox() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredThreads = mockThreads.filter(
    t => t.with.toLowerCase().includes(search.toLowerCase()) || t.lastMessage.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="max-w-2xl mx-auto mt-4 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Mail className="h-5 w-5 text-blue-600" /> Secure Messaging Inbox
        </CardTitle>
        <Button
          id="new-message-btn"
          variant="default"
          onClick={() => navigate('/messages/new')}
          className="gap-1"
        >
          <MessageCircle className="h-4 w-4" /> New Message
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2 items-center">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            id="search-messages-input"
            placeholder="Search by provider or message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
            autoComplete="off"
          />
        </div>
        <ul className="divide-y divide-slate-100">
          {filteredThreads.length === 0 && (
            <li className="text-center text-gray-400 py-12">No conversations found.</li>
          )}
          {filteredThreads.map(thread => (
            <li
              key={thread.id}
              className={cn(
                'py-4 px-2 flex flex-col cursor-pointer transition hover:bg-blue-50 rounded-lg',
                thread.unread && 'bg-blue-50/60'
              )}
              onClick={() => navigate(`/messages/${thread.id}`)}
              tabIndex={0}
              aria-label={`Open conversation with ${thread.with}`}
              onKeyDown={e => e.key === 'Enter' && navigate(`/messages/${thread.id}`)}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue-900">{thread.with}</span>
                <span className="text-xs text-gray-400">{new Date(thread.updated).toLocaleString()}</span>
              </div>
              <span className={cn('truncate mt-1 text-base', thread.unread ? 'font-bold text-blue-800' : 'text-gray-700')}>
                {thread.lastMessage}
              </span>
              {thread.unread && <span className="inline-block rounded-full bg-blue-500 w-2 h-2 mt-2" aria-label="unread" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

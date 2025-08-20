import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Paperclip, Send } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Fake data for demonstration
const mockThread = {
  id: 'thread-1',
  with: 'Dr. Emily Carter',
  participants: ['You', 'Dr. Emily Carter'],
  messages: [
    {
      id: 'msg-1',
      sender: 'Dr. Emily Carter',
      text: 'Hello, I wanted to follow up on your recent lab results. Please let me know if you have any questions.',
      sentAt: '2024-06-01T09:22:00Z',
      attachments: [],
    },
    {
      id: 'msg-2',
      sender: 'You',
      text: 'Thank you, Dr. Carter. Can I schedule a follow-up appointment?',
      sentAt: '2024-06-01T10:05:00Z',
      attachments: [],
    },
    {
      id: 'msg-3',
      sender: 'Dr. Emily Carter',
      text: 'Absolutely! I have availability next week—let me know your preferred day.',
      sentAt: '2024-06-01T10:15:00Z',
      attachments: [],
    },
  ],
}

export function MessageThreadView({ threadId }: { threadId: string }) {
  const [messages, setMessages] = useState(mockThread.messages)
  const [newMessage, setNewMessage] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim()) return
    const msg = {
      id: `msg-${messages.length + 1}`,
      sender: 'You',
      text: newMessage,
      sentAt: new Date().toISOString(),
      attachments: attachment ? [attachment.name] : [],
    }
    setMessages([...messages, msg])
    setNewMessage('')
    setAttachment(null)
  }

  return (
    <Card className="max-w-2xl mx-auto h-[32rem] flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 border-b">
        <CardTitle className="flex-1 text-blue-800">
          Secure Conversation with <span className="font-bold">{mockThread.with}</span>
        </CardTitle>
        <span className="text-xs text-gray-400">Encrypted</span>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto py-4 px-4 bg-slate-50">
        <div className="flex flex-col gap-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                'flex flex-col max-w-lg',
                msg.sender === 'You' ? 'self-end items-end' : 'self-start items-start'
              )}
              aria-label={`message-from-${msg.sender}`}
            >
              <div className={cn(
                'rounded-2xl px-4 py-2 shadow text-base',
                msg.sender === 'You'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-white text-gray-900 border'
              )}>
                <span>{msg.text}</span>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {msg.attachments.map((a, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                        <Paperclip className="h-3 w-3 mr-1" /> {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-xs mt-1 text-gray-400">
                {msg.sender} • {new Date(msg.sentAt).toLocaleString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <form onSubmit={handleSend} className="flex flex-col gap-2 border-t bg-white p-4">
        <div className="flex gap-2 items-center">
          <Textarea
            id="message-input"
            placeholder="Type your secure message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className="flex-1 resize-none min-h-[44px]"
            required
            aria-label="Message input"
          />
          <label htmlFor="attachment-upload" className="cursor-pointer">
            <Input
              id="attachment-upload"
              type="file"
              className="hidden"
              onChange={e => setAttachment(e.target.files?.[0] || null)}
            />
            <Paperclip className={cn('text-blue-700 hover:text-blue-900', attachment && 'font-bold')} />
          </label>
          <Button id="send-message-btn" type="submit" variant="default" className="ml-2" aria-label="Send message">
            <Send className="h-4 w-4 mr-1" /> Send
          </Button>
        </div>
        {attachment && (
          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Paperclip className="h-3 w-3" /> {attachment.name}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="ml-1"
              id="remove-attachment-btn"
              onClick={() => setAttachment(null)}
              aria-label="Remove attachment"
            >
              ×
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}

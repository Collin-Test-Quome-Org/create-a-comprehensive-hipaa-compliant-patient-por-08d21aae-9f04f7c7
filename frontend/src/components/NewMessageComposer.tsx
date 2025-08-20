import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Paperclip, Send, User, Users } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Fake providers list
const providers = [
  { id: 'p1', name: 'Dr. Emily Carter', role: 'Physician' },
  { id: 'p2', name: 'Nurse Jordan Lee', role: 'Nurse' },
  { id: 'p3', name: 'Care Team', role: 'Care Team' },
]

export function NewMessageComposer() {
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [sent, setSent] = useState(false)

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!recipient || !message.trim()) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setRecipient('')
      setMessage('')
      setAttachment(null)
    }, 1500)
  }

  return (
    <Card className="max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <Users className="h-5 w-5" /> Start a New Secure Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div>
            <label htmlFor="recipient-input" className="block mb-1 font-medium">
              To
            </label>
            <select
              id="recipient-input"
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-base focus:outline-blue-500"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              required
            >
              <option value="">Select a provider or care team...</option>
              {providers.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message-input" className="block mb-1 font-medium">
              Message
            </label>
            <Textarea
              id="message-input"
              placeholder="Write your secure message here..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              minLength={2}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="attachment-upload" className="cursor-pointer">
              <Input
                id="attachment-upload"
                type="file"
                className="hidden"
                onChange={e => setAttachment(e.target.files?.[0] || null)}
              />
              <Paperclip className={cn('text-blue-700 hover:text-blue-900', attachment && 'font-bold')} />
            </label>
            {attachment && (
              <span className="text-xs text-gray-600 flex items-center gap-1">
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
              </span>
            )}
          </div>
          <Button
            id="send-message-btn"
            type="submit"
            variant="default"
            className="mt-2"
            aria-label="Send message"
            disabled={sent}
          >
            <Send className="h-4 w-4 mr-1" />
            {sent ? 'Message Sent!' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

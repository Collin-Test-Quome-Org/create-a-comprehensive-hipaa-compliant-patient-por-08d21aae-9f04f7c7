import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const SupportContactForm = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      // Simulate API
      if (form.email && form.message) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    }, 1200)
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Mail className="w-6 h-6 text-secondary" /> Contact Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4 text-green-600 font-semibold"
          >
            Thank you! Your message was sent. We'll get back to you soon.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4 text-red-600 font-semibold"
          >
            Please fill out your email and message.
          </motion.div>
        )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} aria-label="Contact Support Form">
          <div className="mb-3">
            <label htmlFor="support-name" className="block font-medium mb-1">Name</label>
            <Input
              id="support-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              autoComplete="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="support-email" className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <Input
              id="support-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="support-subject" className="block font-medium mb-1">Subject</label>
            <Input
              id="support-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="support-message" className="block font-medium mb-1">Message <span className="text-red-500">*</span></label>
            <Textarea
              id="support-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Please describe your question or issue..."
              rows={4}
              required
            />
          </div>
          <Button
            id="support-submit"
            type="submit"
            className="w-full mt-2 flex items-center justify-center"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

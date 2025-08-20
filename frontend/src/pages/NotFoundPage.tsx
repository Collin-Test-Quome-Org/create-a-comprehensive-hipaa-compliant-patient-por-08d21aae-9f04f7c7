import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <motion.div
        className="flex flex-col items-center justify-center flex-grow"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AlertTriangle className="w-16 h-16 text-primary mb-6 animate-bounce" />
        <h1 className="font-bold text-4xl text-primary mb-2 tracking-tight">404: Page Not Found</h1>
        <p className="text-lg text-slate-700 mb-8 text-center max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.<br />
          Let's help you find your way back to security and care.
        </p>
        <Button asChild id="404-home-btn" className="px-8 py-3 text-lg font-semibold">
          <Link to="/">Return Home</Link>
        </Button>
      </motion.div>
      <div className="w-full h-32 bg-gradient-to-t from-blue-100 to-transparent" />
    </div>
  )
}

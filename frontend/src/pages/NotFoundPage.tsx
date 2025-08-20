import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center space-y-6"
      >
        <span className="rounded-full bg-primary/10 p-4">
          <AlertTriangle className="w-16 h-16 text-primary animate-bounce" />
        </span>
        <h1 className="text-4xl font-inter font-bold text-primary">404 - Page Not Found</h1>
        <p className="text-slate-700 text-lg max-w-xl text-center">
          Oops! The page you're looking for doesn't exist in our secure portal.<br />
          Let's get you back to the right place.
        </p>
        <Button id="404-back-home" onClick={() => navigate('/')} className="px-6 py-2 text-lg font-semibold">
          Go Home
        </Button>
      </motion.div>
    </div>
  )
}

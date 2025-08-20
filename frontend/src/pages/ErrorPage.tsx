import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex items-center justify-center bg-red-100 rounded-full w-20 h-20 mb-3 shadow-lg">
          <AlertCircle className="text-red-600 w-12 h-12" />
        </div>
        <h1 className="font-inter font-extrabold text-4xl text-slate-900 dark:text-slate-50 mb-2">Oops! Something went wrong.</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl text-center px-2">
          We're sorry, but an unexpected error has occurred. Our team has been notified and is working to resolve the issue.
        </p>
        <Button id="error-home-btn" asChild className="mt-6 px-8 py-3 rounded-xl font-bold text-lg bg-blue-700 hover:bg-blue-900 text-white shadow-lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </motion.div>
    </div>
  )
}

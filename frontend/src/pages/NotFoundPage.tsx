import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.25 }}
        className="flex flex-col items-center"
      >
        <img src="/branding/assets/logo-0.png" className="w-24 h-24 mb-6" />
        <h1 className="font-bold text-blue-900 text-7xl mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-blue-800" style={{ fontFamily: 'Inter, sans-serif' }}>
          Oops! Page Not Found
        </h2>
        <p className="text-slate-600 text-lg max-w-md text-center mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Welcome to the SecureCare Portal — where your privacy matters most. The page you’re looking for has wandered off. Let’s get you safely back to a secure place!
        </p>
        <Button asChild id="notfound-home-btn" className="gap-2 px-6 py-3 text-lg font-semibold">
          <Link to="/">
            <ArrowLeftCircle className="w-5 h-5 mr-1" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

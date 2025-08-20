import { Button } from '@/components/ui/button'
import { LucideShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      <motion.div 
        initial={{ scale: 0.85, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex flex-col items-center"
      >
        <div className="bg-white shadow-lg rounded-full p-6 mb-6 flex items-center justify-center">
          <LucideShieldAlert className="text-blue-700" size={56} />
        </div>
        <h1 className="font-bold text-4xl text-blue-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          404: Not Found
        </h1>
        <p className="text-lg text-slate-600 mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Oops! The page you’re looking for is off the record.<br />
          Let’s guide you safely back to care.
        </p>
        <Button asChild id="notfound-home-btn" className="text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 text-lg">
          <Link to="/">
            Return Home
          </Link>
        </Button>
      </motion.div>
      <div className="mt-14 opacity-60">
        <img src="/branding/assets/logo-0.png" className="w-20 h-20 mx-auto" />
      </div>
    </div>
  )
}

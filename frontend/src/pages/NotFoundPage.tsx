import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-white/80 shadow-xl rounded-2xl p-10 flex flex-col items-center"
      >
        <div className="flex items-center mb-6">
          <span className="inline-block text-blue-700 font-inter font-bold text-7xl mr-2">404</span>
          <span className="inline-block text-blue-400 font-inter text-4xl">Oops!</span>
        </div>
        <p className="text-slate-700 font-roboto text-lg mb-4 text-center max-w-md">
          The page you’re looking for doesn’t exist or has moved. 
        </p>
        <p className="text-slate-500 font-roboto mb-8 text-center max-w-sm">
          Having trouble? Our portal guides you to the right place with care and security. Return to the home page to access your medical records, appointments, and more.
        </p>
        <Button asChild id="notfound-back-home" className="text-lg font-bold px-6 py-4">
          <Link to="/">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

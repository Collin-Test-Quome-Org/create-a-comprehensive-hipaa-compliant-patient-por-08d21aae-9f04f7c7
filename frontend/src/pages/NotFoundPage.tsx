import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
    >
      <div className="relative w-full max-w-xl p-10 bg-white shadow-lg rounded-xl border border-slate-200">
        <div className="flex flex-col items-center">
          <img
            src={require('/branding/assets/logo-0.png')}
            className="w-20 h-20 mb-4 select-none pointer-events-none"
            draggable={false}
          />
          <motion.h1
            className="text-5xl font-bold text-blue-900 mb-2 font-inter"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            404
          </motion.h1>
          <p className="text-lg text-slate-600 mb-4 font-roboto">
            Oops! The page you're looking for doesn't exist or has moved.
          </p>
          <Button asChild size="lg" id="notfound-home-btn" className="gap-2 font-bold">
            <Link to="/">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

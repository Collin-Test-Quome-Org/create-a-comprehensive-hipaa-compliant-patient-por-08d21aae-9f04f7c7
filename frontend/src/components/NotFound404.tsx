import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function NotFound404() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-32 h-32 mb-6 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
        <ArrowLeftCircle size={72} className="text-blue-700" />
      </div>
      <h1 className="font-extrabold text-5xl mb-4 text-blue-900" style={{fontFamily: 'Inter, sans-serif'}}>404</h1>
      <p className="text-lg mb-6 text-slate-700 max-w-xl">
        Oops! The page you’re looking for doesn’t exist.<br />
        HIPAA Patient Portal’s secure path couldn’t locate that resource. Try navigating home or checking your dashboard.
      </p>
      <Button asChild id="notfound-back-home" className="text-lg px-6 py-3">
        <Link to="/">
          <ArrowLeftCircle size={20} className="inline mr-2 -mt-1" />
          Back to Home
        </Link>
      </Button>
    </motion.div>
  )
}

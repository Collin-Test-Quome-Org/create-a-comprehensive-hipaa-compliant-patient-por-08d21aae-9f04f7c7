import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-slate-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center bg-white shadow-lg px-8 py-10 rounded-xl border border-slate-100"
      >
        <AlertTriangle className="text-blue-700 mb-3" size={48} />
        <h1 className="font-inter text-4xl font-bold mb-2 text-blue-900">404 Not Found</h1>
        <p className="font-roboto text-slate-600 mb-8 text-lg">Oops! The page you’re seeking isn’t on the HIPAA Patient Portal.</p>
        <Button asChild id="back-home" className="font-bold bg-blue-700 text-white hover:bg-blue-800">
          <Link to="/">Return to Home</Link>
        </Button>
      </motion.div>
      <div className="mt-8">
        <img src="/branding/assets/hero-0.png" className="rounded-lg shadow-xl max-w-2xl" style={{ maxHeight: 300 }} />
      </div>
    </div>
  )
}

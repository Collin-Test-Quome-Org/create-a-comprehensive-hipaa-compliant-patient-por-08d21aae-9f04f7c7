import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Ghost } from 'lucide-react'
import { motion } from 'framer-motion'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-center">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="mb-6"
      >
        <Ghost className="w-20 h-20 text-blue-700 mx-auto animate-pulse" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-5xl font-bold mb-2 text-blue-700 font-inter"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-lg mb-5 text-slate-600 font-roboto"
      >
        Oops! The page you're looking for cannot be found.<br />
        Let's get you back to a safe place.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button
          id="notfound-home-btn"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold"
          onClick={() => navigate('/')}
        >
          Return to Home
        </Button>
      </motion.div>
    </div>
  )
}

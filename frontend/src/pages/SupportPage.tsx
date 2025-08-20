import { SupportFaq } from '@/components/SupportFaq'
import { SupportContactForm } from '@/components/SupportContactForm'
import { motion } from 'framer-motion'

export const SupportPage = () => {
  return (
    <main className="min-h-screen pb-20 bg-slate-50">
      <div style={{ backgroundImage: "url('/branding/assets/hero-0.png')" }} className="bg-cover bg-center h-60">
        <div className="bg-black bg-opacity-40 h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            How can we help?
          </motion.h1>
        </div>
      </div>
      <section className="max-w-3xl mx-auto px-4 mt-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-700 mb-6 text-center"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          At SecureCare Connect, our team is dedicated to your peace of mind. Browse our frequently asked questions or reach out directly—your trust is our top priority.
        </motion.p>
      </section>
      <SupportFaq />
      <SupportContactForm />
    </main>
  )
}

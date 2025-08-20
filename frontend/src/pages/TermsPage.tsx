import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function TermsPage() {
  const navigate = useNavigate()
  // Placeholder PDF download handler
  const handleDownload = () => {
    // For demo purposes, this would trigger PDF download
    window.open('/docs/terms-of-service.pdf', '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4 py-12"
    >
      <Card className="max-w-2xl w-full shadow-xl border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary font-inter">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-base font-roboto text-slate-700">
          <p>
            Welcome to the HIPAA Patient Portal! By accessing or using this portal, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Eligibility:</strong> You must be a registered patient or authorized healthcare provider to use this portal.
            </li>
            <li>
              <strong>Privacy & Security:</strong> All information is protected under HIPAA. Do not share your login credentials with anyone. Multi-factor authentication is required for access.
            </li>
            <li>
              <strong>Acceptable Use:</strong> You agree to use the portal exclusively for legitimate healthcare purposes and to refrain from any unauthorized or unlawful activities.
            </li>
            <li>
              <strong>Content Ownership:</strong> All content and materials in this portal are property of the healthcare provider unless otherwise stated.
            </li>
            <li>
              <strong>Changes to Terms:</strong> We reserve the right to update these terms at any time. Continued use of the portal constitutes acceptance of any revised terms.
            </li>
            <li>
              <strong>Support:</strong> For questions or issues, please visit our <Button variant="link" className="p-0 h-auto align-baseline text-primary underline underline-offset-2 font-semibold" id="support-link" onClick={() => navigate('/support')}>Support Page</Button>.
            </li>
          </ol>
          <div className="mt-8 flex gap-4">
            <Button id="download-terms" onClick={handleDownload} variant="outline" className="flex gap-2 items-center">
              <Download className="w-5 h-5" /> Download PDF
            </Button>
            <Button id="back-to-home" onClick={() => navigate('/')} variant="secondary">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

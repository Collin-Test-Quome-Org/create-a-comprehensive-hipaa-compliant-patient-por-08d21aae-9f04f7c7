import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const prescriptionsFake = [
  {
    id: 'rx-001',
    medication: 'Lisinopril 10mg',
    status: 'active',
    lastFilled: '2024-06-10',
    refillsRemaining: 2,
    prescribingProvider: 'Dr. Emily Carter',
  },
  {
    id: 'rx-002',
    medication: 'Atorvastatin 20mg',
    status: 'expired',
    lastFilled: '2023-12-15',
    refillsRemaining: 0,
    prescribingProvider: 'Dr. James Lee',
  },
  {
    id: 'rx-003',
    medication: 'Metformin 500mg',
    status: 'active',
    lastFilled: '2024-05-20',
    refillsRemaining: 1,
    prescribingProvider: 'Dr. Olivia Chen',
  },
]

function statusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-blue-100 text-blue-800';
    case 'expired': return 'bg-red-100 text-red-700';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-700';
  }
}

export function PrescriptionList() {
  const [prescriptions] = useState(prescriptionsFake)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto w-full"
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-inter font-bold">
            <RefreshCw className="text-blue-700" size={28} />
            My Prescriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6 font-roboto">Track your active, expired, and refillable prescriptions. Request refills securely with a click!</p>
          <div className="space-y-4">
            {prescriptions.map((rx) => (
              <motion.div
                key={rx.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="flex flex-col md:flex-row items-center md:items-stretch justify-between py-4 px-6 hover:shadow-lg transition group">
                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex flex-col min-w-[160px]">
                      <span className="font-bold font-inter text-lg text-blue-900">{rx.medication}</span>
                      <span className="text-xs text-gray-500 font-roboto">Prescribed by {rx.prescribingProvider}</span>
                    </div>
                    <div className="flex gap-2 items-center ml-0 md:ml-6">
                      <Badge className={`${statusColor(rx.status)} text-xs px-2 py-1 rounded-sm font-roboto`}>
                        {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500 font-roboto ml-2">Refills: {rx.refillsRemaining}</span>
                      <span className="text-xs text-gray-500 font-roboto ml-2">Last filled: {rx.lastFilled}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <Button asChild id={`view-details-button-${rx.id}`} variant="outline" className="group-hover:border-blue-700 group-hover:text-blue-700 transition">
                      <Link to={`/prescriptions/${rx.id}`} className="flex items-center gap-1">
                        Details
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                    {rx.status === 'active' && rx.refillsRemaining > 0 && (
                      <Button id={`refill-request-button-${rx.id}`} variant="default" className="bg-blue-700 hover:bg-blue-800 text-white">
                        Request Refill
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
            {prescriptions.length === 0 && (
              <div className="text-center text-gray-500 py-12">No prescriptions yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

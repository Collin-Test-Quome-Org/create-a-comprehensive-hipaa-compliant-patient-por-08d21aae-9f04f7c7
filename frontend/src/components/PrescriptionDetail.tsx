import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, RefreshCw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
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
    instructions: 'Take one tablet by mouth daily.',
    pharmacy: 'HealthFirst Pharmacy, 123 Main St.',
    history: [
      { date: '2024-01-15', action: 'Filled at HealthFirst Pharmacy' },
      { date: '2023-10-15', action: 'Refill requested' },
      { date: '2023-06-10', action: 'Prescription issued' },
    ],
  },
  {
    id: 'rx-002',
    medication: 'Atorvastatin 20mg',
    status: 'expired',
    lastFilled: '2023-12-15',
    refillsRemaining: 0,
    prescribingProvider: 'Dr. James Lee',
    instructions: 'Take one tablet by mouth at bedtime.',
    pharmacy: 'CityCare Pharmacy, 456 Center St.',
    history: [
      { date: '2022-12-15', action: 'Filled at CityCare Pharmacy' },
      { date: '2022-09-15', action: 'Prescription issued' },
    ],
  },
  {
    id: 'rx-003',
    medication: 'Metformin 500mg',
    status: 'active',
    lastFilled: '2024-05-20',
    refillsRemaining: 1,
    prescribingProvider: 'Dr. Olivia Chen',
    instructions: 'Take one tablet by mouth twice daily with meals.',
    pharmacy: 'BetterHealth Rx, 789 Oak St.',
    history: [
      { date: '2024-01-20', action: 'Refill requested' },
      { date: '2023-11-20', action: 'Filled at BetterHealth Rx' },
      { date: '2023-06-05', action: 'Prescription issued' },
    ],
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

export function PrescriptionDetail() {
  const { prescriptionId } = useParams()
  const rx = prescriptionsFake.find(r => r.id === prescriptionId)
  const [requesting, setRequesting] = useState(false)
  const [refillRequested, setRefillRequested] = useState(false)

  if (!rx) {
    return (
      <div className="max-w-xl mx-auto my-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowLeft className="inline-block mr-2" size={20} />
              <Link to="/prescriptions" className="hover:underline">Back to Prescriptions</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-500">Prescription not found.</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function handleRefill() {
    setRequesting(true)
    setTimeout(() => {
      setRequesting(false)
      setRefillRequested(true)
    }, 1200)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto my-10"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-inter font-bold">
            <RefreshCw className="text-blue-700" size={26} />
            Prescription Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge className={`${statusColor(rx.status)} text-xs px-2 py-1 rounded-sm font-roboto`}>{rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}</Badge>
            <span className="font-bold font-inter text-lg text-blue-900">{rx.medication}</span>
          </div>
          <div className="text-gray-600 font-roboto">
            <div><span className="font-semibold text-gray-700">Prescribing Provider:</span> {rx.prescribingProvider}</div>
            <div><span className="font-semibold text-gray-700">Pharmacy:</span> {rx.pharmacy}</div>
            <div><span className="font-semibold text-gray-700">Instructions:</span> {rx.instructions}</div>
            <div><span className="font-semibold text-gray-700">Last Filled:</span> {rx.lastFilled}</div>
            <div><span className="font-semibold text-gray-700">Refills Remaining:</span> {rx.refillsRemaining}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-700">History:</span>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-500">
              {rx.history.map((h, idx) => (
                <li key={idx}>{h.date} &mdash; {h.action}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Button asChild variant="outline" id="back-to-prescriptions" className="flex items-center gap-2">
              <Link to="/prescriptions">
                <ArrowLeft size={18} />
                Back to List
              </Link>
            </Button>
            <Button variant="outline" id="download-prescription" className="flex items-center gap-2">
              <FileText size={18} />
              Download PDF
            </Button>
            {rx.status === 'active' && rx.refillsRemaining > 0 && !refillRequested && (
              <Button
                id="request-refill"
                className="bg-blue-700 hover:bg-blue-800 text-white"
                disabled={requesting}
                onClick={handleRefill}
              >
                {requesting ? 'Requesting...' : 'Request Refill'}
              </Button>
            )}
            {refillRequested && (
              <Button disabled variant="secondary" id="refill-requested" className="text-green-800">
                Refill Requested
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

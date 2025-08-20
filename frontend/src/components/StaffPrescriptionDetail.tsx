import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const mockPrescriptionDetail = {
  rx001: {
    id: 'rx001',
    patient: 'Jane Doe',
    medication: 'Atorvastatin 10mg',
    provider: 'Dr. Alex Carter',
    dateRequested: '2024-06-09',
    status: 'Pending',
    notes: 'Cholesterol management. No known allergies.',
    history: [
      { date: '2024-05-01', action: 'Prescribed', by: 'Dr. Alex Carter' },
      { date: '2024-06-09', action: 'Refill Requested', by: 'Jane Doe' },
    ],
  },
  rx002: {
    id: 'rx002',
    patient: 'John Smith',
    medication: 'Metformin 500mg',
    provider: 'Dr. Emily Jones',
    dateRequested: '2024-06-08',
    status: 'Approved',
    notes: 'Type 2 Diabetes. Monitor A1c every 3 months.',
    history: [
      { date: '2024-04-10', action: 'Prescribed', by: 'Dr. Emily Jones' },
      { date: '2024-06-08', action: 'Refill Approved', by: 'Dr. Emily Jones' },
    ],
  },
  rx003: {
    id: 'rx003',
    patient: 'Emily Watson',
    medication: 'Lisinopril 20mg',
    provider: 'Dr. Alex Carter',
    dateRequested: '2024-06-08',
    status: 'Denied',
    notes: 'Blood pressure controlled. Patient requested refill too early.',
    history: [
      { date: '2024-03-22', action: 'Prescribed', by: 'Dr. Alex Carter' },
      { date: '2024-06-08', action: 'Refill Denied', by: 'Dr. Alex Carter' },
    ],
  },
  rx004: {
    id: 'rx004',
    patient: 'Michael Lee',
    medication: 'Omeprazole 40mg',
    provider: 'Dr. Emily Jones',
    dateRequested: '2024-06-07',
    status: 'Pending',
    notes: 'GERD symptoms. Patient tolerates medication well.',
    history: [
      { date: '2024-05-11', action: 'Prescribed', by: 'Dr. Emily Jones' },
      { date: '2024-06-07', action: 'Refill Requested', by: 'Michael Lee' },
    ],
  },
}

function statusBadge(status: string) {
  switch (status) {
    case 'Pending':
      return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
    case 'Approved':
      return <Badge className="bg-green-100 text-green-700">Approved</Badge>
    case 'Denied':
      return <Badge className="bg-red-100 text-red-700">Denied</Badge>
    default:
      return null
  }
}

export function StaffPrescriptionDetail() {
  const { prescriptionId } = useParams()
  const navigate = useNavigate()
  const rx = mockPrescriptionDetail[prescriptionId || '']
  // Local state for decision
  const [decision, setDecision] = useState<'Approved' | 'Denied' | undefined>()
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!rx) {
    return (
      <div className="max-w-xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-red-700">Prescription not found</h2>
        <Button id="back-to-staff-prescriptions" variant="outline" className="mt-6" onClick={() => navigate('/staff/prescriptions')}>Back to List</Button>
      </div>
    )
  }

  const handleDecision = (status: 'Approved' | 'Denied') => {
    setDecision(status)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      navigate('/staff/prescriptions')
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <Button id="back-to-staff-prescriptions" variant="ghost" size="sm" className="mb-2 flex items-center gap-2" onClick={() => navigate('/staff/prescriptions')}>
        <ArrowLeft size={18} /> Back to List
      </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <span>Prescription Request</span>
            {statusBadge(rx.status)}
          </CardTitle>
          <CardDescription className="text-slate-600">Review and take action on this prescription request.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="font-semibold text-slate-700">Patient</div>
              <div className="text-lg text-blue-900">{rx.patient}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-700">Provider</div>
              <div className="text-lg">{rx.provider}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-700">Medication</div>
              <div className="text-lg">{rx.medication}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-700">Requested</div>
              <div>{rx.dateRequested}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-slate-700 mb-1">Provider Notes</div>
            <div className="bg-slate-50 p-3 rounded text-slate-800 text-sm">{rx.notes}</div>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-slate-700 mb-1">History</div>
            <ul className="pl-4 list-disc text-slate-700 text-sm">
              {rx.history.map((h, idx) => (
                <li key={idx} className="mb-1">{h.date}: {h.action} <span className="text-slate-400">by {h.by}</span></li>
              ))}
            </ul>
          </div>

          {rx.status === 'Pending' && !submitted && (
            <div className="">
              <div className="mb-2 font-semibold text-slate-700">Decision &amp; Comments</div>
              <Textarea
                id="staff-prescription-comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Add optional comments for your decision..."
                rows={3}
                className="mb-4"
              />
              <div className="flex gap-4">
                <Button id="approve-prescription" onClick={() => handleDecision('Approved')} className="bg-green-700 text-white flex gap-2 hover:bg-green-800">
                  <CheckCircle2 size={18}/> Approve
                </Button>
                <Button id="deny-prescription" onClick={() => handleDecision('Denied')} variant="destructive" className="flex gap-2">
                  <XCircle size={18}/> Deny
                </Button>
              </div>
            </div>
          )}
          {submitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-center gap-3">
              {decision === 'Approved' ? (
                <span className="text-green-700 flex items-center gap-1 font-semibold"><CheckCircle2 size={20}/> Prescription Approved</span>
              ) : (
                <span className="text-red-700 flex items-center gap-1 font-semibold"><XCircle size={20}/> Prescription Denied</span>
              )}
              <span className="text-slate-400">Redirecting...</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

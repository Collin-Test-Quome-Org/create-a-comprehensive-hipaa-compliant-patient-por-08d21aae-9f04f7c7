import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileDown, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

// Fake data for demonstration
const records = [
  {
    id: 'rec-123',
    date: '2024-03-22',
    type: 'Lab Results',
    summary: 'Comprehensive Metabolic Panel',
    status: 'Available',
    details: [
      { label: 'Test', value: 'Comprehensive Metabolic Panel' },
      { label: 'Date', value: '2024-03-22' },
      { label: 'Provider', value: 'Dr. Evelyn Harper' },
      { label: 'Status', value: 'Normal' },
    ],
    documentUrl: '#',
  },
  {
    id: 'rec-456',
    date: '2024-01-15',
    type: 'Imaging Report',
    summary: 'Chest X-ray',
    status: 'Available',
    details: [
      { label: 'Test', value: 'Chest X-ray' },
      { label: 'Date', value: '2024-01-15' },
      { label: 'Provider', value: 'Dr. Marcus Lin' },
      { label: 'Status', value: 'Clear' },
    ],
    documentUrl: '#',
  },
  {
    id: 'rec-789',
    date: '2023-10-10',
    type: 'Visit Summary',
    summary: 'Annual Physical',
    status: 'Available',
    details: [
      { label: 'Visit', value: 'Annual Physical' },
      { label: 'Date', value: '2023-10-10' },
      { label: 'Provider', value: 'Dr. Evelyn Harper' },
      { label: 'Notes', value: 'Patient in excellent health.' },
    ],
    documentUrl: '#',
  },
]

export function MedicalRecordDetail() {
  const { recordId } = useParams()
  const navigate = useNavigate()
  const record = records.find(r => r.id === recordId)

  if (!record) {
    return (
      <Card className="max-w-lg mx-auto mt-12">
        <CardHeader>
          <CardTitle>Record Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">We couldn't find the requested medical record.</p>
          <Button id="back-to-records" onClick={() => navigate('/medical-records')} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to records
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
      <Card className="max-w-xl mx-auto mt-10 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <FileDown className="w-6 h-6 text-blue-600" />
            {record.type}
          </CardTitle>
          <CardDescription className="ml-8 text-slate-600">{record.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              {record.details.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <dt className="text-xs text-slate-500 font-medium">{item.label}</dt>
                  <dd className="text-base text-slate-900 font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex gap-2 justify-between">
            <Button id="back-to-records" variant="secondary" onClick={() => navigate('/medical-records')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to records
            </Button>
            <Button id="download-record" variant="outline" asChild>
              <a href={record.documentUrl} download>
                <FileDown className="w-4 h-4 mr-2" /> Download PDF
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

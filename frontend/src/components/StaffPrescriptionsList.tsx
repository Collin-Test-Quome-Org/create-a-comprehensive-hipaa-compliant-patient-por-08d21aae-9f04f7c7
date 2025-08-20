import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const mockPrescriptions = [
  {
    id: 'rx001',
    patient: 'Jane Doe',
    medication: 'Atorvastatin 10mg',
    dateRequested: '2024-06-09',
    status: 'Pending',
  },
  {
    id: 'rx002',
    patient: 'John Smith',
    medication: 'Metformin 500mg',
    dateRequested: '2024-06-08',
    status: 'Approved',
  },
  {
    id: 'rx003',
    patient: 'Emily Watson',
    medication: 'Lisinopril 20mg',
    dateRequested: '2024-06-08',
    status: 'Denied',
  },
  {
    id: 'rx004',
    patient: 'Michael Lee',
    medication: 'Omeprazole 40mg',
    dateRequested: '2024-06-07',
    status: 'Pending',
  },
]

function statusColor(status: string) {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'Approved':
      return 'bg-green-100 text-green-700'
    case 'Denied':
      return 'bg-red-100 text-red-700'
    default:
      return ''
  }
}

export function StaffPrescriptionsList() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const filtered = mockPrescriptions.filter(
    p =>
      p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.medication.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <span className="text-2xl font-bold">Prescription Requests</span>
            <Badge className="bg-blue-100 text-blue-800 font-semibold">Staff View</Badge>
          </CardTitle>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 w-96 max-w-full">
              <Search className="text-blue-600" size={18} />
              <Input
                id="staff-prescription-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by patient, medication, or Rx ID..."
                className="bg-slate-50"
              />
            </div>
            <span className="text-slate-500 text-sm">Showing {filtered.length} of {mockPrescriptions.length}</span>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rx&nbsp;ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Date&nbsp;Requested</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                    No prescription requests found.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map(rx => (
                <TableRow key={rx.id}>
                  <TableCell>{rx.id}</TableCell>
                  <TableCell>{rx.patient}</TableCell>
                  <TableCell>{rx.medication}</TableCell>
                  <TableCell>{rx.dateRequested}</TableCell>
                  <TableCell>
                    <span className={`rounded px-2 py-1 text-xs font-semibold ${statusColor(rx.status)}`}>{rx.status}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      id={`view-rx-${rx.id}`}
                      onClick={() => navigate(`/staff/prescriptions/${rx.id}`)}
                      variant="outline"
                      className="text-blue-700 border-blue-300 hover:bg-blue-50"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

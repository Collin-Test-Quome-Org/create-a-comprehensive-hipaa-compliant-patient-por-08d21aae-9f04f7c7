import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileDown, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Fake data for medical records
const records = [
  {
    id: 'rec-123',
    date: '2024-03-22',
    type: 'Lab Results',
    summary: 'Comprehensive Metabolic Panel',
    status: 'Available',
  },
  {
    id: 'rec-456',
    date: '2024-01-15',
    type: 'Imaging Report',
    summary: 'Chest X-ray',
    status: 'Available',
  },
  {
    id: 'rec-789',
    date: '2023-10-10',
    type: 'Visit Summary',
    summary: 'Annual Physical',
    status: 'Available',
  },
]

export function MedicalRecordList() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredRecords = records.filter(
    (rec) =>
      rec.type.toLowerCase().includes(search.toLowerCase()) ||
      rec.summary.toLowerCase().includes(search.toLowerCase()) ||
      rec.date.includes(search)
  )

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="max-w-4xl mx-auto mt-8 shadow-xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-indigo-900">
              <FileDown className="w-6 h-6 text-blue-600" />
              Medical Records
            </span>
            <Input
              id="medical-records-search"
              placeholder="Search records..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-64 ml-auto"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Summary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-500">No records found.</TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map(rec => (
                    <TableRow key={rec.id} className="hover:bg-blue-50 transition">
                      <TableCell>{rec.date}</TableCell>
                      <TableCell>{rec.type}</TableCell>
                      <TableCell>{rec.summary}</TableCell>
                      <TableCell>
                        <span className="inline-block bg-green-100 text-green-800 px-2 rounded text-xs font-medium">{rec.status}</span>
                      </TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Button id={`view-record-${rec.id}`} variant="secondary" size="sm" onClick={() => navigate(`/medical-records/${rec.id}`)}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                        <Button id={`download-record-${rec.id}`} variant="outline" size="sm">
                          <FileDown className="w-4 h-4 mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

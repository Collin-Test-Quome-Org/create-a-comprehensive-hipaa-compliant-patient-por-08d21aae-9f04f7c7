import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileText, Download, Search, UserCircle2, FolderOpenDot } from 'lucide-react'
import { motion } from 'framer-motion'

const mockDocuments = [
  {
    id: 'doc1',
    name: 'Lab Results - April 2024.pdf',
    uploadedBy: 'Dr. Lisa Wong',
    patient: 'Samuel Carter',
    date: '2024-04-30',
    type: 'Lab Results',
    assigned: true,
  },
  {
    id: 'doc2',
    name: 'X-Ray - Chest.png',
    uploadedBy: 'Nurse Brian Lee',
    patient: 'Unassigned',
    date: '2024-04-27',
    type: 'Imaging',
    assigned: false,
  },
  {
    id: 'doc3',
    name: 'Discharge Summary.pdf',
    uploadedBy: 'Dr. Anna Kim',
    patient: 'Jessica Smith',
    date: '2024-04-25',
    type: 'Summary',
    assigned: true,
  },
  {
    id: 'doc4',
    name: 'Insurance Card.jpg',
    uploadedBy: 'Patient Upload',
    patient: 'David Johnson',
    date: '2024-04-20',
    type: 'Insurance',
    assigned: true,
  },
]

export function StaffDocumentsPage() {
  const [search, setSearch] = useState('')

  const filteredDocs = mockDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.patient.toLowerCase().includes(search.toLowerCase()) ||
      doc.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6"
    >
      <Card className="mb-8 shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <FolderOpenDot className="text-blue-600" size={32} />
          <CardTitle className="font-inter font-bold text-2xl text-blue-900">Staff Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 mb-3 font-roboto">
            Manage all uploaded patient and administrative documents. Search, download, and assign documents to patient records securely. All actions are logged for compliance.
          </p>
          <div className="flex gap-3 items-center mb-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
              <Input
                id="staff-documents-search"
                type="text"
                placeholder="Search documents, patients, types..."
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <Button id="staff-documents-upload-btn" variant="outline" className="ml-auto" asChild>
              <a href="/documents/upload">
                <FileText className="mr-2" size={18} />Upload New Document
              </a>
            </Button>
          </div>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-700 font-bold">Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                      No documents found.
                    </TableCell>
                  </TableRow>
                )}
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.id} className={doc.assigned ? '' : 'bg-yellow-50'}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <FileText className="text-blue-400" size={20} />
                      {doc.name}
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <UserCircle2 className="text-slate-500" size={18} />
                      {doc.patient}
                      {!doc.assigned && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded bg-yellow-200 text-yellow-900">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button id={`doc-download-${doc.id}`} size="icon" variant="ghost">
                          <Download size={18} />
                        </Button>
                        {!doc.assigned && (
                          <Button id={`doc-assign-${doc.id}`} size="sm" variant="secondary">
                            Assign to Patient
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

import { CalendarDays, Search, Clock10 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Fake data for demonstration
const appointments = [
  {
    id: 'a1',
    date: '2024-07-01',
    time: '09:00 AM',
    patient: 'John Doe',
    provider: 'Dr. Smith',
    status: 'Confirmed',
    type: 'Consultation',
  },
  {
    id: 'a2',
    date: '2024-07-01',
    time: '10:30 AM',
    patient: 'Jane Smith',
    provider: 'Dr. Patel',
    status: 'Pending',
    type: 'Follow-up',
  },
  {
    id: 'a3',
    date: '2024-07-02',
    time: '11:00 AM',
    patient: 'Alex Johnson',
    provider: 'Dr. Smith',
    status: 'Cancelled',
    type: 'Consultation',
  },
]

const statusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'text-green-600'
    case 'Pending':
      return 'text-yellow-600'
    case 'Cancelled':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

export function StaffAppointmentList() {
  const [filter, setFilter] = useState('')
  const [provider, setProvider] = useState('')

  const filtered = appointments.filter(a =>
    (!filter || a.patient.toLowerCase().includes(filter.toLowerCase())) &&
    (!provider || a.provider === provider)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl p-4"
    >
      <Card className="mb-8 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-primary mr-2" />
            <CardTitle className="text-2xl font-inter">Appointments</CardTitle>
          </div>
          <Button id="new-appointment-btn" variant="default" className="font-semibold" asChild>
            <a href="/appointments/new">+ New Appointment</a>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative">
              <Input
                id="search-appointments"
                placeholder="Search patients..."
                className="pl-10 w-64"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Select
              value={provider}
              onValueChange={setProvider}
            >
              <SelectTrigger id="provider-filter" className="w-48">
                <SelectValue placeholder="Filter by provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Providers</SelectItem>
                <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                <SelectItem value="Dr. Patel">Dr. Patel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500">No appointments found.</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((a) => (
                    <TableRow key={a.id} className="hover:bg-blue-50">
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.time}</TableCell>
                      <TableCell>{a.patient}</TableCell>
                      <TableCell>{a.provider}</TableCell>
                      <TableCell className={statusColor(a.status)}>{a.status}</TableCell>
                      <TableCell>{a.type}</TableCell>
                      <TableCell>
                        <Button id={`view-appointment-${a.id}`} size="sm" variant="outline" asChild>
                          <a href={`/staff/appointments/${a.id}`}>View</a>
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

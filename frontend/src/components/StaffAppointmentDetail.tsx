import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Fake appointment data
const appointments = {
  a1: {
    id: 'a1',
    date: '2024-07-01',
    time: '09:00 AM',
    patient: 'John Doe',
    provider: 'Dr. Smith',
    status: 'Confirmed',
    type: 'Consultation',
    notes: 'Patient needs to bring past records.',
  },
  a2: {
    id: 'a2',
    date: '2024-07-01',
    time: '10:30 AM',
    patient: 'Jane Smith',
    provider: 'Dr. Patel',
    status: 'Pending',
    type: 'Follow-up',
    notes: '',
  },
  a3: {
    id: 'a3',
    date: '2024-07-02',
    time: '11:00 AM',
    patient: 'Alex Johnson',
    provider: 'Dr. Smith',
    status: 'Cancelled',
    type: 'Consultation',
    notes: 'Cancelled by patient due to travel.',
  },
}

const statusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-600'
    case 'Pending':
      return 'bg-yellow-600'
    case 'Cancelled':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
}

export function StaffAppointmentDetail() {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const appt = appointmentId && appointments[appointmentId as keyof typeof appointments]

  if (!appt) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-20 text-xl">
        Appointment not found.
        <div className="mt-6">
          <Button id="back-to-appointments" onClick={() => navigate('/staff/appointments')}>Back to Appointments</Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl p-4">
      <Card className="shadow-xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-inter flex items-center gap-2">
            Appointment Detail
            <Badge className={statusColor(appt.status)}>{appt.status}</Badge>
          </CardTitle>
          <Button id="back-to-list" variant="outline" size="sm" onClick={() => navigate('/staff/appointments')}>Back</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-bold w-32">Date:</span>
              <span>{appt.date}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-bold w-32">Time:</span>
              <span>{appt.time}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-bold w-32">Patient:</span>
              <span>{appt.patient}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-bold w-32">Provider:</span>
              <span>{appt.provider}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-bold w-32">Type:</span>
              <span>{appt.type}</span>
            </div>
          </div>
          <div>
            <span className="font-bold">Notes:</span>
            <p className="mt-2 bg-slate-50 rounded p-2 min-h-[48px]">{appt.notes || <span className="text-gray-400">No notes</span>}</p>
          </div>
          <div className="flex gap-4 mt-8">
            <Button id="confirm-appointment" variant="success" disabled={appt.status === 'Confirmed'}>
              Confirm
            </Button>
            <Button id="cancel-appointment" variant="destructive" disabled={appt.status === 'Cancelled'}>
              Cancel
            </Button>
            <Button id="reschedule-appointment" variant="outline">
              Reschedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

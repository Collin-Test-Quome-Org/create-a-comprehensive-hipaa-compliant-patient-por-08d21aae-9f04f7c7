import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, ArrowLeft, User } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useState } from 'react'

// Fake patient & record data (would be fetched in real app)
const mockPatients = {
  p001: {
    id: 'p001',
    name: 'Alexandra Rivera',
    dob: '1990-04-12',
    email: 'alex.rivera@example.com',
    phone: '555-234-1234',
    status: 'Active',
    lastVisit: '2024-05-18',
    address: '1234 Serenity Ln, Wellness City, CA',
    records: [
      {
        id: 'r101',
        date: '2024-05-18',
        type: 'Lab Results',
        summary: 'Annual blood panel, all results normal.'
      },
      {
        id: 'r104',
        date: '2023-12-15',
        type: 'Visit Note',
        summary: 'Routine check-up. No concerns.'
      }
    ]
  },
  p002: {
    id: 'p002',
    name: 'Michael Chen',
    dob: '1983-09-27',
    email: 'michael.chen@example.com',
    phone: '555-777-9012',
    status: 'Active',
    lastVisit: '2024-06-06',
    address: '987 Health Dr, Caretown, TX',
    records: [
      {
        id: 'r201',
        date: '2024-06-06',
        type: 'Consultation',
        summary: 'Follow-up for hypertension, stable.'
      }
    ]
  },
  p003: {
    id: 'p003',
    name: 'Priya Patel',
    dob: '1976-12-02',
    email: 'priya.patel@example.com',
    phone: '555-321-8888',
    status: 'Inactive',
    lastVisit: '2023-11-16',
    address: '456 Calm Ave, Healthville, NY',
    records: []
  },
  p004: {
    id: 'p004',
    name: 'Jordan Lee',
    dob: '2001-01-14',
    email: 'jordan.lee@example.com',
    phone: '555-432-2222',
    status: 'Active',
    lastVisit: '2024-06-01',
    address: '1010 Secure St, Safe City, WA',
    records: [
      {
        id: 'r401',
        date: '2024-06-01',
        type: 'Immunization',
        summary: 'COVID-19 booster administered.'
      }
    ]
  }
}

export function StaffPatientProfile() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const patient = patientId && mockPatients[patientId]
  const [tab, setTab] = useState('profile')

  if (!patient) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center p-8">
            <User className="w-10 h-10 text-blue-400 mb-2" />
            <div className="font-bold text-lg text-blue-900 mb-2">Patient Not Found</div>
            <div className="mb-6 text-slate-500 font-roboto">Sorry, we couldn't locate the patient with ID: {patientId}.</div>
            <Button id="back-patient-list" onClick={() => navigate('/staff/patients')}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Patient List
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Button
        id="back-patient-list"
        variant="ghost"
        className="mb-4 flex items-center text-blue-700 hover:bg-blue-50"
        onClick={() => navigate('/staff/patients')}
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Patient Directory
      </Button>
      <Card className="shadow-xl">
        <CardHeader className="flex flex-row gap-4 items-center bg-blue-50 rounded-t-lg">
          <User className="w-10 h-10 text-blue-700" />
          <div>
            <CardTitle className="font-inter text-2xl text-blue-900 mb-1">{patient.name}</CardTitle>
            <CardDescription className="text-slate-600 font-roboto">Patient Profile & Medical Records</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger id="profile-tab" value="profile">Profile</TabsTrigger>
              <TabsTrigger id="records-tab" value="records">Medical Records</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-semibold text-slate-700 mb-1">Full Name</div>
                  <div className="font-roboto text-blue-900 mb-4">{patient.name}</div>

                  <div className="font-semibold text-slate-700 mb-1">Date of Birth</div>
                  <div className="font-roboto text-blue-900 mb-4">{patient.dob}</div>

                  <div className="font-semibold text-slate-700 mb-1">Status</div>
                  <div className="mb-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      patient.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}
                    `}>{patient.status}</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-700 mb-1">Email</div>
                  <div className="font-roboto text-blue-900 mb-4">{patient.email}</div>

                  <div className="font-semibold text-slate-700 mb-1">Phone</div>
                  <div className="font-roboto text-blue-900 mb-4">{patient.phone}</div>

                  <div className="font-semibold text-slate-700 mb-1">Address</div>
                  <div className="font-roboto text-blue-900 mb-4">{patient.address}</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="records">
              <div>
                <div className="font-semibold text-slate-700 mb-3">Medical Records</div>
                {patient.records.length === 0 ? (
                  <div className="text-slate-400 font-roboto flex items-center gap-2"><FileText className="w-5 h-5" />No medical records available.</div>
                ) : (
                  <div className="overflow-x-auto rounded-md border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-100">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Summary</th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {patient.records.map(r => (
                          <tr key={r.id}>
                            <td className="px-4 py-3 text-blue-900 font-roboto">{r.date}</td>
                            <td className="px-4 py-3 text-slate-700 font-semibold">{r.type}</td>
                            <td className="px-4 py-3 text-slate-700 font-roboto">{r.summary}</td>
                            <td className="px-4 py-3">
                              <Button id={`view-record-${r.id}`} variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50" disabled>
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

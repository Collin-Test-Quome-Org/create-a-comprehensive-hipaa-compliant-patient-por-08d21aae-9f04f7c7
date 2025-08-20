import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserSearch, Users2 } from 'lucide-react'
import { useState } from 'react'

// Fake patient data
const mockPatients = [
  {
    id: 'p001',
    name: 'Alexandra Rivera',
    dob: '1990-04-12',
    email: 'alex.rivera@example.com',
    status: 'Active',
    lastVisit: '2024-05-18',
  },
  {
    id: 'p002',
    name: 'Michael Chen',
    dob: '1983-09-27',
    email: 'michael.chen@example.com',
    status: 'Active',
    lastVisit: '2024-06-06',
  },
  {
    id: 'p003',
    name: 'Priya Patel',
    dob: '1976-12-02',
    email: 'priya.patel@example.com',
    status: 'Inactive',
    lastVisit: '2023-11-16',
  },
  {
    id: 'p004',
    name: 'Jordan Lee',
    dob: '2001-01-14',
    email: 'jordan.lee@example.com',
    status: 'Active',
    lastVisit: '2024-06-01',
  },
]

export function StaffPatientList() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 bg-blue-50 rounded-t-lg">
          <Users2 className="text-blue-700 w-8 h-8" />
          <div>
            <CardTitle className="font-inter text-2xl text-blue-800 mb-1">Patient Directory</CardTitle>
            <div className="text-sm text-slate-600 font-roboto">
              Search, select, and manage your patient roster securely.
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-stretch gap-4 mb-6">
            <div className="flex-1 flex items-center bg-white rounded-md shadow-inner px-2">
              <UserSearch className="text-slate-400 mr-2" />
              <Input
                id="staff-patient-search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email"
                className="border-none shadow-none focus:ring-0 font-roboto text-base"
                aria-label="Search patients"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">DOB</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Last Visit</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500 font-roboto">
                      No patients found.
                    </td>
                  </tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-roboto font-medium text-blue-900">{p.name}</td>
                    <td className="px-4 py-3 text-slate-700">{p.dob}</td>
                    <td className="px-4 py-3 text-blue-700">{p.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                        p.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}
                      `}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{p.lastVisit}</td>
                    <td className="px-4 py-3">
                      <Button
                        id={`view-patient-${p.id}`}
                        variant="outline"
                        className="text-blue-700 border-blue-200 hover:bg-blue-50"
                        onClick={() => navigate(`/staff/patients/${p.id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

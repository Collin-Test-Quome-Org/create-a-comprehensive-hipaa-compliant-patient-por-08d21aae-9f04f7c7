import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { UserCog, Plus, Search, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

// Fake data for users
const FAKE_USERS = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    role: 'Patient',
    enabled: true,
  },
  {
    id: '2',
    name: 'Dr. John Carter',
    email: 'john.carter@clinic.com',
    role: 'Provider',
    enabled: true,
  },
  {
    id: '3',
    name: 'Alice Brown',
    email: 'alice.brown@email.com',
    role: 'Patient',
    enabled: false,
  },
  {
    id: '4',
    name: 'Evelyn Lee',
    email: 'evelyn.lee@clinic.com',
    role: 'Staff',
    enabled: true,
  },
]

export function AdminUsersPage() {
  const [users, setUsers] = useState(FAKE_USERS)
  const [search, setSearch] = useState('')

  function handleToggleEnable(userId: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, enabled: !u.enabled } : u
      )
    )
  }

  function handleChangeRole(userId: string, newRole: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: newRole } : u
      )
    )
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      className="px-6 py-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <UserCog className="text-primary w-8 h-8" />
        <h1 className="font-[Inter] font-bold text-3xl tracking-tight">User Management</h1>
        <Badge className="ml-2 bg-secondary text-primary font-bold text-xs">Admin Only</Badge>
      </div>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-800" />
            Manage Users
          </CardTitle>
          <Button id="add-user-btn" className="gap-2" variant="outline" disabled>
            <Plus className="w-4 h-4" /> Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input
              id="search-users-input"
              className="max-w-xs"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search className="w-5 h-5 text-secondary" />
          </div>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length ? (
                  filteredUsers.map(user => (
                    <TableRow key={user.id} className="hover:bg-blue-50">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <select
                          id={`role-select-${user.id}`}
                          className="border rounded px-2 py-1 text-sm focus:outline-blue-800"
                          value={user.role}
                          onChange={e => handleChangeRole(user.id, e.target.value)}
                        >
                          <option>Patient</option>
                          <option>Provider</option>
                          <option>Staff</option>
                          <option>Admin</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        {user.enabled ? (
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch
                          id={`enable-switch-${user.id}`}
                          checked={user.enabled}
                          onCheckedChange={() => handleToggleEnable(user.id)}
                          className="data-[state=checked]:bg-blue-700"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-secondary text-sm py-6">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="text-sm text-muted-foreground">
        <strong>Note:</strong> All user actions are logged for HIPAA compliance.
      </div>
    </motion.div>
  )
}

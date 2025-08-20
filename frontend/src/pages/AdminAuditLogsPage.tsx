import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { DownloadCloud, Search } from 'lucide-react'
import { motion } from 'framer-motion'

// Fake data for demo
const FAKE_LOGS = [
  {
    id: '1',
    user: 'drsmith',
    action: 'Viewed patient record',
    timestamp: '2024-06-21 08:43:23',
    ip: '192.168.1.12',
    status: 'Success',
  },
  {
    id: '2',
    user: 'nursejane',
    action: 'Downloaded lab results',
    timestamp: '2024-06-21 09:02:44',
    ip: '192.168.1.14',
    status: 'Success',
  },
  {
    id: '3',
    user: 'admin',
    action: 'Changed user role',
    timestamp: '2024-06-20 15:16:05',
    ip: '10.0.0.2',
    status: 'Success',
  },
  {
    id: '4',
    user: 'drlee',
    action: 'Attempted login',
    timestamp: '2024-06-19 23:12:54',
    ip: '173.18.9.112',
    status: 'Failed',
  },
]

export function AdminAuditLogsPage() {
  const [filter, setFilter] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [logs] = useState(FAKE_LOGS)

  const filteredLogs = logs.filter((log) => {
    const matchText =
      log.user.toLowerCase().includes(filter.toLowerCase()) ||
      log.action.toLowerCase().includes(filter.toLowerCase()) ||
      log.status.toLowerCase().includes(filter.toLowerCase())
    const matchDate = date
      ? log.timestamp.startsWith(
          date.toISOString().split('T')[0]
        )
      : true
    return matchText && matchDate
  })

  function handleExport() {
    // Fake export: just download the logs as a CSV
    const header = ['User', 'Action', 'Timestamp', 'IP', 'Status']
    const rows = filteredLogs.map((log) =>
      [log.user, log.action, log.timestamp, log.ip, log.status].join(',')
    )
    const csv = [header.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'audit-logs.csv'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto my-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-primary text-2xl font-bold flex items-center gap-2">
              <DownloadCloud className="w-6 h-6 text-primary" />
              System Audit Logs
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Review, filter, and export system audit logs for HIPAA compliance.
            </span>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button id="export-logs-btn" variant="outline" className="gap-2" onClick={handleExport}>
              <DownloadCloud className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="audit-search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Input
                  id="audit-search"
                  type="text"
                  placeholder="User, action, status..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-2 top-2.5 w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="audit-date" className="text-sm font-medium">Date</label>
              <Calendar
                id="audit-date"
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg shadow border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <span
                          className={
                            log.status === 'Success'
                              ? 'text-green-700 font-semibold'
                              : 'text-red-700 font-semibold'
                          }
                        >
                          {log.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No audit logs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

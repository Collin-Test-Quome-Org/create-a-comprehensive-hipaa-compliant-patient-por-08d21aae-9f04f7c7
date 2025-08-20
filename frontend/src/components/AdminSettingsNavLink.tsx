import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ShieldCheck } from 'lucide-react'

export function AdminSettingsNavLink() {
  const location = useLocation()
  return (
    <Link
      to="/admin/settings"
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 font-medium transition',
        location.pathname.startsWith('/admin/settings') && 'bg-blue-100 text-blue-700 shadow'
      )}
      id="nav-admin-settings"
    >
      <ShieldCheck className="w-5 h-5" />
      System Settings
    </Link>
  )
}

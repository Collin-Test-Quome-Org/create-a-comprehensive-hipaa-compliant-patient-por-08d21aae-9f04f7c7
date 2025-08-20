import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Link } from 'react-router-dom'
import { ShieldCheck, LogIn, UserPlus, Users } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="w-full bg-white shadow-sm z-10 sticky top-0 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} aria-label="HIPAA Patient Portal Home">
                <Link to="/">
                  <img src="/branding/assets/logo-0.png" className="w-8 h-8 inline-block mr-2 align-middle" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/appointments">Appointments</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/medical-records">Records</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/support">Support</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/admin/users">
                  <Users className="w-4 h-4 mr-1 inline-block" /> Admin
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-2">
          <Link to="/login">
            <button id="login-nav-btn" className="flex items-center px-4 py-2 rounded font-semibold text-blue-900 hover:bg-blue-50 transition border border-blue-100">
              <LogIn className="w-4 h-4 mr-1"/> Login
            </button>
          </Link>
          <Link to="/register">
            <button id="register-nav-btn" className="flex items-center px-4 py-2 rounded font-semibold bg-blue-700 text-white hover:bg-blue-800 transition">
              <UserPlus className="w-4 h-4 mr-1"/> Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

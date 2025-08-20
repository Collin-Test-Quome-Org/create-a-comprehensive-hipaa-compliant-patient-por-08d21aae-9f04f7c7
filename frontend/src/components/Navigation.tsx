import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export function Navigation() {
  const location = useLocation()
  return (
    <nav className="w-full z-30 bg-white dark:bg-slate-950 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ' px-2'}>
                <Link to="/">
                  <span className="inline-flex items-center">
                    <img src="/branding/assets/logo-0.png" className="w-8 h-8 mr-2" />
                    <span className="font-bold text-xl text-blue-800 tracking-tight font-inter">SecureHealth Portal</span>
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/dashboard" id="nav-dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/medical-records" id="nav-medical-records">Records</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/appointments" id="nav-appointments">Appointments</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/messages" id="nav-messages">Messages</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-2">
          <Link to="/login" id="nav-login" className="font-semibold text-blue-700 hover:underline px-3 py-1 rounded-lg">Login</Link>
          <Link to="/register" id="nav-register" className="font-semibold text-white bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-lg">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}

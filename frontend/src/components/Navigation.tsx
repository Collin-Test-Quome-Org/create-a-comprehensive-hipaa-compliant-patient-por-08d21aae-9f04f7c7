import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

// Company voice: "Welcome to ShieldConnect Portal: Secure, Connected Care."

export function Navigation() {
  const location = useLocation()
  const staffActive = location.pathname.startsWith('/staff')

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <NavigationMenu className="bg-transparent">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ' px-3'}>
                <Link to="/">
                  <ShieldCheck className="inline-block mr-2 text-blue-700" />
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
                <Link to="/messages">Messages</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/profile">Profile</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Staff section */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + (staffActive ? ' bg-blue-100' : '')}>
                <Link to="/staff/dashboard">Staff</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Link to="/login" className="font-roboto text-blue-700 hover:underline text-sm">Login</Link>
          <Link to="/register" className="ml-2 font-roboto text-white bg-blue-700 rounded px-3 py-1 text-sm hover:bg-blue-800 transition">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}

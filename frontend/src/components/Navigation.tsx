import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { useLocation, Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
]

export function Navigation() {
  const location = useLocation()
  return (
    <nav className="w-full bg-white shadow-md border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        <NavigationMenu className="flex-1">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ' px-3 py-2'}>
                <Link to="/">
                  <img src={"/branding/assets/logo-0.png"} className="h-8 w-8 inline-block mr-2 align-middle" />
                  <span className="font-inter font-bold text-xl text-blue-800 align-middle">HIPAA Patient Portal</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {navItems.map(({ to, label }) => (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + (location.pathname === to ? ' bg-blue-100 text-blue-700' : '')}>
                  <Link to={to}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

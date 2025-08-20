import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Bell, MessageSquare, FileText, Users, Shield, BookOpen, Settings, UserPlus, LogIn, LogOut, HelpCircle } from 'lucide-react';

const navLinks = [
  { label: 'Prescriptions', to: '/prescriptions', icon: <FileText size={18} className="inline mr-2" /> },
  { label: 'Medical Records', to: '/medical-records', icon: <BookOpen size={18} className="inline mr-2" /> },
  { label: 'Messages', to: '/messages', icon: <MessageSquare size={18} className="inline mr-2" /> },
  { label: 'Support', to: '/support', icon: <HelpCircle size={18} className="inline mr-2" /> },
  { label: 'Notifications', to: '/notifications', icon: <Bell size={18} className="inline mr-2" /> },
];

const staffLinks = [
  { label: 'Appointments', to: '/staff/appointments', icon: <BookOpen size={18} className="inline mr-2" /> },
  { label: 'Patients', to: '/staff/patients', icon: <Users size={18} className="inline mr-2" /> },
  { label: 'Prescriptions', to: '/staff/prescriptions', icon: <FileText size={18} className="inline mr-2" /> },
  { label: 'Documents', to: '/staff/documents', icon: <BookOpen size={18} className="inline mr-2" /> },
  { label: 'Notifications', to: '/staff/notifications', icon: <Bell size={18} className="inline mr-2" /> },
];

const adminLinks = [
  { label: 'Settings', to: '/admin/settings', icon: <Settings size={18} className="inline mr-2" /> },
  { label: 'Users', to: '/admin/users', icon: <UserPlus size={18} className="inline mr-2" /> },
  { label: 'Audit Logs', to: '/admin/audit-logs', icon: <Shield size={18} className="inline mr-2" /> },
];

export function Navigation() {
  const location = useLocation();
  return (
    <nav className="w-full shadow bg-white sticky top-0 z-30 border-b border-slate-100">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/" aria-label="Patient Portal Home">
                  <img src="/branding/assets/logo-0.png" className="h-8 w-8 inline-block mr-2 align-middle" />
                  <span className="font-heading text-lg font-bold text-blue-700 align-middle">SafeHarbor</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {navLinks.map(link => (
              <NavigationMenuItem key={link.to}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + (location.pathname.startsWith(link.to) ? ' bg-blue-100 text-blue-800' : '')}>
                  <Link to={link.to}>
                    {link.icon}
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <div className="relative group">
                  <span className="font-semibold text-slate-500 cursor-pointer">Staff</span>
                  <div className="absolute left-0 mt-2 min-w-[220px] bg-white border border-slate-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-200">
                    {staffLinks.map(link => (
                      <Link key={link.to} to={link.to} className="block px-4 py-2 hover:bg-blue-50 text-slate-700">
                        {link.icon}{link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <div className="relative group">
                  <span className="font-semibold text-slate-500 cursor-pointer">Admin</span>
                  <div className="absolute left-0 mt-2 min-w-[220px] bg-white border border-slate-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-200">
                    {adminLinks.map(link => (
                      <Link key={link.to} to={link.to} className="block px-4 py-2 hover:bg-blue-50 text-slate-700">
                        {link.icon}{link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild id="login-button">
            <Link to="/login">
              <LogIn size={18} className="inline mr-2" /> Login
            </Link>
          </Button>
          <Button variant="default" asChild id="signup-button">
            <Link to="/signup">
              <UserPlus size={18} className="inline mr-2" /> Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

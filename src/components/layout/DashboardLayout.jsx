import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Globe, AlertTriangle, BarChart3, Star, ArrowLeft, Home } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/websites', label: 'Websites', icon: Globe },
  { path: '/incidents', label: 'Incidents', icon: AlertTriangle },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/reviews', label: 'Reviews', icon: Star },
  { path: '/', label: 'Back to Home', icon: Home },
]

const DashboardLayout = ({ title = 'Dashboard', children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <div className={`md:hidden fixed inset-0 z-50 pointer-events-none ${sidebarOpen ? 'pointer-events-auto' : ''}`}>
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />

        <div className={`fixed left-0 top-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 z-10 overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Mobile Sidebar Header */}
          <div className="h-14 flex items-center px-3 border-b border-zinc-800 justify-between sticky top-0">
            <div className="flex items-center gap-2 px-2">
              <div className="w-7 h-7 rounded-md bg-emerald-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PingGuard</span>
            </div>

            <button
              onClick={handleCloseSidebar}
              className="p-2 mr-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md"
              aria-label="Close sidebar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Sidebar Navigation */}
          <nav className="py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-zinc-800/80 text-white'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Sidebar Footer */}
          <div className="p-4 border-t border-zinc-800 absolute bottom-0 left-0 right-0">
            <div className="text-xs text-zinc-500 text-center font-medium pt-2 tracking-wide">
              PingGuard v1.0
            </div>
          </div>
        </div>
      </div>

      <div className="md:pl-56">
        <TopNavbar title={title} isMobile={true} sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen((s) => !s)} />
        <main className="p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
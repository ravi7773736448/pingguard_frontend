import { useState, useEffect, useRef } from 'react'
import { Activity, Wifi, WifiOff, Clock, CheckCircle, XCircle } from 'lucide-react'

const MAX_POINTS = 60

const LiveHeartbeat = ({ websites = [] }) => {
  const [heartbeatData, setHeartbeatData] = useState({})
  const [currentStatus, setCurrentStatus] = useState({})
  const prevStatusRef = useRef({})
  
  useEffect(() => {
    if (websites.length === 0) return
    
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
      
      const newStatus = {}
      const newHeartbeat = {}
      
      websites.slice(0, 6).forEach(site => {
        const siteId = site.id
        const status = site.status || 'UNKNOWN'
        newStatus[siteId] = status
        
        const normalizedStatus = status.toUpperCase()
        const value = normalizedStatus === 'UP' ? 1 : normalizedStatus === 'SLOW' ? 0.5 : normalizedStatus === 'DOWN' ? -1 : 0
        
        if (!heartbeatData[siteId]) {
          newHeartbeat[siteId] = Array(MAX_POINTS).fill(null).map(() => ({ 
            time: '', 
            value: null 
          }))
        } else {
          newHeartbeat[siteId] = [...heartbeatData[siteId]]
        }
        
        const shouldPulse = prevStatusRef.current[siteId] !== status
        prevStatusRef.current[siteId] = status
        
        newHeartbeat[siteId].push({
          time: timeStr,
          value: shouldPulse ? value * 1.5 : value,
          status: status
        })
        
        if (newHeartbeat[siteId].length > MAX_POINTS) {
          newHeartbeat[siteId].shift()
        }
      })
      
      setCurrentStatus(newStatus)
      setHeartbeatData(newHeartbeat)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [websites])

  const getStatusColor = (status) => {
    switch (status) {
      case 'UP': return '#22c55e'
      case 'SLOW': return '#eab308'
      case 'DOWN': return '#ef4444'
      default: return '#71717a'
    }
  }

  const getYPosition = (value) => {
    if (value === null) return 35 // Center of viewBox height (70)
    return 35 - (value * 25) // Up is 10, Down is 60. Keeps it safely inside 0-70.
  }

  const generatePath = (data) => {
    if (!data || data.length < 2) return ''
    
    const points = data.map((d, i) => {
      const x = (i / (MAX_POINTS - 1)) * 100
      const y = getYPosition(d.value)
      return `${x},${y}`
    })
    
    return `M ${points.join(' L ')}`
  }

  if (websites.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
          <Activity className="w-6 h-6 text-zinc-500" />
        </div>
        <h3 className="text-base font-medium text-white mb-1">No Monitors Active</h3>
        <p className="text-sm text-zinc-400 max-w-sm">Add your first website to start collecting realtime heartbeat and uptime telemetry.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <h3 className="text-sm font-medium text-white tracking-wide">Live Telemetry</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {websites.slice(0, 6).map(site => {
          const siteId = site.id
          const data = heartbeatData[siteId] || []
          const status = currentStatus[siteId] || site.status || 'UNKNOWN'
          
          let statusColor, bgColor, textColor, StatusIcon
          const normalizedStatus = status.toUpperCase()
          
          switch (normalizedStatus) {
            case 'UP':
              statusColor = '#34d399' // emerald-400
              bgColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              StatusIcon = CheckCircle
              break
            case 'DOWN':
              statusColor = '#f87171' // red-400
              bgColor = 'bg-red-500/10 text-red-400 border-red-500/20'
              StatusIcon = XCircle
              break
            case 'SLOW':
              statusColor = '#fbbf24' // amber-400
              bgColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              StatusIcon = Clock
              break
            default:
              statusColor = '#a1a1aa' // zinc-400
              bgColor = 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
              StatusIcon = Wifi
          }
          
          return (
            <div 
              key={siteId} 
              className={`group relative bg-zinc-950 border border-zinc-800/60 rounded-xl overflow-hidden transition-colors shadow-sm flex flex-col ${normalizedStatus === 'DOWN' ? 'border-red-900/30 shadow-[0_0_15px_rgba(248,113,113,0.05)]' : 'hover:border-zinc-700/80'}`}
            >
              <div className="p-4 pb-0 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 pr-4">
                    <h4 className="text-sm font-semibold text-zinc-100 truncate flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${normalizedStatus === 'UP' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : normalizedStatus === 'DOWN' ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)] animate-pulse' : 'bg-amber-400'}`} />
                      {site.name}
                    </h4>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">{site.url}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide uppercase ${bgColor} shrink-0`}>
                    <StatusIcon className="w-3 h-3" />
                    {normalizedStatus}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="font-medium text-zinc-300">{site.responseTime === 0 ? '-' : `${site.responseTime}ms`}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{new Date(site.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              
              <div className="h-14 w-full relative mt-auto border-t border-zinc-900/50 bg-zinc-900/20 group-hover:bg-zinc-900/40 transition-colors">
                <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`gradient-${siteId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={statusColor} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={statusColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {data.length > 0 && (
                    <>
                      <path
                        d={`${generatePath(data)} L 100,70 L 0,70 Z`}
                        fill={`url(#gradient-${siteId})`}
                        className="transition-all duration-300"
                      />
                      <path
                        d={generatePath(data)}
                        fill="none"
                        stroke={statusColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          filter: `drop-shadow(0 2px 4px ${statusColor}40)`
                        }}
                      />
                      {data[data.length - 1]?.value !== null && (
                        <circle
                          cx="100"
                          cy={getYPosition(data[data.length - 1].value)}
                          r="2.5"
                          fill={statusColor}
                          className={status === 'UP' ? 'animate-pulse' : ''}
                          style={{ filter: `drop-shadow(0 0 6px ${statusColor})` }}
                        />
                      )}
                    </>
                  )}
                </svg>
                
                {data.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-zinc-800/50" />
                    <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-zinc-700 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LiveHeartbeat
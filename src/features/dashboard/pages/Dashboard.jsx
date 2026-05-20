import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Globe, CheckCircle, AlertCircle, Clock, X, Edit2 } from 'lucide-react'
import StatCard from '../../../components/ui/StatCard'
import WebsiteTable from '../components/WebsiteTable'
import ActivityFeed from '../components/ActivityFeed'
import { UptimeChart, ResponseTimeChart } from '../components/AnalyticsCharts'
import LiveHeartbeat from '../components/LiveHeartbeat'
import IncidentSummary from '../components/IncidentSummary'
import AddWebsiteModal from '../components/AddWebsiteModal'
import {
  loadDashboardSummary,
  loadWebsites,
  createWebsiteThunk,
  deleteWebsiteThunk,
  triggerWebsiteCheckThunk,
  updateWebsiteThunk,
  clearError,
  clearSuccess
} from '../state/dashboard.slice'

const iconMap = {
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState(null)
  const [editUrl, setEditUrl] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const dispatch = useDispatch()

  const {
    stats,
    websites,
    isLoading,
    isLoadingSummary,
    error,
    successMessage
  } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(loadDashboardSummary())
    dispatch(loadWebsites())
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(loadDashboardSummary())
      dispatch(loadWebsites())
    }, 30000)

    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        if (error) dispatch(clearError())
        if (successMessage) dispatch(clearSuccess())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, successMessage, dispatch])

  const handleAddWebsite = async (data) => {
    try {
      const result = await dispatch(createWebsiteThunk(data)).unwrap()
      
      setIsModalOpen(false)
      
      if (result.website?.id) {
        setTimeout(() => {
          dispatch(triggerWebsiteCheckThunk(result.website.id))
        }, 300)
      }
      
      setTimeout(() => {
        dispatch(loadDashboardSummary())
        dispatch(loadWebsites())
      }, 500)
      
      return result
    } catch (err) {
      console.error('Failed to add website:', err)
      throw err
    }
  }

  const handleDeleteWebsite = (id) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      dispatch(deleteWebsiteThunk(id)).then(() => {
        dispatch(loadDashboardSummary())
      })
    }
  }

  const handleCheckWebsite = (id) => {
    dispatch(triggerWebsiteCheckThunk(id))
  }

  const handleEditClick = (site) => {
    setEditingWebsite(site)
    setEditUrl(site.url || site.websiteUrl || '')
    setIsEditModalOpen(true)
  }

  const handleEditSave = async () => {
    if (!editUrl.trim()) {
      alert('Please enter a valid URL')
      return
    }

    try {
      setEditLoading(true)
      await dispatch(updateWebsiteThunk({ id: editingWebsite.id, url: editUrl })).unwrap()
      setIsEditModalOpen(false)
      setEditingWebsite(null)
      dispatch(loadDashboardSummary())
      dispatch(loadWebsites())
    } catch (err) {
      alert(err.message || 'Failed to update website')
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Edit2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Edit Website URL</h2>
                  <p className="text-xs text-zinc-500">{editingWebsite?.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-11 px-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 h-11 bg-transparent border border-zinc-700 rounded-lg text-zinc-400 text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={editLoading}
                className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-md text-sm">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Overview</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Monitor your websites in real-time</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-9 px-4 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-500 transition-colors flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          Add Website
        </button>
      </div>

      {isLoadingSummary ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-lg h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon]
            return (
              <StatCard
                key={index}
                {...stat}
                icon={Icon}
              />
            )
          })}
        </div>
      )}

      <LiveHeartbeat websites={websites} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-white">Monitored Websites</h3>
          <span className="text-xs text-zinc-500">{websites.length} website{websites.length !== 1 ? 's' : ''}</span>
        </div>
        <WebsiteTable
          websites={websites}
          onView={(id) => console.log('View website:', id)}
          onCheck={handleCheckWebsite}
          onDelete={handleDeleteWebsite}
          onEdit={handleEditClick}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UptimeChart />
        <ResponseTimeChart />
      </div>

      <IncidentSummary />

      <AddWebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddWebsite}
        isLoading={isLoading || false}
      />
    </div>
  )
}

export default Dashboard
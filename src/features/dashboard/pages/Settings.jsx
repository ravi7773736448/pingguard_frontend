import { useState } from 'react'
import { Star, MessageSquare } from 'lucide-react'
import { submitReview } from '../../../services/review.service.js'

const Settings = () => {
  const [rating, setRating] = useState(5)
  const [role, setRole] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage(null)

    try {
      await submitReview({ rating, role, content })
      setStatusMessage({ type: 'success', text: 'Thank you! Your feedback has been submitted and is now live.' })
      setRole('')
      setContent('')
      setRating(5)
    } catch (error) {
      console.error(error)
      setStatusMessage({ type: 'error', text: 'Failed to submit review. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold text-white">Share Your Feedback</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Let us know how PingGuard is helping your team.</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        {statusMessage && (
          <div className={`mb-6 px-4 py-3 rounded-md text-sm ${statusMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star className={`w-8 h-8 ${rating >= star ? 'fill-emerald-400 text-emerald-400' : 'text-zinc-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-zinc-300 mb-1">Your Role / Title</label>
            <input
              id="role"
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Lead Developer, CTO, DevOps Engineer"
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-md px-4 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-zinc-300 mb-1">Your Experience</label>
            <textarea
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="How has PingGuard improved your workflow?"
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-md px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !role || !content}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquare className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings

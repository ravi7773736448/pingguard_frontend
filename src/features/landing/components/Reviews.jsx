import React, { useState, useEffect } from 'react'
import useFadeIn from './useFadeIn.js'
import useWindowWidth from './useWindowWidth.js'
import { getPublicReviews } from '../../../services/review.service.js'

export default function Reviews() {
  const [ref, visible] = useFadeIn()
  const width = useWindowWidth()
  const isMobile = width < 768
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const liveReviews = await getPublicReviews()
        if (liveReviews && liveReviews.length > 0) {
          setReviews(liveReviews)
        }
      } catch (error) {
        console.error('Failed to fetch reviews', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading || reviews.length === 0) return null

  return (
    <section id="reviews" ref={ref} style={{ padding: isMobile ? '80px 16px' : '120px 24px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.12em', color: '#10b981', textTransform: 'uppercase', marginBottom: '16px' }}>Testimonials</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '600', letterSpacing: '-0.025em', color: '#f5f5f5', margin: 0 }}>
            Loved by engineering teams
          </h2>
        </div>

        <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
          {/* Gradient masks for smooth fading on edges */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '100px', background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '100px', background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          
          <div 
            style={{ 
              display: 'flex', 
              gap: '24px', 
              width: 'max-content',
              animation: 'marquee 40s linear infinite',
              padding: '0 24px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {/* Duplicate array twice for seamless infinite scrolling */}
            {reviews.map((review, i) => (
              <div key={i} style={{ backgroundColor: '#111111', borderRadius: '16px', border: '1px solid #1a1a1a', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', width: isMobile ? '300px' : '400px', flexShrink: 0, transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} style={{ color: star <= (review.rating || 5) ? '#10b981' : '#333333', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#a0a0a0', lineHeight: '1.6', flex: 1 }}>
                  "{review.content}"
                </p>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#f5f5f5' }}>{review.name}</div>
                  <div style={{ fontSize: '13px', color: '#555555' }}>{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.33% - 8px)); }
        }
      `}</style>
    </section>
  )
}

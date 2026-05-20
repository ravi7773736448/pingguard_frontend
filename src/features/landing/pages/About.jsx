import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function About() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '120px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', color: '#a0a0a0', lineHeight: '1.7' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', color: '#f5f5f5', marginBottom: '24px', letterSpacing: '-0.025em' }}>
          About PingGuard
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
          PingGuard was built with a simple mission: to make website and API monitoring as effortless and transparent as possible. We believe that developers and engineering teams deserve beautiful, fast, and reliable tools to keep their services running smoothly.
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#f5f5f5', marginTop: '40px', marginBottom: '16px' }}>Our Story</h2>
        <p style={{ marginBottom: '16px' }}>
          Born out of frustration with clunky, outdated monitoring solutions, our founders set out to build a platform that didn't just tell you when things went wrong, but provided deep insights into performance bottlenecks before they turned into full-blown outages.
        </p>
        <p style={{ marginBottom: '16px' }}>
          Today, PingGuard is trusted by thousands of developers worldwide to monitor mission-critical APIs, microservices, and static sites.
        </p>
      </main>
      <Footer />
    </div>
  )
}

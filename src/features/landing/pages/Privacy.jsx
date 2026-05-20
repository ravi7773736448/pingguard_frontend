import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '120px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', color: '#a0a0a0', lineHeight: '1.7' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', color: '#f5f5f5', marginBottom: '24px', letterSpacing: '-0.025em' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '14px', marginBottom: '32px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginTop: '32px', marginBottom: '12px' }}>Information We Collect</h2>
        <p style={{ marginBottom: '24px' }}>
          We collect information you provide directly to us, such as when you create an account, configure an API monitor, or communicate with us. This includes your email, name, and the URLs/API endpoints you configure for monitoring.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginTop: '32px', marginBottom: '12px' }}>Data Security</h2>
        <p style={{ marginBottom: '24px' }}>
          We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk. Your API authentication headers and JSON payloads are securely stored and only used by our worker nodes for monitoring purposes.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginTop: '32px', marginBottom: '12px' }}>Cookies</h2>
        <p style={{ marginBottom: '24px' }}>
          We use secure, HTTP-only cookies to manage user sessions and authentication for the PingGuard dashboard. We do not use third-party tracking cookies.
        </p>
      </main>
      <Footer />
    </div>
  )
}

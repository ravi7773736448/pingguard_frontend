import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Terms() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '120px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', color: '#a0a0a0', lineHeight: '1.7' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', color: '#f5f5f5', marginBottom: '24px', letterSpacing: '-0.025em' }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: '14px', marginBottom: '32px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginTop: '32px', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '24px' }}>
          By accessing or using PingGuard's monitoring services, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the Service.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginTop: '32px', marginBottom: '12px' }}>2. Acceptable Use</h2>
        <p style={{ marginBottom: '24px' }}>
          You agree not to use the Service to monitor endpoints you do not own or have explicit permission to monitor. You agree not to abuse the API or use the Service for any illegal activities.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginTop: '32px', marginBottom: '12px' }}>3. Service Reliability</h2>
        <p style={{ marginBottom: '24px' }}>
          While we strive for 99.99% uptime for our monitoring agents, the Service is provided "AS IS", without warranty of any kind. We are not liable for any missed downtime alerts.
        </p>
      </main>
      <Footer />
    </div>
  )
}

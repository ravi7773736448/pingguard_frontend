import React from 'react'
import useWindowWidth from './useWindowWidth.js'

export default function Footer() {
  const width = useWindowWidth()
  const isMobile = width < 768

  return (
    <footer style={{ borderTop: '1px solid #1a1a1a', padding: isMobile ? '24px 16px' : '32px 24px' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/about" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>About Us</a>
          <a href="/terms" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Terms & Conditions</a>
          <a href="/privacy" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
        <span style={{ fontSize: '13px', color: '#555555', textAlign: 'center' }}>© {new Date().getFullYear()} PingGuard. All rights reserved.</span>
      </div>
    </footer>
  )
}

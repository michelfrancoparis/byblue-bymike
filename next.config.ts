import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Dev only: let phones on the local network (http://192.168.x.x:3000) load
  // the dev server's scripts, so pages are interactive when testing mobile.
  allowedDevOrigins: ['192.168.*.*'],
}

export default nextConfig

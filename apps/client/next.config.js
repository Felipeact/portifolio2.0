/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "upload-images-projects.s3.us-east-1.amazonaws.com",
        port: '',
        pathname: '/**/**',
      }
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

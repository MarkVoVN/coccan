/** @type {import('next').NextConfig} */


module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests"
          }
        ]
      }
    ]
  }
}
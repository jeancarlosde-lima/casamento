import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },

  /**
   * Headers de segurança HTTP.
   * Protege contra ataques XSS, clickjacking, MIME sniffing,
   * e restringe quais recursos externos podem ser carregados.
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Impede que o site seja carregado em iframes de outros domínios (anti-clickjacking)
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Previne MIME-type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Ativa proteção XSS do navegador
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Controla informações enviadas no header Referer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Controla quais APIs do navegador o site pode usar
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Força HTTPS por 1 ano
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

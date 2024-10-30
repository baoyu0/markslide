/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["reveal.js"],
  webpack: (config) => {
    // 处理字体文件
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name].[hash][ext]",
        publicPath: "/_next/",
      },
    });

    // 处理图片文件
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
      type: "asset/resource",
      generator: {
        filename: "static/images/[name].[hash][ext]",
        publicPath: "/_next/",
      },
    });

    return config;
  },
  // 禁用一些可能导致问题的优化
  experimental: {
    optimizeCss: false,
    esmExternals: true,
    appDir: true,
  },
  // 配置图片和字体域名
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  // 添加静态资源处理
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // 优化性能
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // 添加资源前缀
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://your-domain.com" : "",
  // 配置基础路径
  basePath: "",
  // 禁用 x-powered-by
  security: {
    headers: [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
    ],
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site tĩnh hoàn toàn: `next build` sinh thư mục `out/`, không có server.
  output: "export",
  // Không bật `cacheComponents`/`partialPrefetching`: cacheComponents bật PPR,
  // mà PPR không chạy được với `output: "export"`; partialPrefetching lại cần cacheComponents.
  // Docs Next báo bản major sau sẽ bật cả hai mặc định — khi nâng cấp phải kiểm lại export tĩnh.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

#!/bin/bash

# Stop on first error
set -e

echo "🔄 Converting Vite + React project to Next.js..."

# 1. Install Next.js dependencies
echo "📦 Installing Next.js, React, Tailwind dependencies..."
npm uninstall vite
npm install next react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Update package.json
echo "🔧 Updating package.json scripts..."
npx json -I -f package.json -e '
this.scripts = {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}'

# 3. Create necessary folders
echo "📁 Creating Next.js folder structure..."
mkdir -p app components public styles

# 4. Move Tailwind and global styles
mv src/index.css styles/globals.css || true

# 5. Create Next.js entry file
echo "📄 Creating app/layout.tsx..."
cat <<EOF > app/layout.tsx
import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AirTalk",
  description: "KU's offline-first chat platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF

# 6. Move pages
echo "📄 Moving pages to /app..."
mv src/pages/* app/ || true

# 7. Rename main page
mv app/Home.jsx app/page.jsx || true

# 8. Clean up Vite config
echo "🧹 Removing Vite files..."
rm -f vite.config.js index.html

# 9. Optional: Git stage changes
echo "✅ Migration complete. You can now run: npm install && npm run dev"
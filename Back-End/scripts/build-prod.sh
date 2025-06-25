#!/bin/bash

# Build script for production deployment
echo "Building GateGuard Backend for production..."

# Clean previous build
rm -rf dist/

# Build TypeScript
npm run build

# Create necessary directories in production build
mkdir -p dist/public/images/admins

# Copy public folder to dist if it exists
if [ -d "public" ]; then
    cp -r public/* dist/public/ 2>/dev/null || true
fi

echo "Build complete. Directory structure:"
echo "dist/"
ls -la dist/
echo "dist/public/"
ls -la dist/public/ 2>/dev/null || echo "No public directory found"

echo "Build ready for production!"

# Quick Fix for 404 Errors

## Problem:
You're accessing `localhost:3001` but Next.js runs on `localhost:3000` by default.

## Solution:

1. **Stop the current server** (Press Ctrl+C in the terminal where it's running)

2. **Clear cache and restart:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the correct URL:**
   - Open browser: `http://localhost:3000` (NOT 3001)

4. **If port 3000 is busy, use:**
   ```bash
   npm run dev -- -p 3001
   ```
   Then access: `http://localhost:3001`

## Quick Commands:
```bash
# Clear cache
cd frontend
rm -rf .next
# or on Windows PowerShell:
Remove-Item -Recurse -Force .next

# Start server
npm run dev
```

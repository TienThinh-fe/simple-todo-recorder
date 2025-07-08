# Vite Hot Reload Troubleshooting

If your Vite development server is not watching changes, try these solutions:

## 1. Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## 2. Clear Browser Cache

- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open DevTools > Network tab > check "Disable cache"

## 3. Check File System Watching (Windows/WSL specific)

If you're using WSL, you might need to increase the file watcher limit:

```bash
# In WSL terminal
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 4. Verify Vite Configuration

Create a `vite.config.js` file in the project root:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Enable if file watching doesn't work
    },
    hmr: {
      overlay: true,
    },
  },
})
```

## 5. Check Console for Errors

Open browser DevTools and look for:

- WebSocket connection errors
- Hot reload connection messages
- Any JavaScript errors

## 6. Test Hot Reload

1. Make a small change to any file (e.g., change a color in style.css)
2. Save the file
3. Check if the browser updates automatically
4. Look for "[vite] hot updated" messages in the browser console

## 7. Alternative: Manual Refresh

If hot reload still doesn't work, you can manually refresh the browser after making changes.


import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  const PORT = 3000;

  // In-memory state for collaboration
  // Map of fileId -> { content: string, version: number }
  const fileStates = new Map<string, { content: string, version: number }>();
  
  // Map of client -> { fileId: string, name: string, color: string }
  const clients = new Map<WebSocket, { fileId: string, name: string, color: string }>();

  const colors = ['#00ffcc', '#a855f7', '#3b82f6', '#ef4444', '#f59e0b', '#10b981'];

  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        switch (message.type) {
          case 'join': {
            const { fileId, name } = message;
            const color = colors[clients.size % colors.length];
            clients.set(ws, { fileId, name, color });
            
            // Send initial state
            const state = fileStates.get(fileId) || { content: '', version: 0 };
            ws.send(JSON.stringify({ 
              type: 'sync', 
              content: state.content, 
              version: state.version,
              color
            }));

            // Notify others in the same room
            broadcastToRoom(fileId, { 
              type: 'presence', 
              users: Array.from(clients.values())
                .filter(c => c.fileId === fileId)
                .map(c => ({ name: c.name, color: c.color }))
            });
            break;
          }

          case 'edit': {
            const { fileId, content, version } = message;
            const currentState = fileStates.get(fileId) || { content: '', version: 0 };
            
            // Simple last-write-wins with version check (optional)
            fileStates.set(fileId, { content, version });
            
            // Broadcast to all other clients in the same room
            broadcastToRoom(fileId, { 
              type: 'update', 
              fileId, 
              content, 
              version,
              sender: clients.get(ws)?.name
            }, ws);
            break;
          }
        }
      } catch (err) {
        console.error('Failed to process message:', err);
      }
    });

    ws.on('close', () => {
      const clientInfo = clients.get(ws);
      if (clientInfo) {
        const { fileId } = clientInfo;
        clients.delete(ws);
        
        // Update presence for others
        broadcastToRoom(fileId, { 
          type: 'presence', 
          users: Array.from(clients.values())
            .filter(c => c.fileId === fileId)
            .map(c => ({ name: c.name, color: c.color }))
        });
      }
      console.log('Client disconnected');
    });
  });

  function broadcastToRoom(fileId: string, message: any, excludeWs?: WebSocket) {
    const payload = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
        const info = clients.get(client);
        if (info?.fileId === fileId) {
          client.send(payload);
        }
      }
    });
  }

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', clients: wss.clients.size });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

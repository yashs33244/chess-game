import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import url from 'url';
import { extractAuthUser } from './auth';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws, req) {
  try {
    const token: string = url.parse(req.url, true).query.token as string;
    if (!token) {
      ws.close(1008, 'Token required');
      return;
    }
    const user = extractAuthUser(token, ws);
    gameManager.addUser(user);
    ws.on('close', () => gameManager.removeUser(ws));
  } catch (e) {
    console.error('WS auth failed:', e);
    ws.close(1008, 'Invalid token');
  }
});

console.log('done');

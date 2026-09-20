import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Body Parsers (support high-res camera photos up to 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SV Digital Studio',
    backend: 'Google Apps Script Web App + Google Sheets',
    time: new Date().toISOString(),
  });
});

// Endpoint to list existing saved founder photos on disk
app.get('/api/founder-photos', (req: Request, res: Response) => {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const result: Record<string, string> = {};

    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      for (const file of files) {
        if (file === 'vinjitha-r_portrait.jpg' || file === 'vinjitha_portrait.jpg') {
          result['vinjitha-r'] = `/${file}`;
        }
        if (file === 'sanjay_portrait.jpg' || file === 'sanjay-s_portrait.jpg') {
          result['sanjay-s'] = `/${file}`;
        }
      }
    }
    return res.json({ photos: result });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to list photos' });
  }
});

// Explicit static serving of uploaded founder images and public directory
const publicDirectory = path.join(process.cwd(), 'public');
app.use(express.static(publicDirectory));

// Explicit route for any portrait image request
app.get('/*_portrait.jpg', (req: Request, res: Response, next) => {
  const filePath = path.join(publicDirectory, path.basename(req.path));
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(filePath);
  }
  next();
});

// Dedicated photo retrieval endpoint by founder ID
app.get('/api/founder-photo/:founderId', (req: Request, res: Response) => {
  const { founderId } = req.params;
  const candidates = [
    `${founderId === 'sanjay-s' ? 'sanjay' : founderId}_portrait.jpg`,
    `${founderId}_portrait.jpg`,
    `${founderId}.jpg`,
  ];
  for (const filename of candidates) {
    const candidatePath = path.join(publicDirectory, filename);
    if (fs.existsSync(candidatePath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(candidatePath);
    }
  }
  return res.status(404).json({ error: 'Photo not found' });
});

// Endpoint to directly save exact original founder photo to disk
app.post('/api/upload-founder-photo', async (req: Request, res: Response) => {
  try {
    const { founderId, dataUrl } = req.body;
    if (!founderId || !dataUrl) {
      return res.status(400).json({ error: 'Missing founderId or dataUrl' });
    }
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid data URL format' });
    }
    const buffer = Buffer.from(matches[2], 'base64');
    const publicDir = path.join(process.cwd(), 'public');
    const assetsDir = path.join(process.cwd(), 'src', 'assets', 'images');
    const distDir = path.join(process.cwd(), 'dist');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const primaryFilename = `${founderId === 'sanjay-s' ? 'sanjay' : founderId}_portrait.jpg`;
    const aliasFilename = `${founderId}_portrait.jpg`;

    // Save to public/
    await fs.promises.writeFile(path.join(publicDir, primaryFilename), buffer);
    if (primaryFilename !== aliasFilename) {
      await fs.promises.writeFile(path.join(publicDir, aliasFilename), buffer);
    }

    // Save to src/assets/images/
    await fs.promises.writeFile(path.join(assetsDir, primaryFilename), buffer);
    if (primaryFilename !== aliasFilename) {
      await fs.promises.writeFile(path.join(assetsDir, aliasFilename), buffer);
    }

    // Also write to dist/ if dist exists
    if (fs.existsSync(distDir)) {
      await fs.promises.writeFile(path.join(distDir, primaryFilename), buffer);
      if (primaryFilename !== aliasFilename) {
        await fs.promises.writeFile(path.join(distDir, aliasFilename), buffer);
      }
    }

    return res.json({ success: true, url: `/${primaryFilename}?t=${Date.now()}` });
  } catch (err: any) {
    console.error('Failed to save founder photo:', err);
    return res.status(500).json({ error: 'Failed to save image' });
  }
});

// Vite middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SV Digital Studio server active on port ${PORT}`);
  });
}

startServer();

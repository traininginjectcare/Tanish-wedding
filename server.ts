import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'wishes.json');

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Ensure default wishes.json exists
if (!fs.existsSync(DATA_FILE)) {
  const defaultWishes = [
    {
      id: '1',
      name: 'Amit & Shivani Agarwal',
      relation: 'Family',
      message: 'Wishing Tanish & Shivani a lifetime filled with boundless love, endless laughter, and divine blessings!',
      event: 'Wedding',
      timestamp: 'Today',
    },
    {
      id: '2',
      name: 'Rahi & Nimisha Agarwal',
      relation: 'Family',
      message: 'So thrilled to celebrate our favorites! Waiting for the Sangeet dance battle and unforgettable memories!',
      event: 'Sangeet',
      timestamp: 'Today',
    },
    {
      id: '3',
      name: 'Rajiv & Reeta Gupta',
      relation: 'Gupta Family',
      message: 'Heartiest congratulations to Tanish and Shivani. May Guruji always shower His grace upon your union.',
      event: 'Blessings',
      timestamp: 'Today',
    },
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultWishes, null, 2), 'utf-8');
}

app.use(express.json());

// API: Get all saved wishes
app.get('/api/wishes', (_req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const wishes = JSON.parse(raw);
    res.json(wishes);
  } catch (err) {
    console.error('Error reading wishes:', err);
    res.status(500).json({ error: 'Failed to read wishes' });
  }
});

// API: Post a new wish
app.post('/api/wishes', (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    let wishes = [];
    if (fs.existsSync(DATA_FILE)) {
      wishes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }

    const newWish = {
      id: Date.now().toString(),
      name: String(name).trim(),
      relation: 'Guest',
      message: String(message).trim(),
      event: 'Wedding Blessings',
      timestamp: 'Just now',
    };

    wishes.unshift(newWish);
    fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
    res.status(201).json(wishes);
  } catch (err) {
    console.error('Error saving wish:', err);
    res.status(500).json({ error: 'Failed to save wish' });
  }
});

async function startServer() {
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // In dev mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

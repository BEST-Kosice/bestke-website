import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Path to the built files
const distPath = path.join(__dirname, 'dist');

// Serve static files from the build directory
app.use(express.static(distPath));

// Handle SPA routing: serve index.html for all non-file requests
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Port is assigned by Plesk via the PORT environment variable
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});

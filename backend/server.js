const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Dummy in-memory data (for Phase 1)
// In real setup, replace with PostgreSQL + queries

const vessels = [
  { imo: '1234567', name: 'MV SILVER STAR', risk: 'Low' },
  { imo: '7654321', name: 'MT BLACK SEA', risk: 'Medium' },
  { imo: '2345678', name: 'SS GHOST WAVE', risk: 'High' }
];

app.get('/api/vessels', (req, res) => {
  res.json(vessels);
});

app.get('/api/vessels/:imo', (req, res) => {
  const imo = req.params.imo;
  const v = vessels.find(v => v.imo === imo);
  if (!v) {
    return res.status(404).json({error: 'Vessel not found'});
  }
  // Dummy vessel detail + AIS track + risk flags
  res.json({
    imo: v.imo,
    name: v.name,
    risk: v.risk,
    flags: ['Dark AIS period (48h)', 'STS‑candidate', 'Flag‑hopping detected'],
    aisTrack: [],  // Later: array of {lat,lng,timestamp}
    portHistory: []
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

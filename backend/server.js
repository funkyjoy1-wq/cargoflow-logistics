const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin:  'https://your-frontend-url.vercel.app'  // <-- replace with your Vercel frontend URL
}));

// In-memory shipment database (demo)
let shipments = [
 {
  tracking_number: "TRK-2026-000001",
  status: "In Transit",
  last_location: "Lagos, Nigeria",
  estimated_delivery: "2026-03-15",
  lat: 6.5244,   // latitude
  lng: 3.3792,   // longitude
  history: [
    {
      location: "Lagos Warehouse",
      status: "Picked Up",
      date: "2026-03-10",
      lat: 6.5244,
      lng: 3.3792
    },
    {
      location: "Ibadan Hub",
      status: "In Transit",
      date: "2026-03-12",
      lat: 7.3775,
      lng: 3.9470
    }
  ]
}
];

// Get shipment by tracking number
app.get('/track/:tracking_number', (req, res) => {
  const tn = req.params.tracking_number.toUpperCase();
  const shipment = shipments.find(s => s.tracking_number === tn);
  if (shipment) res.json(shipment);
  else res.status(404).json({ error: "Tracking number not found" });
});

// Add new shipment
app.post('/shipments', (req, res) => {
  const { tracking_number, status, last_location, estimated_delivery } = req.body;
  shipments.push({ tracking_number, status, last_location, estimated_delivery, history: [] });
  res.json({ message: "Shipment added!" });
});

// Update shipment status
app.put('/shipments/:tracking_number', (req, res) => {
  const tn = req.params.tracking_number.toUpperCase();
  const shipment = shipments.find(s => s.tracking_number === tn);
  if (shipment) {
    const { status, last_location, date } = req.body;
    if (status) shipment.status = status;
    if (last_location) shipment.last_location = last_location;
    if (date) shipment.history.push({ location: last_location || shipment.last_location, status: status || shipment.status, date });
    res.json({ message: "Shipment updated!" });
  } else res.status(404).json({ error: "Tracking number not found" });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
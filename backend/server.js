const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://cargo-demo.vercel.app' // 🔁 Replace with your actual Vercel URL if different
}));

// Sample tracking route
app.get('/track/:tn', (req, res) => {
  const trackingNumber = req.params.tn;

  // Example data (you can later connect SQLite here)
  const shipmentData = {
    tracking_number: trackingNumber,
    status: "In Transit",
    last_location: "Madrid, Spain",
    lat: 40.4168,
    lng: -3.7038,
    estimated_delivery: "2026-03-25",
    history: [
      {
        date: "2026-03-18",
        status: "Shipment picked up",
        location: "Madrid, Spain"
      },
      {
        date: "2026-03-19",
        status: "In Transit",
        location: "Barcelona, Spain"
      }
    ]
  };

  res.json(shipmentData);
});

// Default route (optional)
app.get('/', (req, res) => {
  res.send('CargoFlow Backend is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
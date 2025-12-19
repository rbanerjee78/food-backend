import express from "express";

const app = express();
app.use(express.json());

/**
 * Mock database (for demo only)
 */
const restaurants = [
  {
    id: 1,
    name: "Spice Hub",
    rating: 4.4,
    deliveryTime: "30-40 min"
  },
  {
    id: 2,
    name: "Burger Town",
    rating: 4.1,
    deliveryTime: "25-35 min"
  }
];

const menu = {
  1: [
    { id: 101, name: "Paneer Butter Masala", price: 220 },
    { id: 102, name: "Butter Naan", price: 40 }
  ],
  2: [
    { id: 201, name: "Cheese Burger", price: 150 },
    { id: 202, name: "Fries", price: 80 }
  ]
};

/**
 * Health Check
 * URL → /api/health
 */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Food Delivery Backend",
    deployedOn: "Vercel"
  });
});

/**
 * Get restaurants
 * URL → /api/restaurants
 */
app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});

/**
 * Get menu by restaurant
 * URL → /api/restaurants/:id/menu
 */
app.get("/restaurants/:id/menu", (req, res) => {
  const data = menu[req.params.id];
  if (!data) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  res.json(data);
});

/**
 * Place order
 * URL → /api/order
 */
app.post("/order", (req, res) => {
  const { restaurantId, items } = req.body;

  if (!restaurantId || !items?.length) {
    return res.status(400).json({ error: "Invalid order" });
  }

  res.json({
    orderId: Math.floor(Math.random() * 100000),
    status: "Order placed",
    eta: "35 minutes"
  });
});

/**
 * ❌ No app.listen()
 * ✅ Export app for Vercel
 */
export default app;

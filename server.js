import app from "./api/index.js";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Food backend running locally on http://localhost:${PORT}`);
});

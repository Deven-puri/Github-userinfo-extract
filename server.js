// Local development entry point
const app = require("./api/server");
const PORT = process.env.PORT || 8050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

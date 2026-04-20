const express = require("express");

const app = express();
const root = __dirname;
const publicDir = require("path").join(root, "public");
const PORT = Number(process.env.PORT) || 3000;

app.use(express.static(publicDir, { index: "index.html" }));

app.listen(PORT, () => {
  console.log(`Variable Explorer: http://localhost:${PORT}`);
});

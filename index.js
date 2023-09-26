const express = require("express"); // Web Framework
const app = express();

app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, '/views'))
// app.use(express.static(path.join(__dirname, 'public')))

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", function (req, res) {
  res.send("<h1>URL " + req + " is not found</h1>");
});

app.listen(8080, () => {
  console.log("Listening on " + 8080);
});

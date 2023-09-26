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

  console.log(getBMI(1.85, 104))
});

// Used to make the final report
app.post('/userData', function(req, res) {
  const BMI = req.body.name;
  const age = req.body.age;
  const height = req.body.height
})

// Takes food input from form, uses API to get more data about the food and returns it
app.post('/searchFood', function(req, res) {
  const BMI = req.body.name;
  const age = req.body.age;
  const height = req.body.height
})

app.listen(80, () => {
  console.log("Listening on " + 80);
});

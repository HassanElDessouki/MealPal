const express = require("express");                                 // Web Framework
const app = express()

app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '/views'))
// app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    res.send("<h1>Welcome to MealPal</h1>");
});

app.listen(80, () => {
    console.log("Listening on Port 80")
})
const express = require("express"); // Web Framework
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config()

const corsOptions = {
  origin: 'http://localhost:3000' // Only allow requests from this origin
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("*", function (req, res) {
  res.send("<h1>URL " + req + " is not found</h1>");
});

app.post('/submit', async (req, res) => {
  const { userHeight, userAge, userWeight, userGender, userActivity } = req.body;

  let bmr;
  if (userGender === 'male') {
    bmr = 88.362 + (13.397 * userWeight) + (4.799 * userHeight) - (5.677 * userAge);
  } else {
    bmr = 447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.330 * userAge);
  }
  
  var tdee;
  switch (userActivity) {
    case 'sedentary':
      tdee = bmr * 1.2;
      break;
    case 'lightly':
      tdee = bmr * 1.375;
      break;
    case 'moderately':
      tdee = bmr * 1.55;
      break;
    case 'very':
      tdee = bmr * 1.725;
      break;
    case 'extremely':
      tdee = bmr * 1.9;
      break;
    default:
      console.error('Invalid Activity Level');
  }
  await axios.get('https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=' + tdee + '&apiKey=' + process.env.MEALAPI)
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.log("error: " + error.message)
  });
});

app.listen(3001, () => {
  console.log("Listening on " + 3001);
});
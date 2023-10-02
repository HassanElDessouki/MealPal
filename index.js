const express = require("express"); // Web Framework
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { CalculateTdee, Get_Protein_Carb_Fat_Ratio } = require('./Calculations'); // Import the function from Calculations.js
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Only allow requests from this origin
  credentials:true, //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("*", function (req, res) {
  res.send("<h1>URL " + req + " is not found</h1>");
});

app.post('/submit', async (req, res) => {
  // const { userAge, userHeight, userWeight, userGender, userActivity, userBMIStatus } = req.body;

  const { userAge, userHeight, userWeight, userGender, userActivity, userBMIStatus } = req.body;
  console.log(userAge);
  const tdee = CalculateTdee(userGender, userWeight, userHeight, userAge, userActivity);

  const protein_carb_fat_ratio = Get_Protein_Carb_Fat_Ratio(userBMIStatus);
  let proteinRatio = protein_carb_fat_ratio[0];
  let carbRatio = protein_carb_fat_ratio[1];
  let fatRatio = protein_carb_fat_ratio[2];
  
  const DailyProteinGrams = (tdee * proteinRatio) / 4;
  const DailyCarbGrams = (tdee * carbRatio) / 4;
  const DailyFatGrams = (tdee * fatRatio) / 9;

  console.log("User needs: " + DailyProteinGrams + " of Protein,", DailyCarbGrams + " of Carbs, and", DailyFatGrams + " of Fats");

  console.log("TDEE: " + tdee.toFixed(2));

  await axios.get("https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=" + tdee.toFixed(2) + '&apiKey=' + "009156dc14e74792888f7dc38abad812")
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.log("error: " + error.message);
  });
});


app.listen(3001, () => {
  console.log("Listening on " + 3001);
});

const express = require("express"); // Web Framework
const bodyParser = require('body-parser');
const cors = require('cors');
const { CalculateBmrAndTdee, Get_Protein_Carb_Fat_Ratio } = require('./Calculations'); // Import the function from Calculations.js
// const { Get_Protein_Carb_Fat_Ratio, CalculateBmrAndTdee } = require("./Calculations");
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Only allow requests from this origin
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("*", function (req, res) {
  res.send("<h1>URL " + req + " is not found</h1>");
});

app.post('/submit', (req, res) => {
  // const { userAge, userHeight, userWeight, userGender, userActivity, userBMIStatus } = req.body;

  const { userAge, userHeight, userWeight, userGender, userActivity, userBMIStatus } = req.body;
  console.log(userAge);
  console.log(userActivity);
  const bmr_and_tdee = CalculateBmrAndTdee(userGender, userWeight, userHeight, userAge, userActivity);
  const bmr = bmr_and_tdee[0];
  const tdee = bmr_and_tdee[1];

  const protein_carb_fat_ratio = Get_Protein_Carb_Fat_Ratio(userBMIStatus);
  let proteinRatio = protein_carb_fat_ratio[0];
  let carbRatio = protein_carb_fat_ratio[1];
  let fatRatio = protein_carb_fat_ratio[2];
  
  const DailyProteinGrams = (tdee * proteinRatio) / 4;
  const DailyCarbGrams = (tdee * carbRatio) / 4;
  const DailyFatGrams = (tdee * fatRatio) / 9;

  console.log("User needs: " + DailyProteinGrams + " of Protein,", DailyCarbGrams + " of Carbs, and", DailyFatGrams + " of Fats");

  res.json({ message: 'Data received successfully!' });
});


app.listen(3001, () => {
  console.log("Listening on " + 3001);
});

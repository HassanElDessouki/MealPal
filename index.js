const express = require("express"); // Web Framework
const bodyParser = require('body-parser');
const cors = require('cors');
const { CalculateBmrAndTdee } = require("./Calculations");
const { Get_Protein_Carb_Fat_Ratio } = require("./Calculations");
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000' // Only allow requests from this origin
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("*", function (req, res) {
  res.send("<h1>URL " + req + " is not found</h1>");
});


app.post('/submit', (req, res) => {
  const { userHeight, userAge, userWeight, userGender, userActivity, userBMIStatus } = req.body;

  const bmr_tdee_calculation = CalculateBmrAndTdee(userGender, userWeight, userHeight, userAge, userActivity);  
  let bmr = bmr_tdee_calculation[0];
  let tdee = bmr_tdee_calculation[1];


  const protein_carb_fat_ratio = Get_Protein_Carb_Fat_Ratio(userBMIStatus)[0];
  let proteinRatio = protein_carb_fat_ratio[0];
  let carbRatio = protein_carb_fat_ratio[1];
  let fatRatio = protein_carb_fat_ratio[2];

  const DailyProteinGrams = (tdee * proteinRatio) / 4;
  const DailyCarbGrams = (tdee * carbRatio) / 4;
  const DailyFatGrams = (tdee * fatRatio) / 9;

  console.log(
    "User needs: " + DailyProteinGrams + " of Protein,", 
    DailyCarbGrams + " of Carbs, and", 
    DailyFatGrams + " of Fats")

  var food = "";
  var InTakeOfCarbohydrates = 0;
  var InTakeOfProtein = 0;
  var InTakeOfFats = 0;

  if ((DailyProteinGrams - protein) > 0) {
    console.log("User needs " + (DailyProteinGrams - InTakeOfProtein).toFixed(2) + " more protein.")
  } else {
    console.log("User needs " + (DailyProteinGrams - InTakeOfProtein).toFixed(2) + " less protein.")
  }

  if ((DailyCarbGrams - protein) > 0) {
    console.log("User needs " + (DailyCarbGrams - InTakeOfCarbohydrates).toFixed(2) + " more protein.")
  } else {
    console.log("User needs " + (DailyCarbGrams - InTakeOfCarbohydrates).toFixed(2) + " less protein.")
  }

  if ((DailyFatGrams - protein) > 0) {
    console.log("User needs " + (DailyFatGrams - InTakeOfFats).toFixed(2) + " more protein.")
  } else {
    console.log("User needs " + (DailyFatGrams - InTakeOfFats).toFixed(2) + " less protein.")
  }

  res.json({ message: 'Data received successfully!' });
});


app.listen(3001, () => {
  console.log("Listening on " + 3001);
});

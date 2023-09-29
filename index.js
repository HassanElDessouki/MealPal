const express = require("express"); // Web Framework
const bodyParser = require('body-parser');
const cors = require('cors');
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

  const { foodData, userHeight, userAge, userWeight, userGender, userActivity, userBMIStatus } = req.body;
  
  console.log("Food Data: ", foodData);
  console.log("User Height: ", userHeight);
  console.log("User Age: ", userAge);
  console.log("User Weight: ", userWeight);
  console.log("User Gender", userGender);
  console.log("User Activity: ", userActivity);
  console.log("User BMI Status: ", userBMIStatus);
});

/* 
app.post('/submit', (req, res) => {
  const { foodData, userHeight, userAge, userWeight, userGender, userActivity, userBMIStatus } = req.body;

  let bmr;
  if (userGender === 'male') {
    bmr = 88.362 + (13.397 * userWeight) + (4.799 * userHeight) - (5.677 * userAge);
  } else {
    bmr = 447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.330 * userAge);
  }
  
  let tdee;
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

  let proteinRatio, carbRatio, fatRatio;
  switch (userBMIStatus) {
    case 'Underweight':
      proteinRatio = 0.15; // Encourage more balanced intake to gain healthy weight.
      carbRatio = 0.55;
      fatRatio = 0.3;
      break;
    case 'Normal':
      proteinRatio = 0.2; // Maintain a balanced intake.
      carbRatio = 0.5;
      fatRatio = 0.3;
      break;
    case 'Overweight':
      proteinRatio = 0.3; // Higher protein for satiety and muscle maintenance.
      carbRatio = 0.4;
      fatRatio = 0.3;
      break;
    case 'Obese':
      proteinRatio = 0.35; // Higher protein for satiety and muscle maintenance, lower carb to reduce calorie intake.
      carbRatio = 0.35;
      fatRatio = 0.3;
      break;
    default:
      console.error('Invalid BMI Category');
  }

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

  for (let i = 0; i < foodData.length; i++) {
    if (i > 0) {
      food = food + ", " + foodData[i][0]
    } else if (i === 0) {
      food = foodData[i][0]
    }

    let proteinGrams = foodData[i].find(item => item[0] === 1003)[2];
    let carbGrams = foodData[i].find(item => item[0] === 1005)[2];
    let fatGrams = foodData[i].find(item => item[0] === 1004)[2];

    InTakeOfCarbohydrates = InTakeOfCarbohydrates + carbGrams;
    InTakeOfFats = InTakeOfFats + fatGrams;
    InTakeOfProtein = InTakeOfProtein + proteinGrams;
  }

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
}); */

app.listen(3001, () => {
  console.log("Listening on " + 3001);
});

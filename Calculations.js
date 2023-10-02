// In this function where calculating the Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) of the user
const CalculateTdee = (
  userGender,
  userWeight,
  userHeight,
  userAge,
  userActivity
) => {
  let bmr;
  if (userGender === "male") {
    bmr = 88.362 + 13.397 * userWeight + 4.799 * userHeight - 5.677 * userAge;
  } else {
    bmr = 447.593 + 9.247 * userWeight + 3.098 * userHeight - 4.33 * userAge;
  }

  let tdee;
  switch (userActivity) {
    case "sedentary":
      return bmr * 1.2;
    case "lightly":
      return bmr * 1.375;
    case "moderately":
      return bmr * 1.55;
    case "very":
      return bmr * 1.725;
    case "extremely":
      return bmr * 1.9;
    default:
      console.error("Invalid Activity Level");
      break;
  }
};


// In this function where calculating the ratio of protein, carbs, and fats the user should be consuming
const Get_Protein_Carb_Fat_Ratio = (userBMIStatus) => {
  switch (userBMIStatus) { 
    // First index of the array is protein, second is carbs, third is fat
    case 'Underweight':
      return [0.15, 0.55, 0.3]; // Encourage more balanced intake to gain healthy weight
    case 'Normal':
      return [0.2, 0.5, 0.3]; // Maintain a balanced intake
    case 'Overweight':
      return [0.3, 0.4, 0.3]; // Higher protein for satiety and muscle maintenance
    case 'Obese':
      return [0.35, 0.35, 0.3]; // Higher protein for satiety and muscle maintenance, lower carb to reduce calorie intake
    default:
      console.error('Invalid BMI Category');
      break;
  }

};

module.exports = {
  CalculateTdee,
  Get_Protein_Carb_Fat_Ratio
}
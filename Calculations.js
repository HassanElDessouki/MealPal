// In this function where calculating the Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) of the user
const CalculateBmrAndTdee = (
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
      tdee = bmr * 1.2;
      break;
    case "lightly":
      tdee = bmr * 1.375;
      break;
    case "moderately":
      tdee = bmr * 1.55;
      break;
    case "very":
      tdee = bmr * 1.725;
      break;
    case "extremely":
      tdee = bmr * 1.9;
      break;
    default:
      console.error("Invalid Activity Level");
  }

  return [bmr, tdee];
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
  CalculateBmrAndTdee,
  Get_Protein_Carb_Fat_Ratio
}
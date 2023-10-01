export const calculateBmrAndTdee = (
  userGender,
  userWeight,
  userHeight,
  userAge,
  userActivity
) => {
  let bmr;
  if (userGender === "male") {
    bmr = 88.362 + (13.397 * userWeight) + (4.799 * userHeight) - (5.677 * userAge);
  } else {
    bmr = 447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.33 * userAge);
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

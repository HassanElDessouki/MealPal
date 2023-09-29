import { useEffect, useState } from "react";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";

export default function BMIScreen() {
  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("");
  // const [foodName, setfoodName] = useState("");
  
  const { state, dispatch } = useAppContext();
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else if (bmi >= 30) {
      return "Obese";
    }
  };

  // var userFood;
  // var [foodDataAAA, setfoodDataAAA] = useState([]);
  // const getFood = async (food) => {
  //   food.preventDefault()
  //   userFood = foodName

  //   await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?query=" + userFood + "&pageSize=1&api_key=" + process.env.REACT_APP_API_KEY, {
  //     // headers: new Headers({
  //     //   'X-Api-Key': '', 
  //     // }),
  //   })
  //   .then((response) => {
  //     if (!response.ok) { // Check if response status is not ok
  //       throw console.log(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json()
  //   })
  //   .then(data => {
  //     // Validate if data.foods[0] is not undefined to avoid errors
  //     if(!data.foods || !data.foods[0]) {
  //       console.error('No food data found in response');
  //       return;
  //     }

  //     let nutrientIds = [1008, 1004, 1005, 1003, 1079, 2000, 1253];
  //     let foodNutrients = data.foods[0].foodNutrients.filter(nutrient => nutrientIds.includes(nutrient.nutrientId));
  //     let foodArray = [data.foods[0].description]

  //     for (let i = 0; i < foodNutrients.length; i++) {
  //       foodArray.push([foodNutrients[i].nutrientId, foodNutrients[i].nutrientName, foodNutrients[i].value, foodNutrients[i].unitName])
  //     }
  //     setfoodDataAAA(prevData => [...prevData, foodArray]); // Update the state variable instead of the local variable
  //   })
  // }

  // const deleteFood = (index) => {
  //   // Filter out the food that is to be deleted
  //   const newFoodData = foodDataAAA.filter((_, i) => i !== index);
  //   setfoodDataAAA(newFoodData);
  // };

  // const createMealPlan = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/submit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       // body: JSON.stringify(foodDataAAA)
  //       body: JSON.stringify({
  //         foodData: foodDataAAA,
  //         userAge: state.user_units.age,
  //         userHeight: state.user_units.height,
  //         userWeight: state.user_units.weight,
  //         userGender: state.user_units.gender,
  //         userActivity: state.user_units.activity,
  //         userBMIStatus: bmiStatus
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     console.log('Data received from the server:', data);
  //   } catch (error) {
  //     console.error('Submit error:', error);
  //   }
  // }

  useEffect(() => {
    const bmi_calculation =
      state.user_units.weight / (state.user_units.height) ** 2;
    setBmi(bmi_calculation.toFixed(2));

    console.log(state.start_meal_plan_creation);

    console.log("BMI.jsx, height: ", state.user_units.height);
    console.log("BMI.jsx, weight: ", state.user_units.weight);

    setBmiStatus(getBMIStatus(bmi_calculation));
  }, [state.user_units, state.start_meal_plan_creation]);

  const show_meal_plan_button = () => {
    return (
      <button
        onClick={() => {
          dispatch({
            type: actions.START_MEAL_PLAN_CREATION,
            payload: true,
          })
        }}
        className="w-full mt-4 bg-button text-white py-2 rounded-xl text-xl">
        Create meal plan
      </button>
    );
  }


  return (
    <div className="flex flex-col justify-center bg-container px-8 w-[450px] h-[450px] rounded-[36px]">

      <h1 className="text-4xl font-bold">Alright, {state.name}!</h1>
      <p className="text-2xl mt-10">Your current BMI is: {bmi} kg/m2</p>
      <p className="text-2xl mt-5">
        That indicates that you are currently: <b>{bmiStatus}</b>
      </p>

      {
        {
          Underweight: (
            <div>
              <p className="text-xl mt-10 text-center">
                You should consider gaining some weight, and we will help you
                with that!
              </p>
             {show_meal_plan_button()}
            </div>
          ),
          Normal: (
            <p className="text-xl mt-5 text-center">
              You are in a healthy weight, keep it up!
            </p>
          ),
          Overweight: (
            <div>
              <p className="text-xl mt-10 text-center">
                You should consider losing some weight, and we will help you
                with that!
              </p>
              {show_meal_plan_button()}
            </div>
          ),
          Obese: (
            <div>
              <p className="text-xl mt-10 text-center">
                You should consider losing some weight, and we will help you
                with that!
              </p>
              {show_meal_plan_button()}
            </div>
          ),
        }[bmiStatus]
      }
    </div>
  );
}

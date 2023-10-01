import { useEffect, useState } from "react";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";

export default function BMIScreen() {
  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("");
  
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

  useEffect(() => {
    const bmi_calculation =
      state.user_units.weight / (state.user_units.height) ** 2;
    setBmi(bmi_calculation.toFixed(2));

    console.log(state.start_meal_plan_creation);
    console.log("Activity level: ", state.user_units.activity_level)

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
            <div>
              <p className="text-xl mt-5 text-center">
                You are in a healthy weight, keep it up, and we will help you with that!
              </p>
               {show_meal_plan_button()}
            </div>

            
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

import { useEffect, useState } from "react";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";
import { NavLink } from "react-router-dom";

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
    const bmi_calculation = state.user_units.weight / (state.user_units.height) ** 2;
    setBmi(bmi_calculation.toFixed(2));
    setBmiStatus(getBMIStatus(bmi_calculation));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user_units]);

  const generate_meal_plan = async () => {
    try {
      const response = await fetch("http://localhost:3001/submit/", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userAge: state.user_units.age,
          userHeight: state.user_units.height,
          userWeight: state.user_units.weight,
          userGender: state.user_units.gender,
          userActivity: state.user_units.activity_level,
          userBMIStatus: bmiStatus,
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({
        type: actions.SET_MEAL_PLAN,
        payload: data,
      });

    } catch (error) {
      console.error('Submit error:', error);
    }
  }

  const show_meal_plan_button = () => {
    return (
      <div className="w-full mt-4 bg-button text-white py-2 rounded-xl text-xl text-center hover:bg-green-500">
        <NavLink
          to="/meal-plan"
          onClick={() => generate_meal_plan()}
        // className="w-full mt-4 bg-button text-white py-2 rounded-xl text-xl"
        >
        Create meal plan
      </NavLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center sm:bg-container sm:px-8 sm:w-[450px] sm:h-[450px] sm:rounded-[36px]">
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

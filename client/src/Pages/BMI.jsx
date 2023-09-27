import { useEffect, useState } from "react";
import InfoContainer from "../Components/Info_Container";
import { useAppContext } from "../Utils/Context";

export default function BMIScreen() {
  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("");
  const { state } = useAppContext();
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
    /*  const bmi_calculation =
      <state className="user_units"></state>weight /
      (state.user_units.height * state.user_units.height); */
    const bmi_calculation =
      state.user_units.weight / (state.user_units.height / 100) ** 2;
    setBmi(bmi_calculation.toFixed(2));
    console.log(state.user_units.height);
    console.log(state.user_units.weight);

    setBmiStatus(getBMIStatus(bmi_calculation));
  }, [state.user_units]);
  return (
    <InfoContainer>
      <h1 className="text-4xl font-bold">I got your results {state.name}!</h1>
      <p className="text-2xl mt-10">Your BMI is: {bmi} kg/cm^2</p>
      <p className="text-2xl mt-5">
        That's indicate your status is: <b>{bmiStatus}</b>
      </p>

      {
        {
          Underweight: (
            <div>
              <p className="text-xl mt-10 text-center">
                You should consider gaining some weight, and we will help you
                with that!
              </p>
              <button className="w-full mt-4 bg-button text-white py-2 rounded-xl text-xl">
                See meal plan!
              </button>
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
              <button className="w-full mt-4 bg-button text-white py-2 rounded-xl text-xl">
                See meal plan!
              </button>
            </div>
          ),
          Obese: (
            <div>
              <p className="text-xl mt-10 text-center">
                You should consider losing some weight, and we will help you
                with that!
              </p>
              <button className="w-full mt-4 bg-button text-white py-2 rounded-xl text-xl">
                See meal plan!
              </button>
            </div>
          ),
        }[bmiStatus]
      }
    </InfoContainer>
  );
}

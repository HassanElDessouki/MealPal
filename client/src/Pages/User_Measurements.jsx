import { useEffect, useState } from "react";
import InfoContainer from "../Components/Info_Container";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";

export default function UserMeasurements() {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [age, setAge] = useState("");
  const [userGender, setuserGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState('sedentary'); // Default to Sedentary

  const { state, dispatch } = useAppContext();

  useEffect(() => {
    console.log(state.user_units);
    if (
      isNaN(state.user_units.height) === false &&
      isNaN(state.user_units.weight) === false &&
      isNaN(state.user_units.age) === false
    ) {
      dispatch({ type: actions.USER_UNITS_FILLED, payload: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user_units, state.user_units_filled]);

  const convertHeightToCentimeters = (value, unit) => {
    switch (unit) {
      case "cm":
        return parseFloat(value) / 100;
      // case "y":
      //   return parseFloat(value) * 0.9144;
      case "in":
        return parseFloat(value) * 2.54;
      case "ft":
        return parseFloat(value) * 30.48;
      default:
        return parseFloat(value);
    }
  };
  const convertWeightToKilograms = (value, unit) => {
    switch (unit) {
      case "st":
        return parseFloat(value) * 6.35029;
      case "lb":
        return parseFloat(value) * 0.453592;
      default:
        return parseFloat(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const heightInCentimeters = convertHeightToCentimeters(height, heightUnit);
    const weightInKilograms = convertWeightToKilograms(weight, weightUnit);
    const ageToInt = parseInt(age);

    dispatch({
      type: actions.SET_USER_UNITS,
      payload: {
        height: heightInCentimeters,
        weight: weightInKilograms,
        age: ageToInt,
        gender: userGender,
        activity: activityLevel
      },
    });
  };

  return (
    <InfoContainer>
      <h1 className="text-4xl font-bold">Nice to meet you, {state.name}!</h1>
      <h2 className="text-2xl mt-4">
        Now, I need to recap some information about you to continue.
      </h2>
      <form className="flex flex-col mt-5 gap-5" onSubmit={handleFormSubmit}>

        {/* Height Input */}
        <div className="flex flex-row items-center gap-5">
          <p className="text-xl">Height:</p>
          <input
            className="placeholder:text-xl border border-textInputStroke px-4 rounded-xl bg-transparent  placeholder:text-gray-300 w-36"
            placeholder="0"
            onChange={(e) => setHeight(e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <select
            id="height units"
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
            className=" rounded-xl bg-textInputStroke text-black"
          >
            <option value="m">Meters</option>
            <option value="cm">Centimeter</option>
            <option value="in">Inches</option>
            <option value="ft">Feets</option>
          </select>
        </div>

        {/* Weight Input */}
        <div className="flex flex-row items-center  gap-5">
          <p className="text-xl">Weight:</p>
          <input
            className="placeholder:text-xl border border-textInputStroke px-4 rounded-xl bg-transparent  placeholder:text-gray-300 w-36"
            placeholder="0"
            onChange={(e) => {
              setWeight(e.target.value.replace(/[^0-9.]/g, ""));
            }}
          />
          <select
            id="weight units"
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className=" rounded-xl bg-textInputStroke text-black"
          >
            <option value="kg">Kilograms</option>
            <option value="st">Stones</option>
            <option value="lb">Pounds</option>
          </select>
        </div>

        {/* Age Input */}
        <div className="flex flex-row items-center gap-12">
          <p className="text-xl">Age:</p>
          <input
            className="placeholder:text-xl w-36 border border-textInputStroke px-4 rounded-xl bg-transparent placeholder:text-gray-300"
            type="number"
            placeholder="0"
            onChange={(e) => {
              setAge(e.target.value.replace(/[^0-9.]/g, ""));
            }}
          />
        </div>

        {/* Gender Input */}
        <div className="flex flex-row items-center gap-12">
          <p className="text-xl">Gender:</p>
          <select
            id="gender"
            value={userGender}
            onChange={(e) => setuserGender(e.target.value)}
            className=" rounded-xl bg-textInputStroke text-black"
          >
            <option selected value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Activity Input */}
          <div className="flex flex-row items-center gap-12">
          <p className="text-xl">Activity Level:</p>
          <select 
            value={activityLevel} 
            onChange={(e) => setActivityLevel(e.target.value)}
            className=" rounded-xl bg-textInputStroke text-black"
          >
            <option value='sedentary'>Sedentary (little or no exercise)</option>
            <option value='lightly'>Lightly active (light exercise/sports 1-3 days/week)</option>
            <option value='moderately'>Moderately active (moderate exercise/sports 3-5 days/week)</option>
            <option value='very'>Very active (hard exercise/sports 6-7 days a week)</option>
            <option value='extremely'>Extra active (very hard exercise/sports & a physical job)</option>
          </select>
        </div>

        <button className="w-full mt-10 bg-button text-white py-2 rounded-xl">
          Continue
        </button>
      </form>
    </InfoContainer>
  );
}

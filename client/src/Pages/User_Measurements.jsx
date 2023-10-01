import { useEffect, useState } from "react";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";

export default function UserMeasurements() {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("m");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [age, setAge] = useState("");
  const [userGender, setuserGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (
      isNaN(state.user_units.height) === false &&
      isNaN(state.user_units.weight) === false &&
      isNaN(state.user_units.age) === false
    ) {
      dispatch({ type: actions.USER_UNITS_FILLED, payload: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user_units, state.user_units_filled, userGender]);

  const convertHeightToMeters = (value, unit) => {
    switch (unit) {
      case "cm":
        return parseFloat(value) / 100;
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
    const heightInMeters = convertHeightToMeters(height, heightUnit);
    const weightInKilograms = convertWeightToKilograms(weight, weightUnit);
    const ageToInt = parseInt(age);

    dispatch({
      type: actions.SET_USER_UNITS,
      payload: {
        height: heightInMeters,
        weight: weightInKilograms,
        age: ageToInt,
        gender: userGender,
        activity_level: activityLevel,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center bg-container px-8 w-[450px] h-[550px] rounded-[36px]">
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
            required
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
            required
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
            required
          />
        </div>

        <select
          id="gender"
          value={userGender}
          onChange={(e) => setuserGender(e.target.value)}
          className="rounded-xl bg-textInputStroke text-black"
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>

        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className=" rounded-xl bg-textInputStroke text-black"
          required
        >
          <option value="" disabled>
            Select your activity level
          </option>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightly">
            Lightly active (light exercise/sports 1-3 days/week)
          </option>
          <option value="moderately">
            Moderately active (moderate exercise/sports 3-5 days/week)
          </option>
          <option value="very">
            Very active (hard exercise/sports 6-7 days a week)
          </option>
          <option value="extremely">
            Extra active (very hard exercise/sports & a physical job)
          </option>
        </select>

        <button className="w-full mt-6 bg-button text-white py-2 rounded-xl">
          Continue
        </button>
      </form>
    </div>
  );
}

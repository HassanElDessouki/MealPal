import { useAppContext } from "../Utils/Context";
import UserMeasurements from "./User_Measurements";
import NameInputScreen from "./Name_Input";
import BMIScreen from "./BMI";

export default function CurrentScreen() {
  const { state } = useAppContext();

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      {state.show_greeting ? (
        <NameInputScreen />
      ) : !state.user_units_filled ? (
        <UserMeasurements />
      ) : (
        <BMIScreen />
      )}
    </div>
  );
}

/*

 {!showGreeting ? (
       
      ) : (
        <div>
          <p>Hey there, {name}</p>
          {!yourBMI ? (
            <form onSubmit={calculateBMI}>
              <p>What's your Age?</p>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <p>What's your Height?</p>

              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  value={height}
                  name="height"
                  id="height"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setHeight(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="units" className="sr-only">
                    Units
                  </label>
                  <select
                    id="units"
                    value={heightUnits}
                    onChange={(e) => setheightUnits(e.target.value)}
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option defaultValue value="cm">
                      centimeter
                    </option>
                    <option value="m">FOOT,INCHES to be added</option>
                  </select>
                </div>
              </div>

              <p>What's your Weight?</p>

              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  value={weight}
                  name="weight"
                  id="weight"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setWeight(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="weightUnits" className="sr-only">
                    Units
                  </label>
                  <select
                    id="weightUnits"
                    value={weightUnits}
                    onChange={(e) => setweightUnits(e.target.value)}
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option defaultValue value="kg">
                      kilogram
                    </option>
                    <option value="lb">pounds</option>
                  </select>
                </div>
              </div>

              <br />
              <button
                type="submit"
                class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            </form>
          ) : (
            <p>
              {name}, your BMI is: {!yourBMI ? "" : yourBMI}, indicating that
              you are {!BMIStatus ? "" : BMIStatus}
            </p>
          )}
        </div>
      )}

*/

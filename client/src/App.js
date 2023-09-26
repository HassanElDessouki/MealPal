import { useEffect, useState } from "react";
import './index.css';

function App() {
  const [name, setName] = useState(null)
  const [age, setAge] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [showGreeting, setShowGreeting] = useState(false);
  const [heightUnits, setheightUnits] = useState("cm");
  const [BMIStatus, setBMIStatus] = useState(false);
  const [weightUnits, setweightUnits] = useState("kg");

  var [yourBMI, setyourBMI] = useState(false);
  var userHeight;
  var userWeight;

  const calculateBMI = (e) => {
    e.preventDefault()

    userHeight = height
    userWeight = weight
    if (heightUnits === "cm") {
      userHeight = height * 0.01
    }
    console.log(weightUnits, weight)

    if (weightUnits === "lb") {
      userWeight = weight / 2.205
    }

    yourBMI = (userWeight / (userHeight * userHeight))
    yourBMI = Math.round((yourBMI + Number.EPSILON) * 100) / 100

    setyourBMI(yourBMI)

    if (yourBMI < 18.5) {
      setBMIStatus("Underweight")
    }
    if (yourBMI >= 18.5 && yourBMI <= 24.9) {
      setBMIStatus("Healthy")
    }
    if (yourBMI >= 25.0 && yourBMI <= 29.9) {
      setBMIStatus("Overweight")
    }
    if (yourBMI >= 30.0) {
      setBMIStatus("Obese")
    }
  }

  return (
    <div className="App">
      {!showGreeting ? (
        <div>
          <div>
            <p>Hello 👋</p>
            <p>What's your name?</p>
            <form>
              <input className="form-input px-4 py-3 rounded-full" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"/>
              <br/>
              <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" onClick={() => setShowGreeting(true)}>
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
        <p>Hey there, {name}</p>
        {!yourBMI ? (
        <form onSubmit={calculateBMI}>
          <p>What's your Age?</p><input class="form-input px-4 py-3 rounded-full" id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
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
              <label htmlFor="units" className="sr-only">Units</label>
              <select id="units" value={heightUnits} onChange={(e) => setheightUnits(e.target.value)} className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                <option defaultValue value="cm">cm</option>
                <option value="m">meters</option>
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
              <label htmlFor="weightUnits" className="sr-only">Units</label>
              <select id="weightUnits" value={weightUnits} onChange={(e) => setweightUnits(e.target.value)} className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                <option defaultValue value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>

          <br/>
          <button type="submit" class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Next</button>
          </form>
          ) : (
            <p>{name}, your BMI is: {!yourBMI ? "" : yourBMI}, indicating that you are {!BMIStatus ? "" : BMIStatus}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

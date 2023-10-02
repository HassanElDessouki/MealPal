import { useEffect, useState } from "react";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";

export default function NameInputScreen() {
  const [name, setName] = useState("");
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: actions.SET_GREETING, payload: state.name === "" });
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name, state.show_greeting]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_NAME", payload: name });
  };

  return (
    <div className="flex justify-center flex-col sm:bg-container sm:px-8 sm:w-[450px] sm:h-[450px] sm:rounded-[36px]">
      <h1 className="text-5xl font-bold">Hello 👋</h1>
      <h2 className="text-2xl mt-10">What's your name?</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className="w-full mt-2 border border-textInputStroke px-4 rounded-xl bg-transparent placeholder:text-xl placeholder:text-gray-300"
          type="text"
          placeholder="John Doe"
          onChange={(e) => {
            setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""));
          }}
          required
        />
        <button className="w-full mt-10 bg-button text-white py-2 rounded-xl hover:bg-green-500">
          Continue
        </button>
      </form>
    </div>
  );
}

/* <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
  />
</svg>; */

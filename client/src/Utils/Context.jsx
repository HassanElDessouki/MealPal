import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./Reducers.js";
// Here I define the initial state
const initialState = {
  name: "",
  show_greeting: true,
  user_units: [],
  user_units_filled: false,
  start_meal_plan_creation: false,
  user_data_for_meal_plan: [], 
};

const AppContext = createContext(initialState);

// Here I define the provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Here I define the consumer
export const useAppContext = () => {
  return useContext(AppContext);
};

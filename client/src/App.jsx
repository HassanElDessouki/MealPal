// import { useState } from "react";
import CurrentScreen from "./Pages/Current_Screen";
import DayPlanScreen from "./Pages/Day_Plan";
import MealPlanScreen from "./Pages/Meal_Plan";
import { AppProvider } from "./Utils/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<CurrentScreen />} />
              <Route path="/meal-plan" element={<MealPlanScreen/>}/>
              <Route path="/meal-plan/:day" element={<DayPlanScreen/>}/>
          </Routes>
      </BrowserRouter>
    </AppProvider>    
  );
}

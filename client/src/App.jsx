// import { useState } from "react";
import "./app.css";
import CurrentScreen from "./Pages/Current_Screen";
import { AppProvider } from "./Utils/Context";
export default function App() {
  return (
    <AppProvider>
      <CurrentScreen />
    </AppProvider>
  );
}

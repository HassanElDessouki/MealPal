import { useAppContext } from "../Utils/Context";
import UserMeasurements from "./User_Measurements";
import NameInputScreen from "./Name_Input";
import BMIScreen from "./BMI";

export default function CurrentScreen() {
  const { state } = useAppContext();

  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
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

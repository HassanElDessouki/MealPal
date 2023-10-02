import { useAppContext } from "../Utils/Context";
import UserMeasurements from "./User_Measurements";
import NameInputScreen from "./Name_Input";
import BMIScreen from "./BMI";

export default function CurrentScreen() {
  const { state } = useAppContext();

  return (
    <div class="flex flex-col mt-44 mx-5 sm:mt-[-2%] sm:mx-[-2%] sm:w-screen sm:h-screen items-center justify-center">
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

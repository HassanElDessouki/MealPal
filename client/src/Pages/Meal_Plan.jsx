import { useEffect } from "react";
import { useAppContext } from "../Utils/Context";
import { NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";

export default function MealPlanScreen() {
    const { state } = useAppContext();

    useEffect(() => {
        console.log(state.meal_plan_data.week)
    }, [state.meal_plan_data.week])

    const weekdays = {
        Monday: "monday",
        Tuesday: "tuesday",
        Wednesday: "wednesday",
        Thursday: "thursday",
        Friday: "friday", 
    }

    return (
        <div class="flex flex-col mt-28 mx-5 sm:mt-[-2%] sm:mx-[-2%] sm:w-screen sm:h-screen items-center justify-center">
            <div className="flex flex-col justify-center sm:bg-container sm:px-8 sm:h-[450px] sm:rounded-[36px]">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">
                        Here is your weekly meal plan {state.name}!
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-5 mt-10">
                        {
                            Object.keys(weekdays).map((day) =>
                                <NavLink
                                    to={`/meal-plan/${weekdays[day]}`}
                                    className="bg-green-800 text-xl py-4 px-10 rounded-2xl hover:bg-green-600"
                                >
                                    {day}
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
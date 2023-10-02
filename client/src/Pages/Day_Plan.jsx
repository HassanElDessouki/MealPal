import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Utils/Context";

export default function DayPlanScreen() {
    const { state } = useAppContext();
    const [meals, setMeals] = useState([]);
    const [nutrients, setNutrients] = useState({});
    const day = useParams().day;

    useEffect(() => {
        console.log(state.meal_plan_data.week);
        setMeals(state.meal_plan_data.week[day].meals);
        setNutrients(state.meal_plan_data.week[day].nutrients);
        console.log(nutrients);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day, state.meal_plan_data])

    return(
        <div className="w-[55%] sm:w-[100%]">
            <h1 className="text-xl sm:text-4xl">We recommend you have the following meals:</h1>
            <div className="flex flex-col gap-10 mt-5">
                {
                    meals.map((meal) =>
                        <div className="flex flex-col bg-green-800 py-4 px-2 sm:px-5 rounded-2xl gap-2">
                            <p className="text-base sm:text-2xl font-bold">{meal.title[0].toUpperCase() + meal.title.substring(1)}</p>
                            <p className="text-[10px] sm:text-lg">Ready in: {meal.readyInMinutes} minutes</p>
                            <p className="text-[10px] sm:text-lg">Recipe at: <a className="hover:underline" href={meal.sourceUrl}>{meal.sourceUrl}</a></p>
                        </div>
                    )
                }
            </div>

            <h2 className="text-lg first-line:sm:text-3xl mt-14">We recommend you consume the next nutrients:</h2>
            <div className="flex flex-col gap-6 mt-5">
                {
                    Object.keys(nutrients).map((nutrient) =>
                        <li className="text-base sm:text-xl sm:font-bold">
                                {nutrient[0].toUpperCase() + nutrient.substring(1)}: {nutrients[nutrient]}
                        </li>
                    )
                }
            </div>

        </div>
    );
}
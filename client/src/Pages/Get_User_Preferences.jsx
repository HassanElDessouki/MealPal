import { useEffect, useState } from "react";
import { useAppContext } from "../Utils/Context";
import { actions } from "../Utils/Reducers";

export default function GetUserPreferencesData() {
    const {state, dispatch} = useAppContext() 
    const [activityLevel, setActivityLevel] = useState();

    useEffect(() => {
        console.log(state.user_data_for_meal_plan.activity)
    }, [activityLevel, state.user_data_for_meal_plan])


    return (
        <div>
         <p className="text-xl">Activity Level:</p>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className=" rounded-xl bg-textInputStroke text-black"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="lightly">
              Lightly active (light exercise/sports 1-3 days/week)
            </option>
            <option value="moderately">
              Moderately active (moderate exercise/sports 3-5 days/week)
            </option>
            <option value="very">
              Very active (hard exercise/sports 6-7 days a week)
            </option>
            <option value="extremely">
              Extra active (very hard exercise/sports & a physical job)
            </option>
            </select> 
            <button className="bg-white" onClick={
                () => dispatch({
                    type: actions.SET_USER_DATA_FOR_MEAL_PLAN,
                    payload: {
                        activity: activityLevel
                    }
                })
            }>
                Send
            </button>  
        </div>
    );
}
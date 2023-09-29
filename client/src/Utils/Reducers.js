export const actions = {
  SET_GREETING: "SET_GREETING",
  SET_NAME: "SET_NAME",
  SET_USER_UNITS: "SET_USER_UNITS",
  USER_UNITS_FILLED: "USER_UNITS_FILLED",
  START_MEAL_PLAN_CREATION: "START_MEAL_PLAN_CREATION",
  SET_USER_DATA_FOR_MEAL_PLAN: "SET_USER_DATA_FOR_MEAL_PLAN",
};

// Here I define the reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_GREETING:
      return {
        ...state,
        show_greeting: action.payload,
      };
    case actions.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case actions.SET_USER_UNITS:
      return {
        ...state,
        user_units: {
          height: action.payload.height,
          weight: action.payload.weight,
          age: action.payload.age,
          gender: action.payload.gender,
        },
      };
    case actions.USER_UNITS_FILLED:
      return {
        ...state,
        user_units_filled: action.payload,
      };
    case actions.START_MEAL_PLAN_CREATION:
      return {
        ...state,
        start_meal_plan_creation: action.payload,
      };
    case actions.SET_USER_DATA_FOR_MEAL_PLAN:
      return {
        ...state,
        user_data_for_meal_plan: {
          activity: action.payload.activity,
        }
      }
    default:
      return state;
  }
};

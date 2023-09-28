export const actions = {
  SET_GREETING: "SET_GREETING",
  SET_NAME: "SET_NAME",
  SET_USER_UNITS: "SET_USER_UNITS",
  USER_UNITS_FILLED: "USER_UNITS_FILLED",
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
          activity: action.payload.activity
        },
      };
    case actions.USER_UNITS_FILLED:
      return {
        ...state,
        user_units_filled: action.payload,
      };
    default:
      return state;
  }
};

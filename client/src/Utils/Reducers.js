export const actions = {
  SET_GREETING: "SET_GREETING",
  SET_NAME: "SET_NAME",
  SET_USER_UNITS: "SET_USER_UNITS",
  SET_HAVE_USER_UNITS: "SET_HAVE_USER_UNITS",
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
        },
      };
    case actions.SET_HAVE_USER_UNITS:
      return {
        ...state,
        have_user_units: action.payload,
      };
    default:
      return state;
  }
};

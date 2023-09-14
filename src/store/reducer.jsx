const initialState = {
  userId: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { userId: action.payload };
    case LOGOUT:
      return { userID: null };
    default:
      return state;
  }
};

export default reducer;

const loggedReducer = (state = { isLoggedIn: false, user: null }, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return { isLoggedIn: true, user: action.payload };
      case "SIGN_OUT":
        return { isLoggedIn: false, user: null };
  
      default:
        return state;
    }
  };
  
  export default loggedReducer;
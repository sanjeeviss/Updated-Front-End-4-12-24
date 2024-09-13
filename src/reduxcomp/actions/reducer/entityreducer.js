import { SETUSER } from "../action";
const initialState = { branch: "", company: "" };
export default function entityReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SETUSER:
      state = action.payload;
      return state;
    default:
      return initialState;
  }
}

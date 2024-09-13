import { SETUSER } from "./action";
export function setUser(data) {
  return {
    payload: data,
    type: SETUSER,
  };
}

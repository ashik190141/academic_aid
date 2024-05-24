import { decodeToken } from "./decodeToken";


export const userRole = (token) => {
  const userData = decodeToken(token);
  return userData.role;
};
import { decodeToken } from "./decodeToken"


export const userEmail = (token) => {
    const userData = decodeToken(token)
    return userData.email
}
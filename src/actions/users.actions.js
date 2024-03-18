import * as http from '../api/http'
import * as endpoints from '../api/endpoints'

export const apiGetUsers = (token) => http.get(endpoints.userEndpoints.getUsers, token)
export const apiUpdateUser = (token, body) => http.put(endpoints.userEndpoints.getUsers, token, body)
export const apiCreateUser = (token, body) => http.post(endpoints.userEndpoints.createUser, token, body)
export const apiActivateUser = (token, body) => http.post(endpoints.userEndpoints.activateUser, token, body)
export const apiResetPasswordUser = (token, body) => http.post(endpoints.userEndpoints.resetPasswordUser, token, body)
import * as http from '../api/http'
import * as endpoints from '../api/endpoints'
import store from '../redux/store'

const state = store.getState()

export const apiLogin = (body) => http.post(endpoints.authEndpoints.getToken, state.auth.token, body)
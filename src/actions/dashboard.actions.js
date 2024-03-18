import * as http from '../api/http'
import * as endpoints from '../api/endpoints'

export const apiGetFolders = (token) => http.get(endpoints.folderEndpoints.getFolders, token)
export const apiCreateFolder = (token, body) => http.post(endpoints.folderEndpoints.getFolders, token, body)
export const apiActiveFolder = (token, body) => http.patch(endpoints.folderEndpoints.getFolders, token, body)
export const apiCreateCredential = (token, body) => http.post(endpoints.credentialsEndpoints.createCredential , token, body)
export const apiUpadteCredential = (token, body) => http.put(endpoints.credentialsEndpoints.createCredential , token, body)
export const apiDeleteCredential = (token, body) => http.post(endpoints.credentialsEndpoints.deleteCredential, token, body)
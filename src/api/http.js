import axios from './axios'

export const get = (endpoint, token = null, params) => axios
    .get(
        endpoint, 
        {
            params: params,
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            }
        })

export const post = (endpoint, token = null, body, extraHeaders = null) => axios
    .post(
        endpoint, 
        body,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            }
        }
        )

export const put = (endpoint, token = null, body, extraHeaders = null) => axios
    .put(
        endpoint, 
        body,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            }
        }
        )
        
export const patch = (endpoint, token = null, body, extraHeaders = null) => axios
    .patch(
        endpoint, 
        body,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            }
        }
    )
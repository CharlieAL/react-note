import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getALL = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject,config)
  return request.then((response) => response.data)
}

export { getALL, create, update, setToken }

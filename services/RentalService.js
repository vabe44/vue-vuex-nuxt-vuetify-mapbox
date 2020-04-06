import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.ikoshq.com/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getRentals () {
    return apiClient.get('/properties?filter%5Bstatuses%5D=Active')
  }
}

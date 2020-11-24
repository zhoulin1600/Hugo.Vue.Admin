const ACCESS_TOKEN = 'Access-Token'

const TokenCache = {
  getToken() {
    return sessionStorage.getItem(ACCESS_TOKEN)
  },
  setToken(token) {
    sessionStorage.setItem(ACCESS_TOKEN, token)
  },
  delToken() {
    sessionStorage.removeItem(ACCESS_TOKEN)
  }
}

export default TokenCache

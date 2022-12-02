
import io from 'socket.io-client'
let STRAPI_ENDPOINT
if (process.env.NODE_ENV !== 'production') {
  STRAPI_ENDPOINT = process.env.WS_URL
} else {
  STRAPI_ENDPOINT = process.env.WS_URL
}
export default ({app}, inject) => {
  const socket = io(STRAPI_ENDPOINT);
  inject('socket', socket);
  // inject('message', message)
}

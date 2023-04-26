import { RippleAPI } from "ripple-lib"
import { serverUrl } from "./config"

// const api = new RippleAPI({ server: serverUrl })
const api = new xrpl.Client(serverUrl)

export default api

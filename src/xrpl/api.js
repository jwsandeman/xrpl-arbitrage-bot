import { RippleAPI } from "ripple-lib"
import { serverUrl } from "./config"

const api = new RippleAPI({ server: serverUrl })

export default api

// import { testEnvironment } from "./testEnvironment"

export const serverUrl = "wss://s.altnet.rippletest.net:51233" // Use this for testnet
// export const serverUrl = 'wss://s1.ripple.com'; // Use this for mainnet

export const myAddress = "rEAjpWs1Zmvj9gR61h7Y8gzAMcYp6TkZsk"
export const mySecret = "sEdTvon26xpTJt9gtmFCo1QWHkM3DFA"

// Check if testenvironment has created issuer address
// const issuer = testEnvironment.issuer ? testEnvironment.issuer : "USD/Generated_Issuer_Address"
export const currencyPairs = [
  {
    base: { currency: "XRP" },
    // counter: { currency: "USD", issuer: issuer }, // Replace with the generated USD issuer address
    counter: { currency: "USD", issuer: "USD/Generated_Issuer_Address" }, // Replace with the generated USD issuer address
  },
]

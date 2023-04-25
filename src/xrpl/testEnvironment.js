import { api } from "./api"
import { myAddress, mySecret, currencyPairs } from "./config"
// Import the "crypto" module for generating a random secret
import crypto from "crypto"

// Add this function to generate a new XRPL Testnet address and secret
async function generateTestnetAccount() {
  try {
    const response = await fetch("https://faucet.altnet.rippletest.net/accounts")

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      address: data.account.address,
      secret: data.account.secret,
    }
  } catch (error) {
    console.error("Error generating testnet account:", error)
    return null
  }
}

// Add this function to issue custom USD from the issuer to the destination account
async function issueCustomUSD(issuer, issuerSecret, destination, amount) {
  const payment = {
    source: {
      address: issuer,
      maxAmount: {
        value: amount,
        currency: "USD",
        counterparty: issuer,
      },
    },
    destination: {
      address: destination,
      amount: {
        value: amount,
        currency: "USD",
        counterparty: issuer,
      },
    },
  }

  await api.connect()
  const prepared = await api.preparePayment(issuer, payment)
  const { signedTransaction } = api.sign(prepared.txJSON, issuerSecret)
  const result = await api.submit(signedTransaction)
  await api.disconnect()

  return result
}

// Add this function to create an offer on the XRPL Testnet
async function createOffer(account, accountSecret, takerPays, takerGets) {
  const offer = {
    TransactionType: "OfferCreate",
    Account: account,
    TakerPays: takerPays,
    TakerGets: takerGets,
    Flags: 0,
  }

  await api.connect()
  const prepared = await api.prepareTransaction(offer)
  const { signedTransaction } = api.sign(prepared.txJSON, accountSecret)
  const result = await api.submit(signedTransaction)
  await api.disconnect()

  return result
}

// Add a new function to set up the custom USD and offers
export async function setupTestEnvironment() {
  // Step 1: Generate test accounts
  const issuer = await generateTestnetAccount()
  if (!issuer) {
    console.error("Error generating issuer account")
    return
  }
  currencyPairs[0].counter.issuer = `USD/${issuer.address}` // this is an alternate way to set issuer address in config file

  const accountB = await generateTestnetAccount()
  if (!accountB) {
    console.error("Error generating account B")
    return
  }

  const accountC = await generateTestnetAccount()
  if (!accountC) {
    console.error("Error generating account C")
    return
  }

  console.log("Issuer:", issuer)
  console.log("Account B:", accountB)
  console.log("Account C:", accountC)

  // Step 2: Issue custom USD to account B and C
  await issueCustomUSD(issuer.address, issuer.secret, accountB.address, "1000")
  await issueCustomUSD(issuer.address, issuer.secret, accountC.address, "1000")

  // Step 3: Create offers for account B and C
  await createOffer(
    accountB.address,
    accountB.secret,
    { value: "100", currency: "USD", counterparty: issuer.address },
    "100000000"
  )
  await createOffer(
    accountC.address,
    accountC.secret,
    { value: "110", currency: "USD", counterparty: issuer.address },
    "100000000"
  )

  return {
    issuer: issuer.address,
    accountB: accountB.address,
    accountC: accountC.address,
  }
}

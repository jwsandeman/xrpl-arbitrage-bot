import { monitorOrderBooks } from "../xrpl/monitor"
import { manageOrders, enterTradeWithStopLoss, monitorAndTrade } from "../xrpl/orders"
import { setupTestEnvironment } from "../xrpl/testEnvironment"

export {
  monitorOrderBooks,
  manageOrders,
  enterTradeWithStopLoss,
  monitorAndTrade,
  setupTestEnvironment,
}

export async function startArbitrageBot() {
  try {
    await manageOrders()
    // await enterTradeWithStopLoss()
    await monitorAndTrade()
    return {
      message: "Arbitrage bot started successfully.",
    }
  } catch (error) {
    console.error("Error starting the arbitrage bot:", error)
    return {
      message: "Error starting the arbitrage bot.",
    }
  }
}

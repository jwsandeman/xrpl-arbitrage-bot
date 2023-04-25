import { startArbitrageBot, setupTestEnvironment } from "src/services/xrplArbitrageBot"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = await startArbitrageBot()

    // Call the setupTestEnvironment function and log the results
    const testEnvironment = await setupTestEnvironment()
    console.log("Test environment set up:", testEnvironment)

    res.status(200).json({ message })
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

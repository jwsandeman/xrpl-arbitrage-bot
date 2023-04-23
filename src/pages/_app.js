import { ErrorComponent, ErrorBoundary } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
function RootErrorFallback({ error }) {
  return (
    <ErrorComponent statusCode={error?.statusCode || 400} title={error.message || error.name} />
  )
}
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}
export default withBlitz(MyApp)

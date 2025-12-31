import { Suspense } from "react"
import { SuccessContent } from "./success-content"

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageLoading />}>
      <SuccessContent />
    </Suspense>
  )
}

function SuccessPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse mb-4">
          <div className="h-20 w-20 bg-muted rounded-full mx-auto" />
        </div>
        <p className="text-muted-foreground">Processing your order...</p>
      </div>
    </div>
  )
}

import { createAction } from "@reduxjs/toolkit"

// Actions that are common to multiple slices.
interface UrlChangedPayload {
  search?: string
  filters?: Record<string, string[]>
}

export const urlChanged = createAction<UrlChangedPayload>("urlChanged")

"use client";

import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "./firebase";

export async function initAnalytics() {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
}
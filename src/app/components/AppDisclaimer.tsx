"use client";

import { useState, useEffect } from "react";
import { CloseIcon } from "./icons/CloseIcon";

const STORAGE_KEY = "demo-banner-dismissed";

export function AppDisclaimer() {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to prevent flash

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    setIsDismissed(dismissed === "true");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-primary text-white px-4 py-3 text-center text-md opacity-95">
      <p>
        <strong>DISCLAIMER:</strong>&nbsp; This is a demo app.&nbsp; All information
        displayed is fictional and for illustrative purposes only.
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
        aria-label="Dismiss banner"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

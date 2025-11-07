"use client";

import { useState, useEffect } from "react";

const WALKTHROUGH_KEY = "aave-base-yield-walkthrough-shown";

export function useWalkthroughState() {
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(true);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  useEffect(() => {
    // Check if user has seen walkthrough before
    const hasShown = localStorage.getItem(WALKTHROUGH_KEY);
    setHasSeenWalkthrough(!!hasShown);
  }, []);

  const handleShowWalkthrough = () => {
    setShowWalkthrough(true);
  };

  const handleCloseWalkthrough = () => {
    setShowWalkthrough(false);
    localStorage.setItem(WALKTHROUGH_KEY, "true");
    setHasSeenWalkthrough(true);
  };

  return {
    hasSeenWalkthrough,
    showWalkthrough,
    handleShowWalkthrough,
    handleCloseWalkthrough,
  };
}
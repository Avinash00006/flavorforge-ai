// components/ui/Toast.jsx

"use client";

import { toast } from "react-hot-toast";

/**
 * Toast Component
 * Usage:
 * showToast("Content Generated Successfully!");
 */

export function showToast(message) {
  toast.success(message);
}

export default function Toast() {
  return null;
}
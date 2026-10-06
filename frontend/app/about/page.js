import { redirect } from "next/navigation";

/**
 * About Route Redirect
 * Seamlessly routes visitors to the integrated About section on the home page.
 */
export default function AboutPage() {
  redirect("/#about");
}
import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { isAdminLoggedIn } from "@/lib/data"

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Simplify the check for login page
  // We'll just check the URL path directly
  const pathname = "/admin"

  // If we're on the login page, render without authentication check
  if (pathname === "/admin") {
    return <>{children}</>
  }

  // For all other admin pages, check authentication
  try {
    const loggedIn = await isAdminLoggedIn()

    if (!loggedIn) {
      redirect("/admin")
    }

    return <>{children}</>
  } catch (error) {
    // If there's an error checking authentication, redirect to login
    console.error("Error checking admin authentication:", error)
    redirect("/admin")
  }
}

import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" })
  response.cookies.delete("aeeg-admin-session")
  return response
}

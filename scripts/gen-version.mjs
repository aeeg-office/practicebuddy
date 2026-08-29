// Generates public/version.json at build time with the current git commit,
// an ISO build timestamp, and a unique build id. Called before `next build`.
import { execSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"

let commit = "unknown"
try {
  commit = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim() || "unknown"
} catch {
  commit = "unknown"
}

const payload = {
  commit,
  builtAt: new Date().toISOString(),
  buildId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
}

mkdirSync("public", { recursive: true })
writeFileSync("public/version.json", JSON.stringify(payload, null, 2) + "\n")
console.log(`[version] ${commit} @ ${payload.builtAt}`)

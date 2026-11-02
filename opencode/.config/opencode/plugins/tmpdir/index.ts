import { Plugin } from "@opencode/plugin"
import { mkdirSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

export default Plugin.define({
  id: "tmpdir",
  async setup(ctx) {
    const dir = join(homedir(), ".cache", "opencode", "tmp")
    mkdirSync(dir, { recursive: true })

    await ctx.shell.hook("create.before", (event) => {
      event.env.TMPDIR = dir
      event.env.GOTMPDIR = dir
    })
  },
})

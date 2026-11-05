import { Plugin, usePlugin } from "@opencode/plugin/tui"
import { For, Show, createEffect, createResource, createSignal, onCleanup } from "solid-js"

/**
 * Appends a subagent summary to the TUI session sidebar: one line per child
 * session with a spinner while it runs.
 *
 * Full subagent transcripts are still reachable with the built-in session
 * navigation (`down` opens the picker, `left`/`right` step through children).
 */

const REFRESH_EVENTS = [
  "session.created",
  "session.renamed",
  "session.execution.started",
  "session.execution.succeeded",
  "session.execution.failed",
  "session.execution.interrupted",
  "session.idle",
] as const

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

const MAX_AGENTS = 5

export default Plugin.define({
  id: "sidebar-agents",
  setup(context) {
    context.ui.slot({
      append: "sidebar.content",
      render: (input) => <Subagents sessionID={input.sessionID} />,
    })
  },
})

/** Matches how the built-in subagent picker labels a child session. */
function displayTitle(child: { title?: string; agent?: string }) {
  const raw = child.title ?? child.agent ?? "subagent"
  return raw.replace(/^@[\w.-]+ subagent\s*/i, "").trim() || raw
}

function Subagents(props: { sessionID: string }) {
  const context = usePlugin()
  const [revision, setRevision] = createSignal(0)
  const [frame, setFrame] = createSignal(0)
  const [showAllAgents, setShowAllAgents] = createSignal(false)

  const unsubscribes = REFRESH_EVENTS.map((type) =>
    context.data.on(type, (event) => {
      const child = context.data.session.get(event.data.sessionID)
      if (child?.parentID !== props.sessionID) return
      setRevision((value) => value + 1)
    }),
  )
  onCleanup(() => unsubscribes.forEach((stop) => stop()))

  const [rows] = createResource(
    () => [props.sessionID, revision()] as const,
    async ([sessionID]) =>
      [...context.data.session.list()]
        .filter((session) => session.parentID === sessionID)
        .sort((left, right) => (right.time.updated ?? 0) - (left.time.updated ?? 0))
        .map((child) => ({
          id: child.id,
          title: displayTitle(child),
          running: context.data.session.status(child.id) === "running",
        })),
  )

  const all = () => rows() ?? []
  const shownAgents = () => (showAllAgents() ? all() : all().slice(0, MAX_AGENTS))
  const hiddenAgents = () => all().length - Math.min(all().length, MAX_AGENTS)
  const hiddenRunning = () => all().slice(MAX_AGENTS).some((row) => row.running)

  // Only animate while at least one child session is running.
  createEffect(() => {
    if (!all().some((row) => row.running)) return
    const timer = setInterval(() => setFrame((value) => (value + 1) % SPINNER.length), 100)
    onCleanup(() => clearInterval(timer))
  })

  return (
    <Show when={all().length > 0}>
      <box flexDirection="column">
        <text fg={context.theme.text.faint}>Subagents</text>
        <For each={shownAgents()}>
          {(row) => (
            <text fg={row.running ? context.theme.text.base : context.theme.text.muted}>
              {`${row.running ? `${SPINNER[frame()]} ` : ""}${row.title}`}
            </text>
          )}
        </For>
        <Show when={hiddenAgents() > 0}>
          <box onMouseDown={() => setShowAllAgents((value) => !value)}>
            <text fg={context.theme.text.faint}>
              {showAllAgents()
                ? "show fewer (collapse)"
                : `${hiddenRunning() ? `${SPINNER[frame()]} ` : ""}+${hiddenAgents()} more (expand)`}
            </text>
          </box>
        </Show>
      </box>
    </Show>
  )
}

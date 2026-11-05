import { Plugin, usePlugin } from "@opencode/plugin/tui"
import { For, Show, createResource, createSignal, onCleanup } from "solid-js"

/**
 * Appends a "changed files" list to the TUI session sidebar.
 *
 * The list mirrors `/diff` in its "Last turn" scope: the files the session
 * changed during its most recent turn, refreshed whenever a turn finishes.
 */

const REFRESH_EVENTS = [
  "session.execution.succeeded",
  "session.execution.failed",
  "session.execution.interrupted",
  "session.revert.cleared",
  "session.revert.committed",
] as const

const MAX_FILES = 6
const MAX_PATH = 34

export default Plugin.define({
  id: "sidebar-files",
  setup(context) {
    context.ui.slot({
      append: "sidebar.content",
      render: (input) => <ChangedFiles sessionID={input.sessionID} />,
    })
  },
})

/** Keeps the file name visible when a path is too long for the sidebar. */
function shorten(path: string) {
  if (path.length <= MAX_PATH) return path
  return `…${path.slice(-(MAX_PATH - 1))}`
}

function ChangedFiles(props: { sessionID: string }) {
  const context = usePlugin()
  const [revision, setRevision] = createSignal(0)

  const unsubscribes = REFRESH_EVENTS.map((type) =>
    context.data.on(type, (event) => {
      if (event.data.sessionID !== props.sessionID) return
      setRevision((value) => value + 1)
    }),
  )
  onCleanup(() => unsubscribes.forEach((stop) => stop()))

  const [files] = createResource(
    () => [props.sessionID, revision()] as const,
    async ([sessionID]) => {
      try {
        return await context.client.session.diff({ sessionID })
      } catch {
        return []
      }
    },
  )

  const all = () => files() ?? []
  const shown = () => all().slice(0, MAX_FILES)
  const rest = () => all().length - shown().length

  return (
    <Show when={all().length > 0}>
      <box flexDirection="column">
        <text fg={context.theme.text.faint}>Changed files</text>
        <For each={shown()}>
          {(file) => (
            <box flexDirection="row">
              <text fg={context.theme.text.muted} flexShrink={1}>
                {shorten(file.file)}
              </text>
              <text fg={context.theme.diff.text.added}>{` +${file.additions}`}</text>
              <text fg={context.theme.diff.text.removed}>{` -${file.deletions}`}</text>
            </box>
          )}
        </For>
        <Show when={rest() > 0}>
          <text fg={context.theme.text.faint}>{`+${rest()} more`}</text>
        </Show>
      </box>
    </Show>
  )
}

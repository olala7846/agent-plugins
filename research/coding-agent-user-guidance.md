# Persistent user guidance across coding agents

Research date: 2026-08-10. Sources are the vendors' official documentation
or, for OpenCode, its official repository documentation.

## Result

There is no portable, automatically discovered *user-level* guidance path
shared by these tools. A portable repository `AGENTS.md` is useful, but a
personal default must be installed separately for each client. The practical
coverage is:

| Client | Documented automatic personal guidance | Scope and caveats |
| --- | --- | --- |
| Codex | `~/.codex/AGENTS.md` | Loaded before project guidance when Codex starts. `AGENTS.override.md` replaces it at this level. |
| Cursor | **Settings → Rules → User Rules** | Global and always included, but it is plain text in Cursor settings—not a portable file convention. |
| OpenCode | `~/.config/opencode/AGENTS.md` | Applied across OpenCode sessions. Its global file is separate from Codex's. |
| Claude Code | `~/.claude/CLAUDE.md` | User guidance for all projects, loaded at every session start. Claude does not natively read `AGENTS.md`. |

These are prompt/context instructions, not enforcement mechanisms. A tool can
still fail to follow them. Use client-specific controls where enforcement is
required (for example, Codex execution-policy rules or Claude Code hooks).

## Client details

### Codex

Codex builds its instruction chain at the start of a run (or a launched TUI
session). In its Codex home directory—`~/.codex` by default—it loads the first
non-empty of `AGENTS.override.md` or `AGENTS.md`; it then layers project files
from the project root to the current directory. The default total instruction
limit is 32 KiB. Therefore `~/.codex/AGENTS.md` is the right persistent,
automatic personal-default surface for Codex.

The source explicitly documents CLI verification commands and the shared
Codex discovery mechanism. It does not make a separate per-surface promise
for every desktop/cloud execution mode, so an installer should describe this
as Codex guidance rather than guarantee behavior in every hosted surface.

Sources: [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md), [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic.md).

### Cursor

Cursor **User Rules** are configured in **Cursor Settings → Rules**. Cursor
documents them as global to the user's environment and always included in
model context; they apply to all projects. They are plain text only. This is
the best user-level target for Cursor, but it cannot directly consume a shared
`AGENTS.md` file. Cursor Project Rules (`.cursor/rules`) are repository files
whose inclusion depends on their rule type; `Always` rules are the
project-scoped automatic option. Cursor also accepts a root `AGENTS.md` as a
simple project alternative, subject to the documented root-only limitation.

Source: [Cursor Rules](https://docs.cursor.com/context/rules).

### OpenCode

OpenCode documents `~/.config/opencode/AGENTS.md` as global guidance applied
across all OpenCode sessions. At startup it finds local `AGENTS.md` or
`CLAUDE.md` while walking upward from the working directory, then the OpenCode
global file, then `~/.claude/CLAUDE.md` as a fallback. A global
`opencode.json` can list additional instruction files; the documentation says
they are combined with the `AGENTS.md` files. That optional configuration is
version-sensitive, so the default recommendation should remain the documented
global `AGENTS.md` path.

Source: [OpenCode Rules](https://opencode.ai/docs/rules/), [source documentation](https://github.com/anomalyco/opencode/blob/dev/packages/web/src/content/docs/rules.mdx).

### Claude Code

Claude Code uses `~/.claude/CLAUDE.md` for personal instructions across all
projects and reads its instruction files at the start of every session. Its
project files are `./CLAUDE.md` or `./.claude/CLAUDE.md`; local personal
project preferences can use `./CLAUDE.local.md`. Claude Code explicitly says
it reads `CLAUDE.md`, not `AGENTS.md`. To reuse a repository-wide
`AGENTS.md`, its documented bridge is a `CLAUDE.md` containing `@AGENTS.md`,
or a symlink where that is suitable.

Claude's automatic memory is distinct from an authored personal rule file: it
is agent-written, scoped per repository (and shared across worktrees), and is
not a portable user-default mechanism.

Source: [Claude Code memory and CLAUDE.md](https://code.claude.com/docs/en/memory).

## Portable `AGENTS.md`

The [AGENTS.md site](https://agents.md/) defines a simple Markdown format, not
a universal user-directory discovery protocol. It recommends a repository
root `AGENTS.md` and describes nested project guidance. It can therefore be a
shared source of repository instructions where a client supports it, but it
does not establish that every client loads `~/.<client>/AGENTS.md`.

For broad current coverage, keep shared repository guidance in `AGENTS.md`.
For one person's defaults, offer separate installation targets:

1. Codex: `~/.codex/AGENTS.md`.
2. OpenCode: `~/.config/opencode/AGENTS.md`.
3. Claude Code: `~/.claude/CLAUDE.md`.
4. Cursor: paste the same concise text into User Rules.

They may be generated from one user-controlled canonical file with copies,
symlinks, or (for Claude Code) an import. Do not claim that a single symlink
or path will be auto-loaded by all clients; platform support and path
conventions differ.

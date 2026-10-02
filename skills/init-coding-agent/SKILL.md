---
name: init-coding-agent
description: "Use this skill when the user asks to initialize or configure their personal coding-agent preferences, set up user-level rules for Claude Code, Codex, or Cursor, add the ASD-STE100 simple technical English preference, or run /init-coding-agent. Review the user's existing personal instructions first, then add the bundled preference to each selected agent's user-scoped rules. Never write repository files."
---

# Initialize coding-agent personal preferences

Install the user's personal communication preference, ASD-STE100-inspired simple technical English, in the user-level rules of each coding agent the user selects. This is a personal preference. Do not add it to a repository `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, or any other project file.

The preference text is [references/asd-ste100-software-writing.md](references/asd-ste100-software-writing.md). Install it complete and unchanged.

## Destinations

| Agent | User-scoped destination | How the agent loads it |
| --- | --- | --- |
| Claude Code | `~/.claude/CLAUDE.md` | Loaded at the start of every session, for all projects. |
| Codex | `$CODEX_HOME/AGENTS.md`, or `~/.codex/AGENTS.md` when `CODEX_HOME` is not set | Loaded before project guidance. If `AGENTS.override.md` exists in the same directory and is not empty, Codex reads it instead of `AGENTS.md`; write to the override file in that case. Codex limits combined instructions to 32 KiB by default. |
| Cursor | **Cursor Settings > Rules > User Rules** | Plain text stored in the user's Cursor account and synced across devices. Applied to Agent (Chat), not to Inline Edit. There is no supported file or API to write it; the user pastes the text. |

Do not use `~/.cursor/rules/` for this preference. Cursor finds that folder only when the opened project is inside the home directory, and it ignores `.mdc` files without frontmatter. It is not a reliable user-level destination.

## Procedure

### 1. Select the agents

Ask which agents to configure. Offer Claude Code, Codex, and Cursor, with all three as the default. Wait for the answer.

### 2. Review the existing instructions

For each selected file-based agent (Claude Code, Codex):

1. Resolve the destination path from the table. For Codex, check `CODEX_HOME` and `AGENTS.override.md`.
2. Read the complete file if it exists. Note:
   - an existing `ASD-STE100 communication preference` block (see step 3),
   - other writing or communication rules that conflict with or duplicate the preference, for example a different tone, language, verbosity, or formatting rule,
   - file imports such as `@path` lines in `CLAUDE.md` that could already include the preference.
3. Check the size. Report a Codex file that would exceed 32 KiB after the change.

For Cursor, ask the user to paste their current User Rules, or to say that they are empty. Review them the same way. Do not try to read Cursor's internal settings database.

### 3. Propose the change

Use this marked block so a later run can find and update it. Put the complete reference text between the markers:

```markdown
<!-- BEGIN init-coding-agent: ASD-STE100 communication preference -->
## ASD-STE100 communication preference

<complete text of references/asd-ste100-software-writing.md, with its top-level heading removed>
<!-- END init-coding-agent: ASD-STE100 communication preference -->
```

For each destination, show the user:

- the path, and whether the file is new or changed,
- where the block goes: at the end of the file, or in place of an existing marked block,
- each conflict or duplicate found in step 2, with a recommendation: keep it, remove it, or reword it. Do not change unmarked user text without approval.

Wait for the user to approve before you write any file.

### 4. Apply the change

- **Claude Code and Codex:** Create the parent directory if it does not exist. Add the block, or replace the content between existing markers. Keep all other content unchanged. Read the file again to confirm that the block appears once and the other content is unchanged.
- **Cursor:** Show the block without the HTML comment markers, ready to copy. Tell the user to open **Cursor Settings > Rules > User Rules**, paste it at the end, and remove any conflicting rule they agreed to remove. Do not report Cursor as configured until the user confirms.

### 5. Report

For each agent, report the destination, the action (`added`, `updated`, `unchanged`, `pending user paste`, or `skipped`), and the conflicts that remain. Tell the user that the preference takes effect in new sessions.

## Boundaries

- Write only the user-scoped destinations in the table. Do not create or change repository files.
- These are prompt instructions, not enforcement. An agent can still fail to follow them.
- The reference adapts selected ASD-STE100 ideas for software work. It does not impose the ASD-STE100 approved-word dictionary, aerospace terms, sentence limits, or spelling rules. Repository conventions take priority when they conflict with this personal preference.

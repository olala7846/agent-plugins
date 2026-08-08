---
name: repo-init
description: "Use this skill when the user asks to initialize a repository, configure repository guidance, create or update AGENTS.md, bootstrap a development environment, or run /repo-init. Inspect the repository first, then interactively establish durable agent instructions. Always ask the simple-technical-English question first and the development-bootstrap question second."
---

# Repository initialization

Set up durable repository guidance with the user. Do not apply preferences that require a user decision until the user answers the relevant question.

## Inspect the repository

Before asking setup questions, inspect the repository root and relevant subdirectories. Find existing `AGENTS.md` files, project documentation, validation commands, and repository configuration. Use this information to avoid questions that the repository already answers.

## Ask the first question

Ask this question first and wait for the user's answer:

> Should coding agents always follow the ASD-STE100-inspired simple technical English guidance for conversations and repository documents?

Do not create, modify, or remove simple-technical-English instructions or reference files before an affirmative answer.

## If the user answers yes

1. Read the root `AGENTS.md`. Create it if it does not exist. Preserve existing instructions.
2. Add this short section at the beginning of the root `AGENTS.md`, after an existing title if there is one:

   ```markdown
   ## Communication

   Use concise, simple, and consistent technical English in agent conversations and repository documents. State the result, evidence, and next action directly. Keep exact code identifiers and required project terms unchanged.
   ```

3. Create `reference/` at the repository root when needed. Copy [the bundled software-writing reference](references/asd-ste100-software-writing.md) to `reference/asd-ste100-software-writing.md`.
4. If that target reference already exists, update it to the bundled guidance while preserving clearly identified repository-specific additions. Do not overwrite an unrelated reference file.
5. Tell the user which persistent files changed. The brief `AGENTS.md` section is the normal instruction for future sessions; agents do not need to reload the full reference for every response.

## If the user declines simple technical English

Do not add the communication section or copy the reference. Continue with the remaining repository setup.

## Ask the second question

After the user answers the simple-technical-English question, ask this question and wait for the user's answer:

> Should this repository provide a `bootstrap.sh` script, or an equivalent repository-standard setup command, to prepare a clean development worktree?

The setup command should make shared development prerequisites deterministic and automatic before coding begins. It can install development dependencies, configure Git hooks, and prepare formatting, linting, or other repository-required tools when the repository needs them.

## If the user answers yes

1. Inspect existing package metadata, lockfiles, task runners, hook configuration, contributor documentation, and development scripts. Reuse a repository-standard setup command if one already exists; otherwise create a root `bootstrap.sh`.
2. Derive each setup action from repository evidence or the user's answer. Do not guess a package manager, dependency, hook manager, linter, or external tool.
3. Make the setup command safe to run repeatedly and suitable for a clean worktree. It should check prerequisites, install the declared development dependencies, install or enable declared Git hooks, and run only the necessary setup actions.
4. Keep secrets, personal credentials, machine-specific paths, destructive cleanup, and deployment actions out of the setup command. If a required setup action needs one of these, document the manual prerequisite instead.
5. Add a short usage note and verify the command in the safest available way. Report what it sets up, what it intentionally does not set up, and any manual prerequisite that remains.

## If the user declines a development bootstrap

Do not create or change a development-bootstrap command. Continue with the remaining repository setup.

## Continue setup

Ask only the additional questions that are necessary after inspection. Ask no more than three at a time. Prefer questions about information that is not recoverable from the repository, such as required validation commands, contribution or release rules, protected areas, external dependencies, or deployment constraints.

After each answer, update the appropriate `AGENTS.md` or project documentation only with durable, repository-specific guidance. Show the user what changed and identify any remaining setup decision.

## Boundaries

This skill adapts selected ASD-STE100 ideas for software work. It does not impose the ASD-STE100 approved-word dictionary, aerospace terminology, sentence limits, or spelling rules. Existing repository conventions take priority when they conflict with the added communication section.

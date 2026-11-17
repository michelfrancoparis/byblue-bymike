#!/usr/bin/env bash
# ++hellohello guardrails — a Claude Code PreToolUse(Bash) hook.
# Reads the tool payload on stdin; exit 2 blocks the command before it runs.
#
# Blocks the irreversible (force push, reset --hard, clean -f, force-delete
# branch) and force-adding secrets. Block the dangerous hard; let everything
# else through. Formatting and lint are not this hook's job: the pre-commit
# gate (lint-staged) covers every edit path, not only the agent's.
set -u

payload="$(cat)"
cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty' 2>/dev/null)"
[ -z "$cmd" ] && exit 0
case "$cmd" in *git*) ;; *) exit 0 ;; esac

block() {
  printf 'Blocked by ++hellohello guardrails: %s\n' "$1" >&2
  exit 2
}

printf '%s' "$cmd" | grep -Eq 'git +push[^|;&]*(--force|--force-with-lease| -f([[:space:]]|$))' \
  && block "force push — rewrites remote history"
printf '%s' "$cmd" | grep -Eq 'git +reset[^|;&]*--hard' \
  && block "git reset --hard — discards uncommitted work"
printf '%s' "$cmd" | grep -Eq 'git +clean[^|;&]*-[[:alpha:]]*f' \
  && block "git clean -f — deletes untracked files"
printf '%s' "$cmd" | grep -Eq 'git +(branch|checkout)[^|;&]*-D' \
  && block "force-delete branch"
printf '%s' "$cmd" | grep -Eq 'git +add[^|;&]*-f[^|;&]*\.env' \
  && block "force-adding a .env file — secrets must stay out of git"

exit 0

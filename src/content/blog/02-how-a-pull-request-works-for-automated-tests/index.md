---
title: "How a pull request works for automated tests"
description: "Setup CI/CD for pull requests"
date: "Mar 6 2026"
---

After we create a working automated test, we should also start thinking about how it's contributed.

Now when a pull request is created, code quality checks and all tests will be run.

```yaml
name: Code quality
on:
  pull_request:

name: Playwright Tests
on:
  pull_request:
    paths:
      - 'tests/**'  
```

It’s totally fine at the very beginning, but it will become slower and slower as more tests are added. Actually, it also does not make much sense because pull requests are for adding or changing tests, so the workflow run should also show the changed tests’ results.

```yaml
- name: Run all Playwright tests
  if: github.event_name != 'pull_request'
  run: npx playwright test
- name: Get changed files
  if: github.event_name == 'pull_request'
  id: changed-files
  uses: tj-actions/changed-files@v47
  with:
    files: tests/**.spec.ts
- name: Run changed Playwright tests
  if: github.event_name == 'pull_request'
  env:
    ALL_CHANGED_FILES: ${{ steps.changed-files.outputs.all_changed_files }}
  run: npx playwright test ${ALL_CHANGED_FILES}
```

Using a GitHub Action is simple, but it can also be achieved by using `git diff` on other platforms.

Finally, it will only run changed tests on a new pull request, and it will run all tests after it is merged!

[All code is also available in this demo project](https://github.com/davidlc9113/qa-example/tree/v2).

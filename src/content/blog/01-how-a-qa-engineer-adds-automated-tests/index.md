---
title: "How a QA engineer adds automated tests"
description: "Step 1 with all fundamentals"
date: "Feb 26 2026"
---

As a QA engineer or software test engineer, it always starts with test cases.

| Summary | Steps | Expected |
| :---- | :-- | :-----------|
| Title | Go home page | Title has word "Playwright" |
| Get started link | Go home page | |
| | Click get started | Go get started page with header "Installation" |

## 1. Convert test cases to scripts

I have used Selenium, Cypress, and Puppeteer to write automated tests, but I eventually settled on Playwright, and I am still using it today.

It has a great fundamental design, so Playwright tests are simple: they perform actions and assert the state against expectations.

```typescript
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
});
```

## 2. Setup CI/CD to run scripts automaticlly

Automated tests are usually for testing current features, which means they do not need to run all day. The best way is to have tests triggered by test server deployment. For now, a scheduled test is enough.

We usually want to run tests whenever tests change, so the first CI/CD setup addresses these 2 requirements.

```yaml
name: Playwright Tests
on:
  schedule:
    - cron: "30 8 * * *"
  push: 
    paths:
      - 'tests/**'
  pull_request:
    paths:
      - 'tests/**'
```

Also, code quality should be introduced at the first CI/CD setup. No one wants to maintain a mess even if the main purpose is just to run tests.

```yaml
name: Code quality
on:
  push:
  pull_request:
```

## 3. Add report

Usually, we only care about the job status if all test results have passed, but we still need to check the details when tests fail. So it’s better to show test results directly in the job summary through a JUnit report and upload the HTML report as an artifact for later diagnosis.

```yaml
- name: Test Report
  uses: dorny/test-reporter@v2
  if: ${{ !cancelled() }}
  with:
    name: JUnit Report
    path: results.xml
    reporter: java-junit
- uses: actions/upload-artifact@v6
  if: ${{ !cancelled() }}
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

```typescript
// playwright.config.ts
reporter: process.env.CI
  ? [['html'], ['junit', { outputFile: 'results.xml' }]]
  : 'list',
```

Finally, an automated test is working truly automatically now. It has a daily scheduled run, which shows test results directly in the job summary and all details in the artifact. It also has a basic code quality check for every commit, which is helpful for later contributions.

[All code is also available in this demo project](../../projects/project-1/).
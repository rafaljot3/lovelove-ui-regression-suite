import { test } from "@playwright/test"
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

import { extractLastPartOfUrl, generateLighthouseReport } from "../../helpers/lhReportsUtils";
import { getDirname } from "../../helpers/utils";

test.describe("Performance audit - Playwright + Lighthouse", () => {
  test.describe.configure({ mode: "serial" });
  const urls = parse(fs.readFileSync(path.join(getDirname(import.meta.url), "../../fixtures/sitemapUrls.csv")), {
    columns: false,
    skip_empty_lines: true,
  });

  for (const url of urls) {
    test(`Should run Lighthouse audit on page - ${url[0]}`, { tag: "@lighthouse" }, async ({ page }) => {
      const path = extractLastPartOfUrl(url);
      await page.goto(url[0]);
      await generateLighthouseReport(url[0], `lhreport-${path}.html`);
    });
  }
});

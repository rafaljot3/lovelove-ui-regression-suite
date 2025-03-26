import { launch } from "chrome-launcher"; 
import fs from "fs";
import lighthouse from "lighthouse";

export async function generateLighthouseReport(url: string, reportPath: string) {
  const chrome = await launch({
    chromeFlags: ["--headless", "--disable-gpu"],
  });

  const config = null; 

  const runnerResult = await lighthouse(
    url,
    {
      logLevel: "info",
      output: "html",
      onlyCategories: ["performance"],
      port: chrome.port,
    },
    config
  );

  const reportHtml = runnerResult.report;

  if (!fs.existsSync(`test-results/lighthouse-report/${reportPath}`)) {
    fs.mkdirSync("test-results/lighthouse-report/", {
      recursive: true,
    });
  }
  fs.writeFileSync(`test-results/lighthouse-report/${reportPath}`, reportHtml.toString());

  console.log("Report is done for", runnerResult.lhr.mainDocumentUrl);
  console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);

  chrome.kill();
} 
export function extractLastPartOfUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split("/").filter((segment) => segment.length > 0);
    return pathSegments[pathSegments.length - 1];
  } catch (error) {
    console.error("Invalid URL:", error);
    return "";
  }
}

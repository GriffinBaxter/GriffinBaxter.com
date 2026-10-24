import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const TARGET_DIR = path.join(process.cwd(), "src", "content");
const CONTENT_REPO = process.env.CONTENT_REPO;
const GITHUB_PAT = process.env.GITHUB_PAT;

async function fetchContent() {
  if (!CONTENT_REPO) {
    throw new Error(
      "CONTENT_REPO is not set; configure the owner/repository for private content.",
    );
  }

  if (!GITHUB_PAT) {
    throw new Error(
      "GITHUB_PAT is not set; configure it to fetch the private content repository.",
    );
  }

  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "site-content-fetcher",
    Authorization: `Bearer ${GITHUB_PAT}`,
  };
  const response = await fetch(
    `https://api.github.com/repos/${CONTENT_REPO}/contents?ref=main`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API error (${response.status.toString()} ${response.statusText}): ${await response.text()}`,
    );
  }

  const files = (await response.json()).filter(
    (file) => file.type === "file" && file.name.endsWith(".md"),
  );
  if (files.length === 0) {
    throw new Error(`No Markdown files found in ${CONTENT_REPO}`);
  }

  const downloadedFiles = await Promise.all(
    files.map(async (file) => {
      const fileResponse = await fetch(file.download_url, { headers });
      if (!fileResponse.ok) {
        throw new Error(
          `Failed to download ${file.name}: ${fileResponse.statusText}`,
        );
      }
      return { name: file.name, content: await fileResponse.text() };
    }),
  );

  fs.mkdirSync(TARGET_DIR, { recursive: true });
  for (const file of downloadedFiles) {
    fs.writeFileSync(path.join(TARGET_DIR, file.name), file.content, "utf8");
  }

  const currentFiles = new Set(downloadedFiles.map((file) => file.name));
  const staleFiles = fs
    .readdirSync(TARGET_DIR)
    .filter((name) => name.endsWith(".md") && !currentFiles.has(name));
  for (const file of staleFiles) {
    fs.rmSync(path.join(TARGET_DIR, file));
  }

  console.log(
    `Downloaded ${files.length.toString()} files and removed ${staleFiles.length.toString()} stale files from ${TARGET_DIR}`,
  );
}

fetchContent().catch((err) => {
  console.error("[fetch-content] Fatal error:", err);
  process.exitCode = 1;
});

import { spawn } from "node:child_process";

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run verification through npm so npm_execpath is available.");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", env: process.env });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed (${code ?? signal})`));
    });
  });
}

for (const script of [
  "lint",
  "typecheck",
  "test",
  "seo:check",
  "security:scan",
  "test:e2e",
]) {
  await run(process.execPath, [npmCli, "run", script]);
}

await run(process.execPath, [npmCli, "audit", "--omit=dev"]);
await run("git", ["diff", "--check"]);

console.log("All Family remediation gates passed.");

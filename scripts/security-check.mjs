import { readFile } from "node:fs/promises";

const checks = [
  {
    id: "SEC001",
    severity: "HIGH",
    file: "src/database.ts",
    pattern: /WHERE email = '\$\{email\}'/,
    message: "User input is interpolated into SQL. Use a parameterized query.",
  },
  {
    id: "SEC002",
    severity: "HIGH",
    file: "src/passwords.ts",
    pattern: /createHash\(["']sha256["']\)/,
    message: "A fast digest is used for passwords. Use an adaptive password hash.",
  },
  {
    id: "SEC003",
    severity: "HIGH",
    file: "src/tokens.ts",
    pattern: /JWT_SECRET\s*\?\?/,
    message: "The signing secret has a fallback. Fail closed when configuration is absent.",
  },
  {
    id: "SEC004",
    severity: "MEDIUM",
    file: "src/app.ts",
    pattern: /stack:\s*error\.stack/,
    message: "The API exposes internal error details to clients.",
  },
  {
    id: "SEC005",
    severity: "MEDIUM",
    file: "src/app.ts",
    pattern: /app\.post\(["']\/login["']/,
    absence: /rateLimit\s*\(/,
    message: "The login route has no request throttling.",
  },
];

const findings = [];

for (const check of checks) {
  const source = await readFile(new URL(`../${check.file}`, import.meta.url), "utf8");
  const matched = check.pattern.test(source) && (!check.absence || !check.absence.test(source));

  if (matched) {
    findings.push(check);
  }
}

if (findings.length === 0) {
  console.log("Security teaching checks passed.");
  process.exit(0);
}

console.error(`Security teaching checks found ${findings.length} issue(s):\n`);
for (const finding of findings) {
  console.error(`${finding.severity} ${finding.id} ${finding.file}`);
  console.error(`  ${finding.message}\n`);
}
console.error("This focused demo check is not a substitute for CodeQL, secret scanning, or review.");
process.exit(1);
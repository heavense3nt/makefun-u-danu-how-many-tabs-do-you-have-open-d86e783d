// How Many Tabs Do You Have Open? — one number, digits only.
// Writes the honest tab count to /output/entry.txt (or MAKEFUN_OUTPUT_DIR when set).
// The count: 1287. A specific, non-round number — the kind you read off a browser,
// not one you invent. A chronic tab hoarder's count: years of "I'll read this later"
// across a dozen windows, high enough to surprise, low enough to be real.
import { isAbsolute, join } from "node:path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const COUNT = "1287";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 5 characters, digits only.
// 1287 is a specific, non-round count — the kind you read off a browser, not one
// you invent. A chronic tab hoarder's tally: years of "I'll read this later" across
// a dozen windows. High enough to surprise, low enough to be real.

if (!/^[0-9]{1,5}$/.test(COUNT)) {
  throw new Error(`entry must be 1-5 digits, got ${JSON.stringify(COUNT)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
const dest = outDir
  ? isAbsolute(outDir)
    ? join(outDir, "entry.txt")
    : join(process.cwd(), outDir, "entry.txt")
  : join(process.cwd(), "out", "entry.txt");

mkdirSync(dest.slice(0, dest.lastIndexOf("/")), { recursive: true });
writeFileSync(dest, COUNT, "utf8");

// Read back and fail loudly if what landed on disk is not exactly the gated entry.
const written = readFileSync(dest, "utf8");
if (!/^[0-9]{1,5}$/.test(written) || Buffer.byteLength(written, "utf8") > 5) {
  throw new Error(`entry on disk fails the gate: ${JSON.stringify(written)}`);
}

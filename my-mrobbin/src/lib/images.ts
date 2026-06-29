import fs from "fs";
import path from "path";

export function imageExists(filename: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "images", filename));
  } catch {
    return false;
  }
}

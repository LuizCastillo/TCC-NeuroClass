import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("a Vercel entrega o site em qualquer rota interna", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.deepEqual(config.rewrites, [{ source: "/(.*)", destination: "/index.html" }]);
});

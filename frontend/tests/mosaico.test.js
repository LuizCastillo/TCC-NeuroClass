import assert from "node:assert/strict";
import { test } from "node:test";
import { ARTIGOS } from "../src/data/conteudo.js";
import { MOSAICO } from "../src/data/mosaico.js";

test("o mosaico tem 9 blocos", () => {
  assert.equal(MOSAICO.length, 9);
});

test("cada bloco do mosaico tem uma cor diferente", () => {
  assert.equal(new Set(MOSAICO.map((b) => b.cor)).size, 9);
});

test("os links para artigos apontam para artigos existentes", () => {
  const slugs = ARTIGOS.map((a) => a.slug);
  for (const { para } of MOSAICO.filter((b) => b.para.startsWith("/conteudo/"))) {
    assert.ok(slugs.includes(para.replace("/conteudo/", "")), para);
  }
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { blocosApagados } from "../src/data/focoBlocos.js";

test("nenhum bloco apagado no início", () => {
  assert.equal(blocosApagados(1500, 1500), 0);
});

test("um quarto do tempo apaga 5 de 20 blocos", () => {
  assert.equal(blocosApagados(1125, 1500), 5);
});

test("todos os blocos apagados no fim", () => {
  assert.equal(blocosApagados(0, 1500), 20);
});

test("duração zerada não apaga blocos", () => {
  assert.equal(blocosApagados(100, 0), 0);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const css = readFileSync(new URL("../src/index.css", import.meta.url), "utf8");

function blocoDe(seletor) {
  const inicio = css.indexOf(`${seletor} {`);
  assert.notEqual(inicio, -1, `seletor ${seletor} não encontrado`);
  return css.slice(inicio, css.indexOf("}", inicio));
}

function variavel(bloco, nome) {
  const achado = bloco.match(new RegExp(`--${nome}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(achado, `variável --${nome} não encontrada`);
  return achado[1];
}

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a, b) {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

const raiz = blocoDe(":root");
const tinta = variavel(raiz, "azul-900");

for (const cor of ["amarelo", "rosa", "verde", "lilas", "laranja", "agua", "coral", "lima", "celeste"]) {
  test(`texto azul-900 é legível sobre o destaque ${cor}`, () => {
    assert.ok(contraste(tinta, variavel(raiz, `bloco-${cor}`)) >= 4.5);
  });
}

test("texto azul-900 é legível sobre o bloco claro", () => {
  assert.ok(contraste(tinta, variavel(raiz, "azul-100")) >= 4.5);
});

for (const seletor of [":root", ':root[data-tema="verde"]', ':root[data-tema="roxo"]', ':root[data-tema="laranja"]']) {
  test(`texto branco é legível sobre azul-700 em ${seletor}`, () => {
    assert.ok(contraste("#ffffff", variavel(blocoDe(seletor), "azul-700")) >= 4.5);
  });
}

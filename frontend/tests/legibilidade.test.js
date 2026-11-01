import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const ler = (caminho) => readFileSync(new URL(`../src/${caminho}`, import.meta.url), "utf8");

test("o link de próximo artigo tem texto claro sobre o fundo azul", () => {
  assert.match(ler("pages/ConteudoDetalhe.jsx"), /className="bloco bloco--azul artigo-proximo"/);
});

test("títulos quebram palavras longas em vez de criar rolagem horizontal", () => {
  assert.match(ler("index.css"), /h1,\s*h2,\s*h3 \{[^}]*overflow-wrap: anywhere;/);
});

test("o nome da tarefa no temporizador quebra palavras longas", () => {
  assert.match(ler("pages/Foco.css"), /\.foco-timer__rotulo \{[^}]*overflow-wrap: anywhere;/);
});

test("o temporizador no celular não cresce além da tela", () => {
  assert.match(
    ler("pages/Foco.css"),
    /max-width: 560px\) \{\s*\.foco-timer \{\s*grid-template-columns: minmax\(0, 1fr\);/
  );
});

import { NavLink } from "react-router-dom";
import "./Header.css";

const LINKS = [
  { to: "/", label: "Início", fim: true },
  { to: "/conteudo", label: "Conteúdo" },
  { to: "/quiz", label: "Quiz" },
  { to: "/ferramentas", label: "Ferramentas para o dia a dia" },
  { to: "/premium", label: "Premium" },
];

export default function Header() {
  return (
    <header className="cabecalho">
      <div className="container cabecalho__conteudo">
        <NavLink to="/" className="cabecalho__marca" aria-label="NeuroClass — página inicial">
          <img src="/logo-icone.svg" alt="" className="cabecalho__logo" width="38" height="38" />
          <span className="cabecalho__nome">
            Neuro<span className="cabecalho__nome-destaque">Class</span>
          </span>
        </NavLink>
        <nav className="cabecalho__nav" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.fim}
              className={({ isActive }) =>
                "cabecalho__link" + (isActive ? " cabecalho__link--ativo" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

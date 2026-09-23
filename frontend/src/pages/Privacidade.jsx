import { Link } from "react-router-dom";
import "./Conteudo.css";

export default function Privacidade() {
  return (
    <div className="container container--estreito pagina-artigo">
      <Link to="/" className="pagina-artigo__voltar">
        ← Voltar ao início
      </Link>
      <h1>Política de Privacidade</h1>
      <p className="pagina-artigo__fonte">Última atualização: setembro de 2026</p>

      <div className="pagina-artigo__corpo">
        <p>
          O NeuroClass é um projeto educacional de TCC (Trabalho de Conclusão de Curso) sobre
          TDAH, sem fins lucrativos. Esta política explica, de forma simples e honesta, quais
          dados o site coleta, para que servem e quais direitos você tem sobre eles, em
          conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h2>Quais dados coletamos</h2>
        <p>
          Coletamos apenas <strong>nome e e-mail</strong>, informados por você ao fazer o quiz ou
          ao usar as ferramentas de organização e rotina ("Ferramentas para o dia a dia"). Não
          exigimos senha nem qualquer outro dado pessoal.
        </p>
        <p>Além disso, guardamos:</p>
        <ul className="pagina-artigo__lista">
          <li>Suas respostas e resultados no quiz sobre TDAH;</li>
          <li>
            As tarefas, subtarefas, horários e rotinas que você cria nas ferramentas de
            organização.
          </li>
        </ul>

        <h2>Para que usamos esses dados</h2>
        <ul className="pagina-artigo__lista">
          <li>Identificar o resultado do seu quiz e exibi-lo na tela;</li>
          <li>Enviar esse resultado para o e-mail informado;</li>
          <li>Salvar e mostrar suas tarefas e rotinas nas ferramentas de organização.</li>
        </ul>
        <p>
          Não usamos seus dados para publicidade, não os vendemos e não os compartilhamos com
          terceiros para fins de marketing.
        </p>

        <h2>Com quem seus dados são compartilhados</h2>
        <p>
          Como todo site precisa de infraestrutura para funcionar, seus dados passam por dois
          prestadores de serviço técnico, que atuam apenas como operadores de dados (nunca com
          acesso para fins próprios):
        </p>
        <ul className="pagina-artigo__lista">
          <li>
            <strong>Supabase</strong> — armazena o banco de dados do site (nome, e-mail, respostas
            do quiz, tarefas);
          </li>
          <li>
            <strong>Resend</strong> — envia o e-mail com o resultado do seu quiz.
          </li>
        </ul>

        <h2>Importante: como funciona a identificação, já que não há senha</h2>
        <p>
          O NeuroClass não possui sistema de login com senha. Você é identificado apenas pelo
          e-mail que informa. Isso significa que qualquer pessoa que souber seu e-mail e o digitar
          no site teria acesso às tarefas associadas a ele. Recomendamos não usar essa ferramenta
          para nenhuma informação sensível além de tarefas escolares comuns.
        </p>

        <h2>Plano premium (modo demonstração) e link de calendário</h2>
        <p>
          O site oferece um plano premium simulado, sem cobrança real (ver{" "}
          <Link to="/termos">Termos de Uso</Link> para detalhes). Ao ativar esse plano, associamos
          ao seu cadastro a informação de que você está no plano "premium", apenas para liberar
          recursos adicionais — nenhum dado de pagamento é coletado, pois nenhum pagamento
          acontece de fato.
        </p>
        <p>
          Usuários premium podem gerar um <strong>link pessoal de calendário</strong> (.ics) para
          sincronizar suas tarefas com aplicativos externos como Google Calendar, Apple Calendar
          ou Outlook. Esse link contém um código de acesso próprio e funciona como uma senha:
          qualquer pessoa com o link consegue ver as tarefas associadas a ele. Você pode gerar um
          novo link a qualquer momento pela própria ferramenta, invalidando o anterior.
        </p>

        <h2>Armazenamento no seu navegador</h2>
        <p>
          Para lembrar quem você é entre uma visita e outra, guardamos seu nome e e-mail no{" "}
          <code>localStorage</code> do seu navegador, no seu próprio dispositivo. Não utilizamos
          cookies de rastreamento nem de publicidade.
        </p>

        <h2>Por quanto tempo guardamos seus dados</h2>
        <p>
          Seus dados ficam armazenados enquanto este projeto estiver ativo. Você pode solicitar a
          exclusão dos seus dados a qualquer momento pelo contato abaixo.
        </p>

        <h2>Seus direitos (LGPD)</h2>
        <p>Você tem direito a, a qualquer momento:</p>
        <ul className="pagina-artigo__lista">
          <li>Confirmar se tratamos algum dado seu, e acessá-lo;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>Solicitar a exclusão dos seus dados;</li>
          <li>Revogar seu consentimento para o uso dos dados.</li>
        </ul>

        <h2>Crianças e adolescentes</h2>
        <p>
          Como o NeuroClass trata de um tema escolar, é possível que estudantes menores de idade
          usem o site. Recomendamos que o uso por crianças e adolescentes seja acompanhado por um
          responsável, especialmente ao informar nome e e-mail.
        </p>

        <h2>Não fazemos diagnóstico</h2>
        <p>
          Nenhum dado coletado — incluindo as respostas do quiz — é usado para gerar diagnóstico,
          triagem clínica ou qualquer avaliação de TDAH. O conteúdo do site tem finalidade
          exclusivamente educativa.
        </p>

        <h2>Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada conforme o projeto evolui. A data da última
          atualização está sempre indicada no topo desta página.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas sobre esta política ou pedidos relacionados aos seus dados podem ser enviados
          para a equipe responsável pelo projeto através do e-mail cadastrado no site, ou por meio
          dos canais informados pelo autor do TCC.
        </p>
      </div>
    </div>
  );
}

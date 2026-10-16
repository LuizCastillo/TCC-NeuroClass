import { Link } from "react-router-dom";
import "./Conteudo.css";

export default function Termos() {
  return (
    <div className="container container--estreito pagina-artigo">
      <Link to="/" className="pagina-artigo__voltar">
        ← Voltar ao início
      </Link>
      <h1>Termos de Uso</h1>
      <p className="pagina-artigo__fonte">Última atualização: outubro de 2026</p>

      <div className="pagina-artigo__corpo">
        <p>
          Ao usar o NeuroClass, você concorda com os termos descritos abaixo. Se não concordar com
          algum ponto, pedimos que não utilize o site.
        </p>

        <h2>O que é o NeuroClass</h2>
        <p>
          O NeuroClass é um projeto de TCC (Trabalho de Conclusão de Curso), sem fins lucrativos,
          com finalidade exclusivamente educativa sobre TDAH. O site oferece:
        </p>
        <ul className="pagina-artigo__lista">
          <li>Conteúdo educativo sobre TDAH, com fontes reais e verificáveis;</li>
          <li>Um quiz de conhecimento em três níveis de dificuldade;</li>
          <li>Ferramentas de apoio à organização, planejamento e rotina escolar.</li>
        </ul>

        <h2>O que o NeuroClass não é</h2>
        <p>
          O NeuroClass <strong>não realiza diagnóstico</strong> de TDAH, não oferece tratamento e
          não substitui acompanhamento profissional. O quiz tem finalidade educativa e nenhum
          resultado nele deve ser interpretado como avaliação clínica. As ferramentas de
          organização e rotina são recursos de apoio ao planejamento escolar, não tratamentos.
        </p>
        <p>
          Para diagnóstico ou acompanhamento de TDAH, procure sempre um profissional de saúde
          qualificado — psiquiatra, neurologista ou psicólogo.
        </p>

        <h2>Cadastro e identificação</h2>
        <p>
          Para usar o quiz ou as ferramentas de organização, pedimos apenas seu nome e e-mail —
          não há senha nem sistema de login tradicional. Você é responsável por fornecer
          informações verdadeiras e por manter o controle sobre o e-mail informado, já que ele é
          usado para identificar suas tarefas e resultados no site.
        </p>

        <h2>Plano gratuito e plano Premium (pago)</h2>
        <p>
          O NeuroClass funciona em um modelo <em>freemium</em>. O <strong>plano gratuito</strong>{" "}
          inclui o conteúdo educativo, o quiz e as ferramentas de organização da rotina (tarefas,
          subtarefas e modo foco). O <strong>plano Premium</strong> custa{" "}
          <strong>R$ 9,99 por mês</strong> e libera recursos adicionais, como exportação da rotina
          para calendários externos (.ics), exportação do mês em imagem (PNG/JPEG) e
          personalização visual do site.
        </p>
        <p>
          A assinatura é mensal e renovada automaticamente. Você pode cancelá-la a qualquer
          momento pelo site; o cancelamento vale para o ciclo seguinte e os recursos premium
          permanecem disponíveis até o fim do período já pago. Em contratações feitas pela
          internet, você também pode desistir em até 7 dias após a contratação, conforme o
          Código de Defesa do Consumidor. Podemos reajustar o valor, mas avisaremos antes e a mudança
          só vale para os ciclos seguintes.
        </p>
        <p>
          Os pagamentos serão processados por um processador de pagamento terceirizado: o
          NeuroClass não recebe nem armazena número de cartão.{" "}
          <strong>
            Status atual: a integração de pagamento ainda está em andamento. Nesta versão de
            apresentação acadêmica, a assinatura é de teste e nenhum valor é cobrado
          </strong>
          . A cobrança real só começará depois de aviso claro aos usuários e da atualização
          destes Termos.
        </p>
        <p>
          O link de exportação de calendário gerado para usuários premium é pessoal: qualquer
          pessoa que tiver acesso a esse link consegue visualizar as tarefas associadas a ele.
          Trate esse link com o mesmo cuidado que trataria uma senha, e regenere-o pelo site caso
          suspeite que foi compartilhado indevidamente.
        </p>

        <h2>Uso adequado do site</h2>
        <p>Ao usar o NeuroClass, você concorda em não:</p>
        <ul className="pagina-artigo__lista">
          <li>Tentar acessar dados ou tarefas de outras pessoas sem autorização;</li>
          <li>Usar o site para fins abusivos, ilegais ou que possam prejudicar terceiros;</li>
          <li>
            Tentar automatizar, sobrecarregar ou comprometer o funcionamento do site (bots,
            scripts de ataque, etc.).
          </li>
        </ul>

        <h2>Propriedade do conteúdo</h2>
        <p>
          O conteúdo educativo, as questões do quiz e o código do NeuroClass foram desenvolvidos
          como parte de um Trabalho de Conclusão de Curso. Fontes externas citadas (CDC, DSM-5,
          CHADD, artigos científicos) pertencem aos seus respectivos autores e são citadas para
          fins educativos.
        </p>

        <h2>Disponibilidade do serviço</h2>
        <p>
          Por ser um projeto acadêmico hospedado em serviços de nível gratuito, o NeuroClass pode
          ficar temporariamente indisponível ou apresentar lentidão (por exemplo, ao "acordar"
          depois de um período sem uso). Não garantimos disponibilidade contínua do serviço.
        </p>

        <h2>Limitação de responsabilidade</h2>
        <p>
          O NeuroClass é oferecido "como está", sem garantias de qualquer tipo. Não nos
          responsabilizamos por decisões tomadas com base no conteúdo do site, especialmente
          decisões relacionadas a diagnóstico, tratamento ou saúde — para isso, procure sempre um
          profissional qualificado.
        </p>

        <h2>Alterações nestes termos</h2>
        <p>
          Estes termos podem ser atualizados conforme o projeto evolui. A data da última
          atualização está sempre indicada no topo desta página.
        </p>

        <h2>Privacidade</h2>
        <p>
          Para saber exatamente quais dados coletamos e como os usamos, consulte nossa{" "}
          <Link to="/privacidade">Política de Privacidade</Link>.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para a equipe responsável pelo projeto
          através dos canais informados pelo autor do TCC.
        </p>
      </div>
    </div>
  );
}

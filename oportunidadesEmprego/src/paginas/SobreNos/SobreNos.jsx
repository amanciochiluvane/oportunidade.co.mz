import HeaderEmprego from "../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego"
import './SobreNos.css'
import { Link } from "react-router-dom"
import { useState } from "react";
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego'
import { Helmet } from "react-helmet/es/Helmet";

export default function SobreNos(){

    const [selectedSection, setSelectedSection] = useState('Sobre Nós');

    const renderContent = () => {
        switch (selectedSection) {
          case 'Sobre Nós':
            return (
              <div>
                <h2>Sobre nós</h2>
                <p>
                  Somos uma plataforma dedicada a conectar talentos a oportunidades de emprego em Moçambique. Nossa missão é facilitar a busca por empregos, ajudando candidatos a encontrar as melhores vagas e empresas a encontrar os melhores talentos.
                </p>
              </div>
            );
          case 'Valores':
            return (
              <div>
                <h2>Nossos Valores</h2>
                <p>
                  Integridade: Operamos com transparência e ética, garantindo que todas as nossas práticas sejam justas e confiáveis.Excelência: Estamos constantemente aprimorando nossos serviços para oferecer a melhor experiência possível para usuários e clientes.
                  Inclusão: Valorizamos a diversidade e promovemos a inclusão, assegurando que todas as oportunidades sejam acessíveis a todos.
                </p>
              </div>
            );
          case 'O que fazemos':
            return (
              <div>
                <h2>O que fazemos</h2>
                <p>
                 Para Candidatos: Oferecemos uma vasta gama de vagas de emprego em diversos setores e níveis de experiência. Nossa plataforma é fácil de usar e permite que você encontre rapidamente as oportunidades que correspondem às suas habilidades e aspirações.
                 Para Empregadores: Facilitamos o processo de recrutamento, ajudando as empresas a encontrar os candidatos ideais para suas necessidades. Com nossas ferramentas avançadas de busca e filtros personalizados, recrutadores podem identificar rapidamente os melhores talentos.
                </p>
              </div>
            );
          default:
            return null;
        }
      };
    
    return(
        <div className="SobreNos">

            <Helmet>
                <title>Sobre nós</title>
                <meta name="description" content={"O Oportunidade.co.mz é a sua plataforma definitiva para impulsionar sua carreira em Moçambique. Nosso objetivo é conectar candidatos talentosos aos melhores empregadores, oferecendo recursos essenciais para o desenvolvimento profissional e sucesso no mercado de trabalho."}/>
                <meta property="og:title" content={"og: Sobre nós"}/>

                <meta property="og:description" content={"og:O Oportunidade.co.mz é a sua plataforma definitiva para impulsionar sua carreira em Moçambique. Nosso objetivo é conectar candidatos talentosos aos melhores empregadores, oferecendo recursos essenciais para o desenvolvimento profissional e sucesso no mercado de trabalho."}/>
             </Helmet> 
            <HeaderEmprego/>

            <section className="IntroAbout">
                <div className="SombraIntroAbout">

                </div>
                <div className="TextoIntroAbout">
                    <p>Conectando Talentos às Melhores Oportunidades</p>
                </div>
            </section>

            <section className="AboutUsText">
                <h2>Bem-Vindo a<span> oportunidade.co.mz</span></h2>

                <section className="AboutUsArticles">
      <div className="LinksAboutUsArticles">
        <h1 className={selectedSection === 'Sobre Nós' ? 'activeLinkArticle' : ''}
     onClick={() => setSelectedSection('Sobre Nós')}>Sobre Nós</h1>
        <h1 className={selectedSection === 'Valores' ? 'activeLinkArticle' : ''}
 onClick={() => setSelectedSection('Valores')}>Valores</h1>
        <h1 className={selectedSection === 'O que fazemos' ? 'activeLinkArticle' : ''}
 onClick={() => setSelectedSection('O que fazemos')}>O que fazemos</h1>
      </div>
      <article className="ArticleTextAbout">
        {renderContent()}
      </article>
    </section>
            </section>

            <section id="ServicosSobreNos">
                <h2>Nossos Serviços</h2>

                <section>
                    <article>
                        <h2>1</h2>

                        <h3>Revisão CV</h3>
                        <p>Nosso serviço de Revisão de CV oferece uma análise detalhada e personalizada para garantir que seu perfil se destaque aos olhos dos recrutadores.</p>

                        <Link to="/revisao-de-cv">Ver mais</Link>
                    </article >

                    <article>
                        <h2>2</h2>

                        <h3>Criação de CV</h3>
                        <p> Oferecemos um design profissional e personalizado que destaca suas habilidades e experiências de forma clara e impactante.</p>

                        <Link to="/cv">Ver mais</Link>
                    </article>

                    <article>
                        <h2>3</h2>

                        <h3>Pesquisa Salarial</h3>
                        <p>Oferecemos um serviço de Pesquisa Salarial que lhe proporciona informações detalhadas sobre os salários praticados no mercado para a sua área de atuação.</p>

                        <Link to="/salario">Ver mais</Link>
                    </article>

                    <article>
                        <h2>4</h2>

                        <h3>Anúncio de Vaga</h3>
                        <p> Publique sua Vaga na Oportunidade.co.mz e alcance milhares de candidatos qualificados.</p>

                        <Link to="/recrutador">Ver mais</Link>
                    </article>
                </section>
            </section>
            
            <FooterEmprego/>
        </div>  
    )
}
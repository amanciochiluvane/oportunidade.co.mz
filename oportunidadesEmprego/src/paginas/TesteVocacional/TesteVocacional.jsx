import './TesteVocacional.css'
import {Link} from "react-router-dom"
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import ss1 from "../../assets/ss1.png"
import ss2 from "../../assets/ss2.png"
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import FooterEmprego from "../../componentes/PagEmprego/FooterEmprego/FooterEmprego"


export default function TesteVocacional(){
    const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };
    return(
        <div className="TesteVocacional">
            <HeaderEmprego/>
            <section className="TesteVocacionalBackground">
                <section className="TesteVocacionalBackgroundOverlay">

                </section>

                <h2>
                Descubra Sua Carreira Ideal 
                com Nosso <span>Teste Vocacional</span>
                </h2>
                
                <p>Você está em dúvida sobre qual carreira seguir? Nosso teste 
                vocacional é a ferramenta perfeita para ajudá-lo a encontrar a 
                profissão que mais combina com você.
                </p>

                <article>
                    <Link id='LinkIntroTeste' to="/teste-vocacional/perguntas">Fazer Teste Vocacional</Link>
                    <Link id='LinkIntroContinuar'>Continuar com o teste</Link>
                </article>

            </section>

            <section className='FuncionamentoTeste'>
                <h2>Como Funciona?</h2>
                <p>Nosso teste vocacional é uma ferramenta abrangente que analisa várias dimensões da sua vida para fornecer orientações precisas e personalizadas sobre carreiras. Veja como ele avalia cada um desses aspectos:</p>

                <section className='FuncionamentoTesteArticle'>
                    <article className='FuncionamentoTesteArticleInteresses' >
                        <h2>
                            Interesses
                        </h2>
                        <p>Descubra atividades que você ama</p>
                        <div></div>
                    </article>

                    <article className='FuncionamentoTesteArticleHabilidades'>
                        <h2>Habilidades</h2>
                        <p>Identifique suas principais competências</p>
                        <div></div>
                    </article>

                    <article className='FuncionamentoTesteArticleValores'>
                        <h2>Valores</h2>
                        <p>Entenda o que é importante para você em uma carreira.</p>
                        <div></div>
                    </article>
                </section>
            </section>

            <section className='FaqTesteVocacional'>
                <h2>Tudo o que você precisa saber para não ter medo de um Teste Vocacional</h2>

                <section>
      <article>
        <div>
          <h2>Quem deve fazer um teste vocacional?</h2>
          <img
            src={activeFAQ === 'faq1' ? ss2 : ss1}
            alt="FAQ"
            onClick={() => toggleFAQ('faq1')}
          />
        </div>
        <CSSTransition
          in={activeFAQ === 'faq1'}
          timeout={100}
          classNames="faq"
          unmountOnExit
        >
          <p>
            Qualquer pessoa que esteja em dúvida sobre qual carreira seguir pode
            se beneficiar de um teste vocacional. Isso inclui estudantes do
            ensino médio, universitários indecisos sobre sua área de estudo, e
            profissionais que consideram mudar de carreira.
          </p>
        </CSSTransition>
      </article>

      <article>
        <div>
          <h2>Como o teste vocacional pode me ajudar?</h2>
          <img
            src={activeFAQ === 'faq2' ? ss2 : ss1}
            alt="FAQ"
            onClick={() => toggleFAQ('faq2')}
          />
        </div>
        <CSSTransition
          in={activeFAQ === 'faq2'}
          timeout={300}
          classNames="faq"
          unmountOnExit
        >
          <p>
            O teste vocacional oferece insights valiosos sobre suas preferências
            e pontos fortes, ajudando você a tomar decisões mais informadas
            sobre seu futuro profissional. Ele sugere carreiras que combinam com
            seu perfil, aumentando suas chances de satisfação e sucesso no
            trabalho.
          </p>
        </CSSTransition>
      </article>

      <article>
        <div>
          <h2>Os resultados do teste são confiáveis?</h2>
          <img
            src={activeFAQ === 'faq3' ? ss2 : ss1}
            alt="FAQ"
            onClick={() => toggleFAQ('faq3')}
          />
        </div>
        <CSSTransition
          in={activeFAQ === 'faq3'}
          timeout={300}
          classNames="faq"
          unmountOnExit
        >
          <p>
            Sim, nosso teste vocacional foi desenvolvido por especialistas em
            orientação de carreira e utiliza metodologias comprovadas para
            garantir a precisão dos resultados. No entanto, recomendamos que
            você utilize os resultados como um guia e também busque
            aconselhamento profissional, se necessário.
          </p>
        </CSSTransition>
      </article>
        
        <Link className='FaqIniciarTeste' to="/teste-vocacional/perguntas">Iniciar Teste</Link>
    </section>
            </section>

            <FooterEmprego/>
        </div>
    )
}
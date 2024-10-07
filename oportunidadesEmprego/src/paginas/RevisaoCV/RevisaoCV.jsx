import { useState } from 'react';
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego';
import MulherRevisaoCv from '../../assets/MulherRevisaoCv.jpg';
import './RevisaoCv.css';
import { Link } from 'react-router-dom';
import Animacao from '../../assets/Animacao.png';
import recruter from '../../assets/recruter.png';
import candidato from '../../assets/candidato.png';
import cv from '../../assets/cv.png';
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego';
import { Helmet } from 'react-helmet/es/Helmet';
import PES from '../../assets/PES.png';
import PP from '../../assets/PP.png';
import PEX from '../../assets/PEX.png';
import PaymentMethodPopup from '../PopUps/PaymentMethodPoup/PaymentMethodPoup';
import UploadPdfPopup from '../PopUps/UploadPdfPopup/UploadPdfPopup';
import MpesaPayment from '../PopUps/MpesaPayment/MpesaPayment';
import EmolaPayment from '../PopUps/EmolaPayment/EmolaPayment';
import PaymentResult from '../PopUps/PaymentResult/PaymentResult';
import pac1 from "../../assets/pac1.png"
import pac2 from "../../assets/pac2.png"
import pac3 from "../../assets/pac3.png"
import certo from "../../assets/certo.png"
import Coca from '../../assets/Coca.png'
import Yango from '../../assets/Yango.png'
import Mpesa from '../../assets/Mpesa.png'
import Brandview from '../../assets/Brandview.png'
import Moza from '../../assets/Moza.png'

export default function RevisaoCv() {
    const [showPopup, setShowPopup] = useState(false);
    const [step, setStep] = useState('method'); // Pode ser 'method', 'mpesa', 'emola', 'result'
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [valorPay,setValorPay]=useState(null);
    const [versao, setVersao]=useState(true);
   
    const handlePaymentMethod = (method) => {
        setStep(method);
    };

    const handleConfirmPayment = (success) => {
        setPaymentSuccess(success);
        setStep('result'); // Após confirmar o pagamento, vá para o popup de resultado
    };
    const goToUpload = () => {
        setStep('upload'); // Muda para o passo de upload quando o botão no resultado for clicado
    };

    const closePopup = () => {
        setShowPopup(false);
        setStep('method');
        setPaymentSuccess(null);
    };

    const showPaymentPopup = (valorPay) => {
        setShowPopup(true);
        setValorPay(valorPay);
    };
    const handleMouseOver = (id) => {
        const card = document.getElementById(`PacotesRevisaoSectionCV2CARD${id}`);
        card.style.transform = "translateY(-10px)";  // Sobe a caixa 10px
        card.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";  // Adiciona sombra
        card.style.border="2px solid #6E46AE"
      };
      
      const handleMouseOut = (id) => {
        const card = document.getElementById(`PacotesRevisaoSectionCV2CARD${id}`);
        card.style.transform = "translateY(0)";  // Volta à posição original
        card.style.boxShadow = "none";  // Remove a sombra
        card.style.border="none"
      };
      const SwitchVersion=()=>{
        setVersao(!versao);
      }
      const scrollToElement = () => {
        const element = document.getElementById('Modelos-Pacotes-Revisao-CV');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      

    return (
        <div className={showPopup ? 'RevisaoCv2' : 'RevisaoCv'}>
            <Helmet>
                <title>Revisão de CV</title>
                <meta
                    name="description"
                    content={
                        'Os profissionais de RH revelaram que muitas vezes fazem julgamentos iniciais com base na qualidade do perfil profissional de um candidato. Não se trata apenas de qualificações; trata-se de transmitir seu valor único de uma forma que cative potenciais empregadores.'
                    }
                />
                <meta property="og:title" content={'og: Revisão de CV'} />
                <meta
                    property="og:description"
                    content={
                        'og:Os profissionais de RH revelaram que muitas vezes fazem julgamentos iniciais com base na qualidade do perfil profissional de um candidato. Não se trata apenas de qualificações; trata-se de transmitir seu valor único de uma forma que cative potenciais empregadores.'
                    }
                />
            </Helmet>

            <HeaderEmprego />

            <section className="IntroRevisao">
                <section>
                    <p>
                        Destaque o Seu Potencial Profissional:<span>Revise seu CV</span> e Alcance Novas
                        Oportunidades
                    </p>

                    <h3>
                        Sua jornada para uma carreira mais promissora começa com um perfil profissional
                        atraente.
                    </h3>

                    <div>
                        <Link className="PacotesCVLINKINTRO" to="/criacao-de-cv">
                            Criar CV do zero
                        </Link>
                        <button onClick={scrollToElement} className="PacotesCVLINKREVISAOCV" >
                            Pedir revisão de CV
                        </button>
                    </div>
                </section>

                
            </section>
            <section className="CompanyRecruter">

            <div className="CompanyRecruter-Duplicate">
                        
                <div className="CompanyRecruter-Slider">
                        <img loading="lazy"src={Coca}  />
                                <img loading="lazy"src={Yango}  />
                                <img loading="lazy"src={Mpesa}  />
                                <img loading="lazy"src={Brandview}  />
                                <img loading="lazy"src={Moza}  />
                        
                </div>

                <div className="CompanyRecruter-Slider">
                        <img loading="lazy"src={Coca}  />
                                <img loading="lazy"src={Yango}  />
                                <img loading="lazy"src={Mpesa}  />
                                <img loading="lazy"src={Brandview}  />
                                <img loading="lazy"src={Moza}  />
                        
                </div>
                        </div>
                
            </section>

            <section className="InformacoesRevisao">
                <section id="RecruterRevisaoCV" className="InfoRevisaoCv">
                    <img loading="lazy"src={recruter} />
                    <div>
                        <h2>Destaque-se para os recrutadores instantaneamente</h2>
                        <p>
                            Os profissionais de RH revelaram que muitas vezes fazem julgamentos iniciais com
                            base na qualidade do perfil profissional de um candidato. Não se trata apenas de
                            qualificações; trata-se de transmitir seu valor único de uma forma que cative
                            potenciais empregadores.
                        </p>
                    </div>
                    
                </section>

                <section id="CanidatoRevisaoCV" className="InfoRevisaoCv">
                    
                    <div>
                        <h2>
                            Cative empregadores com um currículo excepcional
                        </h2>
                        <p>
                            Passe de um candidato comum a um profissional de destaque com uma história
                            distinta. Deixe-nos ajudá-lo a deixar uma impressão duradoura e a tornar o seu
                            perfil profissional verdadeiramente excepcional.
                        </p>
                    </div>
                    <img loading="lazy"src={candidato} />
                </section>
            </section>

            

            <section className={versao?"invisivel":"PacotesRevisaoCV2"} id='Modelos-Pacotes-Revisao-CV' >
                    <h2>Descubra o plano ideal para você</h2>
                    <p>Recursos que ajudarão a alcançar as melhores oportunidades de trabalho</p>

                    <section className='PacotesRevisaoSectionCV2'>
                            <article className='PacotesRevisaoSectionCV2CARD' id='PacotesRevisaoSectionCV2CARD111'>
                                <article className='HeaderPacotesRevisaoCV2'>
                                    <div>
                                        <div>
                                            <h3>Essencial</h3>
                                            <p>Ideal para iniciantes</p>
                                        </div>

                                        <img loading="lazy"src={pac1}  />
                                    </div>

                                    <h3>300,00<span>/MTn</span></h3>
 
                                </article>

                                <article className='TextosPacotesRevisaoCV2'>
                                    <ul>
                                        <li><img loading="lazy"src={certo} /> <p>Revisão básica: Ortográfica e gramatical</p></li>
                                        <li><img loading="lazy"src={certo} /> <p>Formatação: estrutura, margens e fontes</p></li>
                                        <li><img loading="lazy"src={certo} /> <p>Seu CV livre de erros básicos</p></li>
                                        <li><img loading="lazy"src={certo} /> <p>Feedback Geral</p></li>
                                        <li><img loading="lazy"src={certo} /> <p>Modelo de CV básico</p></li>
                                    </ul>

                                    <button id ='TextosPacotesRevisaoCV2Button111'   onMouseOver={() => handleMouseOver(111)} 
  onMouseOut={() => handleMouseOut(111)} onClick={() => showPaymentPopup('300')} >
                                        Aprimorar CV
                                    </button>
                                </article>
                            </article>

                            <article className='PacotesRevisaoSectionCV2CARD' id='PacotesRevisaoSectionCV2CARD222'>
                                <article className='HeaderPacotesRevisaoCV2'>
                                    <div>
                                        <div>
                                            <h3>Executivo</h3>
                                            <p>Revisão Completa</p>
                                        </div>

                                        <img loading="lazy"src={pac2}  />
                                    </div>

                                    <h3>3000,00<span>/MTn</span></h3>
 
                                </article>

                                <article className='TextosPacotesRevisaoCV2'>
                                    <ul>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Tudo do pacote Profissional + Essncial</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Revisão Detalhada</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Consultoria Individual</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Optimização de Conteúdos</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Carta  de Apresentação</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Perfil LinkedIn</p></li>
                                    </ul>

                                    <button id='TextosPacotesRevisaoCV2Button222'  onMouseOver={() => handleMouseOver(222)} 
  onMouseOut={() => handleMouseOut(222)} onClick={() => showPaymentPopup('3000')}>
                                        Aprimorar CV
                                    </button>
                                </article>
                            </article>

                            <article className='PacotesRevisaoSectionCV2CARD' id='PacotesRevisaoSectionCV2CARD333'>
                                <article className='HeaderPacotesRevisaoCV2'>
                                    <div>
                                        <div>
                                            <h3>Profissional</h3>
                                            <p>Eleve seu CV</p>
                                        </div>

                                        <img loading="lazy"src={pac3}  />
                                    </div>

                                    <h3>1500,00<span>/MTn</span></h3>
 
                                </article>

                                <article className='TextosPacotesRevisaoCV2'>
                                    <ul>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Tudo do pacote Essencial</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Correção de erros ortográficos e gramaticais</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Feedback personalizado</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Recomendações de reestruturação</p></li>
                                        <li><img loading="lazy"src={certo} alt="check" /> <p>Modelo de CV Editável</p></li>
                                    </ul>

                                    <button id='TextosPacotesRevisaoCV2Button333'  onMouseOver={() => handleMouseOver(333)} 
  onMouseOut={() => handleMouseOut(333)} onClick={() => showPaymentPopup('1500')}>
                                        Aprimorar CV
                                    </button>
                                </article>
                            </article>
                    </section>
            </section>

            <section className={versao?"PacotesRevisaoCV":"invisivel"} >
                <h2>Descubra o plano ideal para você</h2>
                <p>Recursos que ajudarão a alcançar as melhores oportunidades de trabalho</p>

                <section className="PacotesRevisaoCVValor">
                    <article>
                        <img loading="lazy"src={PES} />
                        <button onClick={() => showPaymentPopup('300')}>Aprimorar CV</button>
                    </article>

                    <article>
                        <img loading="lazy"src={PP} />
                        <button onClick={() => showPaymentPopup('1500')}>Aprimorar CV</button>
                    </article>

                    <article>
                        <img loading="lazy"src={PEX} />
                        <button onClick={() => showPaymentPopup('3000')}>Aprimorar CV</button>
                    </article>
                </section>
            </section>

            <section className="PedirCV">
                <h2>Crie CV com a oportunidade.co.mz e seja visto!</h2>

                <div>
                    <img loading="lazy"src={cv} />
                    
                </div>

                <Link to="/criacao-de-cv">Criar CV</Link>
            </section>

            {showPopup && (
                <section className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        {step === 'method' && <PaymentMethodPopup onSelectMethod={handlePaymentMethod} valorPay={valorPay} />}
                        {step === 'mpesa' && (
                            <MpesaPayment onConfirmPayment={handleConfirmPayment} onCancel={closePopup} valorPay={valorPay} />
                        )}
                        {step === 'emola' && (
                            <EmolaPayment onConfirmPayment={handleConfirmPayment} onCancel={closePopup} valorPay={valorPay} />
                        )}
                        {step === 'result' && (
                            <PaymentResult success={paymentSuccess} onClose={closePopup} onProceed={goToUpload} />
                        )}
                        {step === 'upload' && (
                            <UploadPdfPopup  onClose={closePopup} valorPay={valorPay} />
                        )}
                    </div>
                </section>
            )}
            <FooterEmprego />
        </div>
    );
}


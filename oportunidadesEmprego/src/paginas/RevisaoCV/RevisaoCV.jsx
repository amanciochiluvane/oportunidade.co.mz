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

export default function RevisaoCv() {
    const [showPopup, setShowPopup] = useState(false);
    const [step, setStep] = useState('method'); // Pode ser 'method', 'mpesa', 'emola', 'result'
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [valorPay,setValorPay]=useState(null);
   
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
                        Destaque o Seu Potencial Profissional: <span>Revise seu CV</span> e Alcance Novas
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
                        <button className="PacotesCVLINKREVISAOCV" >
                            Pedir revisão de CV
                        </button>
                    </div>
                </section>

                <img src={MulherRevisaoCv} className="MulherRevisaoCv" />
                <img src={Animacao} className="Animacao" />
            </section>

            <section className="InformacoesRevisao">
                <section id="RecruterRevisaoCV" className="InfoRevisaoCv">
                    <div>
                        <h2>Destaque-se para os recrutadores instantaneamente</h2>
                        <p>
                            Os profissionais de RH revelaram que muitas vezes fazem julgamentos iniciais com
                            base na qualidade do perfil profissional de um candidato. Não se trata apenas de
                            qualificações; trata-se de transmitir seu valor único de uma forma que cative
                            potenciais empregadores.
                        </p>
                    </div>
                    <img src={recruter} />
                </section>

                <section id="CanidatoRevisaoCV" className="InfoRevisaoCv">
                    <img src={candidato} />
                    <div>
                        <h2>
                            Cative potenciais empregadores com um currículo excepcional, uma carta de
                            apresentação e um perfil no LinkedIn.
                        </h2>
                        <p>
                            Passe de um candidato comum a um profissional de destaque com uma história
                            distinta. Deixe-nos ajudá-lo a deixar uma impressão duradoura e a tornar o seu
                            perfil profissional verdadeiramente excepcional.
                        </p>
                    </div>
                </section>
            </section>

            <section className="PacotesRevisaoCV">
                <h2>Nossos Planos</h2>
                <p>Recursos que ajudarão a alcançar as melhores oportunidades de trabalho</p>

                <section className="PacotesRevisaoCVValor">
                    <article>
                        <img src={PES} />
                        <button onClick={() => showPaymentPopup('300')}>Aprimorar CV</button>
                    </article>

                    <article>
                        <img src={PP} />
                        <button onClick={() => showPaymentPopup('1500')}>Aprimorar CV</button>
                    </article>

                    <article>
                        <img src={PEX} />
                        <button onClick={() => showPaymentPopup('3000')}>Aprimorar CV</button>
                    </article>
                </section>
            </section>

            <section className="PedirCV">
                <h2>Crie CV com a oportunidades.co.mz e seja visto!</h2>

                <div>
                    <img src={cv} />
                    <img src={cv} className="imgofuscada" />
                    <img src={cv} className="imgofuscada" />
                </div>

                <Link to="/cv">Criar CV</Link>
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


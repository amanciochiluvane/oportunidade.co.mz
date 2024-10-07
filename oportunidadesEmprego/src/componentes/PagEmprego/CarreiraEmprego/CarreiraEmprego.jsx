import { Link } from "react-router-dom"
import './CarreiraEmprego.css'
import SetaBranca from '../../../assets/SetaBranca.png'
import Sin1 from '../../../assets/Sin1.png'
import Sin2 from '../../../assets/Sin2.png'
import MulherComputador from '../../../assets/MulherComputador.png'
import Animacao from '../../../assets/Animacao.png'
import PessoaCell from "../../../assets/PessoaCell.png"
import setas from "../../../assets/setas.png"
import alerta1 from "../../../assets/alerta1.png"
import alerta2 from "../../../assets/alerta2.png"
import setalaerta from "../../../assets/setaalerta.png"


export default function CarreiraEmprego(){
    return(
        <div className="CarreiraEmpregoMother">
            <div className="CarreiraEmprego">
            <div>
                <img loading="lazy"src={PessoaCell} className="PessoaCell2" alt="" />
                <section className="InfoCarreiraEmprego">
                    <h2>Desenvolva sua carreira com a <span>oportunidade.co.mz</span></h2>
                    <p>Crie uma conta gratuita, preencha seu perfil e seja conectado com o emprego dos seus sonhos</p>
                    <div className="SaberMaisCarreiraEmprego">
                        <Link className="SaberMaisCarreiraEmpregoEntrar" to="/escolher-tipo-login">Entrar</Link>
                        <Link to="/escolherConta" className="SaberMaisCarreiraEmpregoLink">Saber mais</Link>
                    </div>
                    <section className="alertasCarreira">
                        <article className="alertasCarreira1">
                            <img loading="lazy" src={alerta1} />
                            <div>
                                <h3>Seja visto pelos empregadores</h3>
                                <p>Um perfil completo garante destaque e visibilidade para empregadores.</p>
                            </div>
                        </article>
                        <img loading="lazy" src={setalaerta} className="setaalerta"/>
                        <article className="alertasCarreira2">
                            <img loading="lazy"src={alerta2} />
                            <div>
                                <h3>Acesse oportunidades ideais para você</h3>
                                <p>Receba alertas de emprego alinhados à sua experiência, setor, função e localização.</p>
                            </div>
                        </article>
                    </section>
                </section>
                <img loading="lazy" className="PessoaCell"  src={PessoaCell} />
            </div>
                  
                </div>
                <div className="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f2f2f2" fillOpacity="1" d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
        </div>
    
    )
}
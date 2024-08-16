import { Link } from "react-router-dom"
import './CarreiraEmprego.css'
import SetaBranca from '../../../assets/SetaBranca.png'
import Sin1 from '../../../assets/Sin1.png'
import Sin2 from '../../../assets/Sin2.png'
import MulherComputador from '../../../assets/MulherComputador.png'
import Animacao from '../../../assets/Animacao.png'


export default function CarreiraEmprego(){
    return(
        <div className="CarreiraEmprego">
            <div>
                <section className="InfoCarreiraEmprego">
                    <h2>Desenvolva sua carreira com a oportunidade.co.mz</h2>
                    <p>Crie uma conta gratuita, preencha seu perfil e seja conectado com o emprego dos seus sonhos</p>
                    <div className="SaberMaisCarreiraEmprego">
                        <Link className="SaberMaisCarreiraEmpregoEntrar" to="/signup">Entrar</Link>
                        <Link  to="/signup" className="SaberMaisCarreiraEmpregoLink">Saber mais</Link>
                        <img src={SetaBranca} alt="SetaBranca" />

                    </div>

                    <article className="MarketingCarreiraEmprego">
                        <div>
                            <img src={Sin1} />
                            <h2>Seja visto pelos empregadores</h2>
                            <p>Ao ter um perfil completo, suas candidaturas e perfil são destacados para os principais empregadores, garantindo sua visibilidade.</p>
                        </div>

                        <div>
                            <img src={Sin2} />
                            <h2>Acesse oportunidades ideais para você</h2>
                            <p>Receba alertas de emprego personalizados que coincidem com sua experiência, sector, função e localização, garantindo que você esteja ciente das melhores oportunidades disponíveis</p>
                        </div>
                    </article>
                </section>

                <section className="imgCarreiraEmprego">
                    <img className="IMGMulherComputador" src={MulherComputador} />
                    <img className="IMGAnimacao" src={Animacao} />
                </section>
            </div>
        </div>
    )
}
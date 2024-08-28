import { Link } from "react-router-dom"
import './CarreiraEmprego.css'
import SetaBranca from '../../../assets/SetaBranca.png'
import Sin1 from '../../../assets/Sin1.png'
import Sin2 from '../../../assets/Sin2.png'
import MulherComputador from '../../../assets/MulherComputador.png'
import Animacao from '../../../assets/Animacao.png'
import PessoaCell from "../../../assets/PessoaCell.png"
import setas from "../../../assets/setas.png"


export default function CarreiraEmprego(){
    return(
        <div className="CarreiraEmprego">
            <div>
                <img src={PessoaCell} className="PessoaCell2" alt="" />
                <section className="InfoCarreiraEmprego">
                    <h2>Desenvolva sua carreira com a <span>oportunidade.co.mz</span></h2>
                    <p>Crie uma conta gratuita, preencha seu perfil e seja conectado com o emprego dos seus sonhos</p>
                    <div className="SaberMaisCarreiraEmprego">
                        <Link className="SaberMaisCarreiraEmpregoEntrar" to="/signup">Entrar</Link>
                        <Link  to="/signup" className="SaberMaisCarreiraEmpregoLink">Saber mais</Link>
                        

                    </div>

                <img className="setaspessoas" src={setas} alt="" />  
                </section>

                <img className="PessoaCell" src={PessoaCell} />

               
            </div>
        </div>
    )
}
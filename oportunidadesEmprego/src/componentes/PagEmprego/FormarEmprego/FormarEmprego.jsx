import { Link } from "react-router-dom"
import ProximoBotao from '../../../assets/Proximo.png'
import MulherFormada from '../../../assets/MulherFormada2.png'
import './FormarEmprego.css'


export default function FormarEmprego(){
   return(
    <div className="FormarEmprego">
        <section className="FormarEmpregoImg">
            <img src={MulherFormada} alt="Mulher Formada"  />
        </section>

        <section className="FormarEmpregoTexto">
            <h2>Acabou de se formar? Podemos ajudar.</h2>

            <Link>
                <p>Acesse o Centro para Recém-Formados</p>
                <img src={ProximoBotao} alt="Botao Proximo" />
            </Link>

            <Link to="/salario">
                <p>Pesquise salários por área de estudo</p>
                <img src={ProximoBotao} alt="Botao Proximo" />
            </Link>

            <Link to="/revisao-de-cv">
                <p>Receba uma avaliação gratuita do currículo</p>
                <img src={ProximoBotao} alt="Botao Proximo" />
            </Link>

            <Link to="/vagas">
                <p>Procure empregos de nível inicial</p>
                <img src={ProximoBotao} alt="Botao Proximo" />
            </Link>
        </section>
    </div>
   )
}
import { Link } from "react-router-dom"
import ProximoBotao from '../../../assets/btn.png'
import MulherFormada from '../../../assets/graduada.png'
import './FormarEmprego.css'


export default function FormarEmprego(){
   return(
    <div className="FormarEmprego">
       

        <section className="FormarEmpregoTexto">
            <h2>Acabou de se formar? Podemos ajudar.</h2>
            <p>Acabou de se formar e está em busca do primeiro emprego? 
            No Oportunidade.co.mz você encontra as melhores vagas 
            para recém-formados. </p> 

            <Link>
                <p>Acesse o Centro para Recém-Formados</p>
                <img loading="lazy"src={ProximoBotao} className="button-img" alt="Botao Proximo" />
            </Link>

            <Link to="/salario">
                <p>Pesquise salários por área de estudo</p>
                <img loading="lazy"src={ProximoBotao} className="button-img" alt="Botao Proximo" />
            </Link>

            <Link to="/revisao-de-cv">
                <p>Receba uma avaliação gratuita do currículo</p>
                <img loading="lazy"src={ProximoBotao} className="button-img" alt="Botao Proximo" />
            </Link>

            <Link to="/vagas">
                <p>Procure empregos de nível inicial</p>
                <img loading="lazy"src={ProximoBotao} className="button-img" alt="Botao Proximo" />
            </Link>
        </section>

        <section className="FormarEmpregoImg">
            <img loading="lazy"src={MulherFormada} alt="Mulher Formada"  />
        </section>
    </div>
   )
}
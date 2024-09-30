import './IntroCv.css'
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import { Link } from 'react-router-dom'
import HomemCriarCv from "../../assets/Mulher-Surpresa.png"
import Doiscvs from "../../assets/elementscv1.png"
import cv1 from "../../assets/Cv-Modelo01.png"
import cv2 from "../../assets/Cv-Modelo02.png"
import cv3 from "../../assets/Cv-Modelo03.png"
import cv4 from "../../assets/Cv-Modelo04.png"
import FooterEmprego from "../../componentes/PagEmprego/FooterEmprego/FooterEmprego"
import mcv from "../../assets/mcv.png"
import mod1 from "../../assets/modcv1.png"
import mod2 from "../../assets/modcv2.png"
import mod3 from "../../assets/modcv3.png"
import sett from "../../assets/settt.png"

export default function IntroCv(){
    return(
        <div className="IntroCv">
            <HeaderEmprego/>

            <section className='IntroCvDescricao'>
                <h2>
                Crie um Curriculum em Questão de Minutos
                </h2>

                <article>
                <p>Criar um currículo em minutos é possível com as ferramentas certas. Use modelos prontos e organize suas informações de forma clara.</p>

                <Link to="#Modelos-de-cv" className='LinkCriarCVIntroCV'>Criar Cv</Link>
                </article>


                <div className="wave" id="wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f2f2f2" fillOpacity="1" d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </section>

            

            <img className="mcv" src={mcv} alt="Mulher Criar CV" />
           

            <section className='PassosCV'>
                <article className='IMGPassosCV'>
                    <img src={Doiscvs} className='IMGCv1' />
                   
                </article>

                <article className='TextPassosCV'>
                    <h3>Como Funciona?</h3>
                    <h2>3 Passos 5 Minutos</h2>

                    <div>
                        <p>
                            Nos dias de hoje, ter um currículo atualizado e bem formatado
                            é essencial para se destacar no mercado de trabalho.
                        </p>

                        <p>
                            Um currículo bem elaborado é muitas vezes a primeira
                            impressão que um recrutador terá de você, e pode ser
                            decisivo na conquista de uma entrevista.
                        </p>


                        <p>
                            No entanto, a ideia de passar horas preparando e ajustando
                            esse documento pode ser desanimadora, especialmente
                            quando se precisa de resultados rápidos.
                        </p>


                        <p>
                            Felizmente, com as ferramentas e técnicas certas, é possível
                            criar um currículo profissional em questão de minutos, sem
                            perder a qualidade ou a relevância das informações.
                        </p>
                    </div>
                </article>
            </section>

            <section className='PassosCards'>
                    <article>
                        <img src={mod1}  />
                        <h2>Escolha um Modelo Pronto</h2>
                        <p>Selecionamos modelos modernos e adequados para diferentes setores e níveis de experiência. Escolha o que melhor se adapta às suas necessidades.</p>
                        <img className="sett" src={sett} />
                    </article>

                    <article>
                        <img src={mod2}  />
                        <h2>Organize suas Informações</h2>
                        <p>Insira seus dados pessoais, histórico profissional, formação acadêmica e habilidades em nossa plataforma intuitiva de forma clara e objetiva.</p>
                        <img  className="sett" src={sett} />
                    </article>

                    <article>
                        <img src={mod3}  />
                        <h2>Revise e Finalize</h2>
                        <p>Nossa equipe revisa seu currículo para garantir que esteja livre de erros e bem formatado. Faça os ajustes necessários e, em minutos, tenha um documento profissional pronto para enviar.</p>
                        <img  className="sett" src={sett} />
                    </article>
                    
                    
                

            </section>

            <section className='ModelosCv' id='Modelos-de-cv'>
                <h2>Escolha um Modelo e tenha o seu CV</h2>
                <section>
                    <Link to='/modelo-de-cv-01'>
                        <img src={cv1} alt="Modelo 1 " />
                    </Link>
                    <Link to="/modelo-de-cv-02">
                        <img src={cv2} alt="Modelo 2 " />
                    </Link>
                    <Link to="/modelo-de-cv-03">
                        <img src={cv3} alt="Modelo 3 " />
                    </Link>
                    <Link to="/modelo-de-cv-04">
                        <img src={cv4} alt="Modelo 4 " />
                    </Link>
                </section>
            </section>

            <FooterEmprego/>

        </div>
    )
}
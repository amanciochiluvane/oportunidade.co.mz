import './IntroCv.css'
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import { Link } from 'react-router-dom'
import HomemCriarCv from "../../assets/Mulher-Surpresa.png"
import Doiscvs from "../../assets/DoisCVs.png"
import cv1 from "../../assets/Cv-Modelo01.png"
import cv2 from "../../assets/Cv-Modelo02.png"
import cv3 from "../../assets/Cv-Modelo03.png"
import cv4 from "../../assets/Cv-Modelo04.png"
import FooterEmprego from "../../componentes/PagEmprego/FooterEmprego/FooterEmprego"


export default function IntroCv(){
    return(
        <div className="IntroCv">
            <HeaderEmprego/>

            <section className='IntroCvDescricao'>
                <h2>
                Crie um Curriculum em Questão de Minutos
                </h2>

                <article>
                Criar um currículo em minutos é possível com as ferramentas certas. Use modelos prontos e organize suas informações de forma clara.

                <Link to=".ModelosCv" className='LinkCriarCVIntroCV'>Criar Cv</Link>
                </article>
            </section>

            <section className='IntroCvDescricao2'>
                <h2>
                Atinja <span>Altos Patamares</span> e Seja Reconhecido
                </h2>
                <img src={HomemCriarCv} alt="Criar Cv Homem"/>
                
            </section>

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
                    <h2>1.</h2>

                    <div>
                        <h2>Escolha um Modelo Pronto</h2>
                        <p>Selecionamos modelos modernos e adequados para diferentes setores e níveis de experiência. Escolha o que melhor se adapta às suas necessidades.</p>
                    </div>
                </article>

                <article>
                    <h2>2.</h2>

                    <div>
                        <h2>Organize suas Informações</h2>
                        <p>Insira seus dados pessoais, histórico profissional, formação acadêmica e habilidades em nossa plataforma intuitiva de forma clara e objetiva.</p>
                    </div>
                </article>

                <article>
                    <h2>3.</h2>

                    <div>
                        <h2>Revise e Finalize</h2>
                        <p>Nossa equipe revisa seu currículo para garantir que esteja livre de erros e bem formatado. Faça os ajustes necessários e, em minutos, tenha um documento profissional pronto para enviar.</p>
                    </div>
                </article>
            </section>

            <section className='ModelosCv'>
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
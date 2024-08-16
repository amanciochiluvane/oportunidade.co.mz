
import { Link } from 'react-router-dom'
import './FooterEmprego.css'
import  Facebook from '../../../assets/Facebook.png'
import  Instagram from '../../../assets/Instagram.png'
import  Twitter from '../../../assets/Twitter.png'
import  LinkedIn from '../../../assets/LinkedIn.png'

import Pag2 from '../../../assets/Pag2.png'
import Pag3 from '../../../assets/Pag3.png'
import Pag4 from '../../../assets/Pag4.png'
import Pag5 from '../../../assets/Pag5.png'
import Logo from '../../../assets/LogotipoEmprego.png'


export default function FooterEmprego(){
    return(
        <div className="FooterEmprego">
            <article className='LinksPaginas2'>
                <div>
                    <h2>Institucional</h2>
                    <Link to='/sobre-nos'>Sobre Nós</Link>
                    <Link to='/trabalhe-connosco'>Trabalhe Connosco</Link>
                    <Link to='/contacto'>Contactos</Link>
                </div> 

                <div>
                    <h2>Candidato</h2>
                    <Link to='/vagas'>Vagas</Link>
                    <Link to='/vagas'>Procurar vaga</Link>
                    <Link to='/revisao-de-cv'>Revisão de CV</Link>
                    <Link to='/dicas-de-carreira'>Dicas de Carreira</Link>
                 
                    
                    
                </div> 

                <div>
                    <h2>Recrutador</h2>
                    <Link to='/recrutador'>Anunciar Vagas</Link>
                    <Link to='/salario'>Pesquisa Salarial</Link>
                    <Link to='/empregadores'>Empresas a recrutar</Link>
                   
                    
                </div> 

                <div>
                    <h2>Recursos Úteis</h2>
                    <Link to='/teste-vocacional'>Teste vocacional</Link>
                    <Link to='/salario'>Salários na sua região</Link>
                    
                    
                </div> 

                <div>
                    <h2>Central de Ajuda</h2>
                    <Link to='/contacto'>Atendimento</Link>
                    <Link to='/dicas-de-carreira'>Dicas para Emprego</Link>
                   
                   
                </div> 


            </article>
            <section className='OverviewFooter'>
            <img className="FooterLogotipo" src={Logo}/>
                <article>
                    <h2>Pagamento seguro</h2>
                    <div>
                        <img className='PagamentoFormas' src={Pag2}/>
                        <img className='PagamentoFormas' src={Pag3}/>
                        <img className='PagamentoFormas' src={Pag4}/>
                        <img className='PagamentoFormas' src={Pag5}/>
                    </div>
                   
                
                </article>

                <article className='SocialMedia3'>
                    <h2>Redes Sociais</h2>
                    <div className='SocialMedia2'>
                    <Link to="#"><img src={Facebook} alt="Ícone Facebook" /></Link>
                    <Link to="#"><img src={LinkedIn} alt="Ícone LinkedIn" /></Link>
                    <Link to="#"><img src={Twitter} alt="Ícone Twitter" /></Link>
                    <Link to="#"><img src={Instagram} alt="Ícone Instagram" /></Link>
   
                </div>
                </article>
            
            </section>

            <article className='Direitos'>
                <p>®oportunidades.co.mz - 2024</p>
            </article>
        </div>
    )
}



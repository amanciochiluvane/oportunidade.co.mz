import './FooterCrowdfunding.css'
import { Link } from 'react-router-dom'

import  Facebook from '../../../assets/Facebook.png'
import  Instagram from '../../../assets/Instagram.png'
import  Twitter from '../../../assets/Twitter.png'
import  LinkedIn from '../../../assets/LinkedIn.png'
import Pag1 from '../../../assets/Pag1.png'
import Pag2 from '../../../assets/Pag2.png'
import Pag3 from '../../../assets/Pag3.png'
import Pag4 from '../../../assets/Pag4.png'
import Pag5 from '../../../assets/Pag5.png'
import Logo from '../../../assets/LogotipoCrowdfunding.png'

export default function FooterCrowdfunding(){
    return(
        <div className="FooterCrowdfunding">
            <article className='LinksPaginas2'>
                <div>
                    <h2>Institucional</h2>
                    <Link to='#'>Trabalhe Connosco</Link>
                    <Link to='#'>Revista</Link>
                    <Link to='#'>Sobre Nós</Link>
                    <Link to='#'>Contactos</Link>
                    <Link to='#'>Ajuda</Link>
                </div> 

                <div>
                    <h2>Empreendedores</h2>
                    <Link to='#'>Captar investimento</Link>
                    <Link to='#'>Como funciona</Link>
                    <Link to='#'>Análise de Currículo</Link>
                    <Link to='#'>Porquê Oportunidade</Link>
                    <Link to='#'>Parceiros</Link>
                    
                    
                </div> 

                <div>
                    <h2>Investidores</h2>
                    <Link to='#'>Investir</Link>
                    <Link to='#'>Como funciona o investimento</Link>
                   
                    
                </div> 

                <div>
                    <h2>Ajuda e Suporte</h2>
                    <Link to='#'>Centro de educação</Link>
                    <Link to='#'>Diretório de Especialistas</Link>
                    <Link to='#'>Honorários</Link>
                    
                    
                </div> 

                <div>
                    <h2>Legal</h2>
                    <Link to='#'>Termos de uso</Link>
                    <Link to='#'>Política de Privacidade</Link>
                    <Link to='#'>Aviso de Cookie</Link>
                    <Link to='#'>Documentos legais</Link>
                   
                </div> 


            </article>

           
            <section className='OverviewFooter'>
            <img loading="lazy"className="FooterLogotipo" src={Logo}/>
                <article>
                    <h2>Pagamento seguro</h2>
                    <div>
                        <img loading="lazy"className='PagamentoConfiavel' src={Pag1}/>
                        <img loading="lazy"className='PagamentoFormas' src={Pag2}/>
                        <img loading="lazy"className='PagamentoFormas' src={Pag3}/>
                        <img loading="lazy"className='PagamentoFormas' src={Pag4}/>
                        <img loading="lazy"className='PagamentoFormas' src={Pag5}/>
                    </div>
                   
                
                </article>

                <article className='SocialMedia3'>
                    <h2>Redes Sociais</h2>
                    <div className='SocialMedia2'>
                    <Link to="#"><img loading="lazy"src={Facebook} alt="Ícone Facebook" /></Link>
                    <Link to="#"><img loading="lazy"src={LinkedIn} alt="Ícone LinkedIn" /></Link>
                    <Link to="#"><img loading="lazy"src={Twitter} alt="Ícone Twitter" /></Link>
                    <Link to="#"><img loading="lazy"src={Instagram} alt="Ícone Instagram" /></Link>
   
                </div>
                </article>
            
            </section>
            
           


            <article className='Direitos'>
                <p>®oportunidade.co.mz - Brandview Communication lda</p>
            </article>
        </div>
    )
}
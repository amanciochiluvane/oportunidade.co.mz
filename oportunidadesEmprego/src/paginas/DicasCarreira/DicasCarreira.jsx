import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import './DicasCarreira.css'
import SenhorCarreira from '../../assets/SenhorCarreira.png'
import LinksCategDicas from "../../componentes/PagDicasEmprego/LinksCategDicas/LinksCategDicas"
import DicasRecentes from "../../componentes/PagDicasEmprego/DicasRecentes/DicasRecentes"
import DicasProximas from "../../componentes/PagDicasEmprego/DicasProximas/DicasProximas"
import UltimasDicas from "../../componentes/PagDicasEmprego/UltimasDicas/UltimasDicas"
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego' 
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet/es/Helmet'

export default function DicasCarreira(){
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simula um atraso de carregamento (pode ser substituído pela lógica de carregamento real)
        const timer = setTimeout(() => {
          setIsLoading(false); // Remove o loader e exibe o conteúdo
        }, 1000); // Ajuste conforme necessário
    
        // Limpa o timer se o componente for desmontado antes do timeout
        return () => clearTimeout(timer);
      }, []);
    

    const handleSearch = () => {
        if (searchTerm.trim()) {
           navigate(`/pesquisar-dica/${searchTerm}`);
        }

        
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };
    return(
        <>
        {isLoading ? (
           <article className='card123'>
                    <div className="dots">
                    <span style={{ "--i": 1 }}></span>
                        <span style={{ "--i": 2 }}></span>
                        <span style={{ "--i": 3 }}></span>
                        <span style={{ "--i": 4 }}></span>
                        <span style={{ "--i": 5 }}></span>
                        <span style={{ "--i": 6 }}></span>
                        <span style={{ "--i": 7 }}></span>
                        <span style={{ "--i": 8 }}></span>
                        <span style={{ "--i": 9 }}></span>
                        <span style={{ "--i": 10 }}></span>
                        <span style={{ "--i": 11 }}></span>
                        <span style={{ "--i": 12 }}></span>
                        <span style={{ "--i": 13 }}></span>
                        <span style={{ "--i": 14 }}></span>
                        <span style={{ "--i": 15 }}></span>
                    </div>
         </article>
          ) : (

        <div className="DicasCarreira">

    	            <Helmet>
                        <title>Dicas de Carreira</title>
                        <meta name="description" content={"Aprenda a se destacar em entrevistas, desenvolva novas habilidades com educação contínua, e encontre o equilíbrio perfeito entre vida profissional e pessoal. Se você está pensando em mudar de carreira ou iniciar seu próprio negócio, temos dicas valiosas para você."}/>
                        <meta property="og:title" content={"og:Dicas de Carreira"}/>
                        <meta property="og:description" content={"og:Aprenda a se destacar em entrevistas, desenvolva novas habilidades com educação contínua, e encontre o equilíbrio perfeito entre vida profissional e pessoal. Se você está pensando em mudar de carreira ou iniciar seu próprio negócio, temos dicas valiosas para você."}/>
                    </Helmet>

            <HeaderEmprego/>

            <section className="IntroDicasCarreira">
                <div>
                    <h2>Alcance o sucesso profissional 
                        com nossas <span>dicas de carreira</span></h2>

                    <p>Descubra segredos para impulsionar sua carreira! Encontre dicas práticas e conselhos especializados para alcançar seus objetivos profissionais. Prepare-se para o sucesso com nossa orientação especializada.</p>

                    <div className="PesquisarDica">
                        <input type="text" placeholder="Pesquisar dicas de carreira" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
                        <button onClick={handleSearch}>Pesquisar</button>
                    </div>

                    <div className="DicasCarreiraMaisPesquisadas">
                        <Link to="/categoria/Busca de Emprego"><button>Busca de Emprego</button></Link>
                        <Link to="/categoria/Curriculo"><button>Currículo</button></Link>
                        <Link to="/categoria/Desenvolvimento de Carreira"><button>Desenvolvimento de Carreira</button></Link>
                        <Link to="/categoria/Entrevistas"><button>Entrevistas</button></Link>
                        <Link to="/categoria/Networking"><button>Networking</button></Link>
                    </div>
                </div>
                <img loading="lazy" className="IntroDicasCarreiraIMG" src={SenhorCarreira} />
            </section>

            

            <DicasRecentes/>
            <DicasProximas/>
            <UltimasDicas/>
            <FooterEmprego/>
        </div>
          )}
          </>
    )
}
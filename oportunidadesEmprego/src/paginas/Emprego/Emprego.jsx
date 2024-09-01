import './Emprego.css'
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import EmpregoIntroducao from '../../componentes/PagEmprego/EmpregoIntroducao/EmpregoIntroducao'
import SiteLink from '../../assets/Link.png'
import OportunidadesEmprego from '../../componentes/PagEmprego/OportunidadesEmprego/OportunidadesEmprego'
import CarreiraEmprego from '../../componentes/PagEmprego/CarreiraEmprego/CarreiraEmprego'
import FormarEmprego from '../../componentes/PagEmprego/FormarEmprego/FormarEmprego'

import EmpregadoresEmprego from '../../componentes/PagEmprego/EmpregadoresEmprego/EmpregadoresEmprego'
import Relatorio from '../../assets/Relatorio.png'
import Seta from '../../assets/SetaAzul.png'
import { Link } from 'react-router-dom'
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Helmet } from 'react-helmet/es/Helmet'


export default function Emprego(){
    const [query,setQuery]=useState("");
    
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simula um atraso de carregamento (pode ser substituído pela lógica de carregamento real)
        const timer = setTimeout(() => {
          setIsLoading(false); // Remove o loader e exibe o conteúdo
        }, 1000); // Ajuste conforme necessário
    
        // Limpa o timer se o componente for desmontado antes do timeout
        return () => clearTimeout(timer);
      }, []);
    

    const handleInputChange =(event)=>{
        setQuery(event.target.value);

    }

    const handleChangeHandle = (valor)=>{
        setSelectedCategory(valor);
     }
    

    const [jobs, setJobs]=useState([]);
    useEffect(() =>{
        fetch("jobs.json").then(res=>res.json()).then(data =>{
            setJobs(data);
        })
    },[])
    
   
    return(
        <> 
        {isLoading ? (
           <section className='card123'>
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
         </section>
          ) : (
            <div className='Emprego'>
             <Helmet>
                <title>Oportunidade.co.mz - Seja bem-vindo ao seu destino online para oportunidades incríveis em Moçambique. Estamos aqui para conectar você com as melhores vagas de emprego, estágios, oportunidades de formação e muito mais.</title>
                <meta name="description" content={"Seja bem-vindo ao seu destino online para oportunidades incríveis em Moçambique. Estamos aqui para conectar você com as melhores vagas de emprego, estágios, oportunidades de formação e muito mais."}/>
                <meta property="og:title" content={"og: Seja bem-vindo ao seu destino online para oportunidades incríveis em Moçambique. Estamos aqui para conectar você com as melhores vagas de emprego, estágios, oportunidades de formação e muito mais."}/>

                <meta property="og:description" content={"og:Seja bem-vindo ao seu destino online para oportunidades incríveis em Moçambique. Estamos aqui para conectar você com as melhores vagas de emprego, estágios, oportunidades de formação e muito mais."}/>
             </Helmet>    
            <HeaderEmprego/>
            <EmpregoIntroducao query={query} handleInputChange={handleInputChange}/>
            <section className='SiteLink'>
                <img src={SiteLink} alt="LINK DO SITE" />
            </section>
            <OportunidadesEmprego/>
            <CarreiraEmprego/>
            <FormarEmprego/>
            <EmpregadoresEmprego/>
            
            <section className='RelatorioEmprego'>
               

                <article className='RelatorioEmpregoTexto'>
                    <h2>
                    Novo: Relatório de habilidades das indústrias de 2024
                    </h2>
                    <p>Os Relatórios de Habilidades da <span className='RelatorioBold'>oportunidade.co.mz</span> exploram tendências de habilidades em todo o mundo, ajudando líderes em educação superior, negócios e governo a aprender quais habilidades são essenciais para o futuro do trabalho. Por meio da metodologia de dados exclusiva do oportunidade.co.mz, os relatórios avaliam as proficiências de habilidades em negócios, tecnologia e ciência de dados.</p>

                    <Link>
                    <p>Obter Relatório</p>
                   
                    </Link>
                </article>
            </section>
            <FooterEmprego/>
       </div>
          )
        }  
        </>
            
    )
}
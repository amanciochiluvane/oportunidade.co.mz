import './VagaEmprego.css'
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import VagasSeccao from '../../componentes/PagVagaEmprego/VagasSeccao/VagasSeccao'
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego' 
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet/es/Helmet'

export default function VagaEmprego() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mensagemAparecer, setMensagemAparecer] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14;

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    }

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const [jobs, setJobs] = useState([]);
    

    //// filter by job title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    //// radio filter
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }
    const handleChangeHandle = (valor) => {
        setSelectedCategory(valor);
    }

    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    }

    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;

        if (query) {
            filteredJobs = filteredItems;
        }
        if (selected) {
            filteredJobs = filteredJobs.filter(({ location, companyType, category, employmentType, experiencelevel }) => (
                (location && location.toLowerCase() === selected.toLowerCase()) ||
                (companyType && companyType.toLowerCase() === selected.toLowerCase()) ||
                (category && category.toLowerCase() === selected.toLowerCase()) ||
                (employmentType && employmentType.toLowerCase() === selected.toLowerCase()) ||
                (experiencelevel && experiencelevel.toLowerCase() === selected.toLowerCase())
            ));
        }
        const { startIndex, endIndex } = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex, endIndex);
        return filteredJobs;
    }

    const result = filteredData(jobs, selectedCategory, query);
    const resultLength = result.length;
    useEffect(() => {
        if (resultLength === 0) {
            setMensagemAparecer("Nenhuma Vaga Encontrada");
        } else {
            setMensagemAparecer("");
        }
    }, [resultLength]);
    
    useEffect(() => {
        setMensagemAparecer("Procurando Vagas ...");
        fetch(`${import.meta.env.VITE_APP_BACKEND}/todasvagas`).then(res => res.json()).then(data => {
            setJobs(data);
            

            
        })
    }, [])
    
    
    return (
        <div className="VagaEmprego">

            <Helmet>
                <title>Vagas de Emprego</title>
                <meta name="description" content={"Descubra oportunidades de carreira emocionantes e alavanque sua trajetória profissional com as vagas disponíveis no Oportunidade.co.mz. Nossa plataforma oferece acesso a uma vasta gama de oportunidades de emprego em Moçambique, em diversos setores e níveis de experiência."}/>
                <meta property="og:title" content={"og: Vagas"}/>

                <meta property="og:description" content={"og:Descubra oportunidades de carreira emocionantes e alavanque sua trajetória profissional com as vagas disponíveis no Oportunidade.co.mz. Nossa plataforma oferece acesso a uma vasta gama de oportunidades de emprego em Moçambique, em diversos setores e níveis de experiência."}/>
             </Helmet> 

            <HeaderEmprego />

            <VagasSeccao query={query} handleInputChange={handleInputChange} result={result} handleChange={handleChange} handleClick={handleClick} resultLength={resultLength} mensagemAparecer={mensagemAparecer}/>

            {resultLength>0?(
          <>
            <div className='PaginationVagas'>
                <button onClick={prevPage} disabled={currentPage===1}>Anterior</button>
                <span>Página {currentPage} de {Math.ceil(filteredItems.length / itemsPerPage)} </span>
                <button onClick={nextPage} disabled={currentPage===Math.ceil(filteredItems.length/itemsPerPage)}>Próximo</button>
            </div>
          </>
        ):""}

            <FooterEmprego />
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import './RecrutadorCandidatos.css';
import c1 from '../../../assets/c1.png';
import c2 from '../../../assets/c2.png';
import { Link } from 'react-router-dom';
import Filtros from '../../../assets/Filtros.png';
import lupa from '../../../assets/LupaBlack.png';
import setavoltar from '../../../assets/SetaVoltar.png';
import setavoltar2 from '../../../assets/SetaVoltar2.png';

export default function RecrutadorCandidatos() {
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtros, setFiltros] = useState(false);
    const [applicantsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        provincia: '',
        industria: '',
        experiencia: ''
    });

    useEffect(() => {
        fetchApplicants();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, searchTerm, applicants, currentPage]);

    const fetchApplicants = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/candidatos`);
            if (!response.ok) {
                throw new Error('Erro ao buscar candidatos');
            }
            const data = await response.json();
            setApplicants(data);
            setFilteredApplicants(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching applicants:", error);
        }
    };

    const applyFilters = () => {
        let filtered = applicants;

        if (filters.provincia) {
            filtered = filtered.filter(applicant => applicant.candidatoProvincia === filters.provincia);
        }

        if (filters.industria) {
            filtered = filtered.filter(applicant => applicant.candidatoIndustria === filters.industria);
        }

        if (filters.experiencia) {
            filtered = filtered.filter(applicant => applicant.candidatoAnosExperiencia === filters.experiencia);
        }

        if (searchTerm) {
            filtered = filtered.filter(applicant =>
                applicant.candidatoFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.candidatoLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.candidatoEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredApplicants(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
        setFilters({
            provincia: '',
            industria: '',
            experiencia: ''
        });
        setSearchTerm('');
    };

    const indexOfLastApplicant = currentPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const showfilters = () => {
        setFiltros(!filtros);
    };

    return (
        <div className='Dashboard'>
            <section className='RecrutadorCandidatosDiv'>
                <div>
                    <div className={filtros ? 'FiltrosCandidatos2' : 'FiltrosCandidatos'} onClick={showfilters}>
                        <img src={Filtros} alt="Ícone de Filtros" />
                        <p>Filtros</p>
                    </div>

                    <div className={filtros ? 'filtrosOn' : 'filtrosOff'}>
                        <section>
                            <article>
                                <div>
                                    <p>Localização:</p>
                                    <select name="provincia" value={filters.provincia} onChange={handleFilterChange}>
                                        <option value="">Todas</option>
                                        <option value="Cidade de Maputo">Cidade de Maputo</option>
                                        <option value="Maputo Provincia">Maputo Provincia</option>
                                        <option value="Gaza">Gaza</option>
                                        <option value="Inhambane">Inhambane</option>
                                        <option value="Sofala">Sofala</option>
                                        <option value="Manica">Manica</option>
                                        <option value="Tete">Tete</option>
                                        <option value="Zambezia">Zambezia</option>
                                        <option value="Nampula">Nampula</option>
                                        <option value="Cabo Delgado">Cabo Delgado</option>
                                        <option value="Niassa">Niassa</option>
                                    </select>
                                </div>

                                <div>
                                    <p>Indústria:</p>
                                    <select name="industria" value={filters.industria} onChange={handleFilterChange}>
                                        <option value="">Todas</option>
                                        <option value="Agricultura">Agricultura</option>
                                        <option value="Tecnologia">Tecnologia</option>
                                        <option value="Construção">Construção</option>
                                        <option value="Educação">Educação</option>
                                        <option value="Saúde">Saúde</option>
                                        <option value="Financeiro">Financeiro</option>
                                        <option value="Mecânica">Mecânica</option>
                                        <option value="Energia">Energia</option>
                                        <option value="Transporte">Transporte</option>
                                    </select>
                                </div>

                                <div>
                                    <p>Experiência:</p>
                                    <select name="experiencia" value={filters.experiencia} onChange={handleFilterChange}>
                                        <option value="">Todas</option>
                                        <option value="SemExperiencia">Sem Experiência</option>
                                        <option value="Estagio">Estágio e Recém-formado</option>
                                        <option value="Executivo">Executivo</option>
                                        <option value="Senior">Sênior</option>
                                        <option value="Medio">Médio</option>
                                    </select>
                                </div>
                            </article>
                            <button onClick={clearFilters}>Apagar tudo</button>
                        </section>
                    </div>

                    <div className='SearchCandidatos'>
                        <label htmlFor="PesquisarCandidatos"><img src={lupa} alt="Ícone de Lupa" /></label>
                        <input type="text" placeholder='Pesquisar candidatos' id='PesquisarCandidatos' value={searchTerm} onChange={handleSearchChange} />
                    </div>
                </div>

                <h2 className='TituloCandidatos'>Candidatos</h2>

                {isLoading ? (
                    <h3>Procurando Candidatos ...</h3>
                ) : (
                    <>
                        {filteredApplicants.length === 0 ? (
                            <h3>Nenhum candidato encontrado!</h3>
                        ) : (
                            <article>
                                {currentApplicants.map(applicant => (
                                    <div key={applicant._id}>
                                        <div>
                                            <img src={applicant.candidatoFotoPerfil || c1} alt="Foto do Candidato" />
                                            <h2>{applicant.candidatoFirstName} {applicant.candidatoLastName}</h2>
                                        </div>
                                        
                                        <p>{applicant.candidatoEmail}</p>
                                        <div>
                                            <Link to={`/ver-perfil-candidato/${applicant._id}`}>Ver Perfil</Link>
                                            <Link to={applicant.candidatoCV}>Ver CV</Link>
                                        </div>
                                    </div>
                                ))}
                            </article>
                        )}
                    </>
                )}

                <section className='MaisCandidatos'>
                    <div onClick={prevPage}>
                        <img src={setavoltar} alt="Seta Voltar" />
                        <p>Anterior</p>
                    </div>

                    <div onClick={nextPage}>
                        <p>Seguinte</p>
                        <img src={setavoltar2} alt="Seta Voltar 2" />
                    </div>
                </section>
            </section>
        </div>
    );
}

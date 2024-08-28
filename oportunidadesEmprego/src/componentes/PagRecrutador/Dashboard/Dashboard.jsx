import './RecrutadorCandidatos.css';
import './Dashboard.css';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lupa from '../../../assets/LupaBlack.png';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { currentUser } = useSelector((state) => state.user);
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_APP_BACKEND}/minhasVagas/${currentUser.usuário.recruterEmail}`)
            .then((res) => res.json())
            .then(async (data) => {
                const jobsWithApplications = await Promise.all(data.map(async (job) => {
                    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/candidaturas/${job._id}`);
                    const applications = await response.json();
                    return { ...job, numApplications: applications.numCandidaturas };
                }));
                setJobs(jobsWithApplications);
                setIsLoading(false);
            });
    }, [currentUser.usuário.recruterEmail]);

    const handleSearch = () => {
        const filter = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        setJobs(filter);
        setIsLoading(false);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja apagar esta vaga?");
        if (confirmDelete) {
            fetch(`${import.meta.env.VITE_APP_BACKEND}/vaga/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    window.location.reload();
                });
        }
    };

    return (
        <div className='Dashboard'>
            <section className='RecrutadorCandidatosDiv'>
                <div>
                    <div className='SearchCandidatos'>
                        <label htmlFor="PesquisarCandidato"><img src={lupa} onClick={handleSearch} /></label>
                        <input type="text" placeholder='Pesquisar Vagas' id='PesquisarCandidato' onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                </div>
                <h2 className='TituloCandidatos'>Minhas Vagas</h2>
                <article>
                    {isLoading ? (<p>Processando ...</p>) : jobs.length > 0 ? (
                        <>
                            {jobs.map((job, index) => (
                                <div key={index}>
                                    <div>
                                        <img src={job.companyLogo} alt="Logo da empresa" />
                                        <h2>{job.jobTitle}</h2>
                                    </div>
                                    <p className='EsspecialJob'>{job.location}</p>
                                    <p className='EsspecialJob'>Candidaturas: <span style={{ backgroundColor: '#652ebe', color: 'white', borderRadius: "20px", padding: "5px" }}>{job.numApplications}</span></p>
                                    <div>
                                        <button onClick={() => handleDelete(job._id)}>Apagar</button>
                                        <Link to={`/actualizar-vaga/${job._id}`}>Editar</Link>
                                        <Link to={`/candidaturas-vaga/${job._id}`}>Candidaturas</Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (<p style={{ fontSize: "14px" }}>Nenhuma vaga encontrada!</p>)}
                </article>
            </section>
        </div>
    );
}


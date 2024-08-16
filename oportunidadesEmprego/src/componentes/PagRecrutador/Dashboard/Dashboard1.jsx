import './RecrutadorCandidatos.css';
import './Dashboard.css';

import { Link,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lupa from '../../../assets/LupaBlack.png';

import { useEffect, useState } from 'react';

export default function Dashboard1() {
    const { currentUser } = useSelector((state) => state.user);
    const [jobs, setJobs] = useState([]);
   
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { idVaga } = useParams();
   

    
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/minhasVagas/${currentUser.usuário.recruterEmail}`)
            .then((res) => res.json())
            .then(async (data) => {
                // Loop through each job to fetch the data of candidates
                const jobsWithData = await Promise.all(data.map(async (job) => {
                    const response = await fetch(`http://localhost:5000/candidatos-vaga/${idVaga}`);
                    const candidates = await response.json();
                    setJobs(candidates)
                    
                
                    return {  candidates };
                }));
               
                
              
                setIsLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filter = jobs.filter((job) => job.candidatoFirstName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        setJobs(filter);
        setIsLoading(false);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/vaga/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                window.location.reload();
            });
    };

    return (
        <div className='Dashboard' >
            <section className='RecrutadorCandidatosDiv'>
                <div>
                    <div className='SearchCandidatos'>
                        <label htmlFor="PesquisarCandidato"><img src={lupa} onClick={handleSearch} /></label>
                        <input type="text" placeholder='Pesquisar Candidatos' id='PesquisarCandidato' onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                </div>
                <h2 className='TituloCandidatos'>Candidatos a vaga</h2>
                <article>
                    {isLoading ? (<p>Processando ...</p>) : jobs.length > 0 ? (
                        <>
                             
                            {jobs.map((job, index) => (
                                
                                <div key={index}>
                                   {console.log(job)}
                                    <div>
                                        <img src={job.candidatoFotoPerfil} />
                                        <h2>{job.candidatoFirstName}{" "}{job.candidatoLastName}</h2>
                                    </div>
                                    <p className='EsspecialJob'>{job.candidatoEmail}</p>
                                    <p className='EsspecialJob'>{job.candidatoProvincia}</p>
                                    <div>
                                       
                                        <Link to={`/ver-perfil-candidato/${job._id}`} >Ver perfil</Link>
                                    </div>
                                    
                                </div>
                            ))}
                        </>
                    ) : (<p style={{ fontSize: "14px" }}>Nenhum candidato encontrado!</p>)}
                </article>
            </section>
        </div>
    );
}

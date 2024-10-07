import { Link } from "react-router-dom" 
import './EmpregoDescricao.css'
import SetaVoltar from '../../assets/SetaVoltar.png';
import { useEffect, useState} from "react";
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import de1 from "../../assets/de1.png"
import de2 from "../../assets/de2.png"
import de3 from "../../assets/de3.png"
import de4 from "../../assets/de4.png"

export default function EmpregoDescricao({onClose,vagaIdd,jobTitle,description,companyLogo,companyName,location,responsabilities,positions,employmentType,experiencelevel,requirements}){
    const [requirementsArray, setRequirementsArray] = useState([]);
    const [responsabilitiesArray, setResponsabilitiesArray] = useState([]);

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    const candidatarSe = async (vagaIdd) => {
        try {
          // Verificar se o usuário está autenticado
          if (!currentUser) {
            alert('Deves ser um candidato para candidatar-se!');
            // Se não estiver autenticado, redirecionar para a página de login
            navigate("/escolher-tipo-login/candidato");
            return;
          }
          else{

         
          if (currentUser.usuário.recruterName) {
            alert('Deves ser um candidato para candidatar-se!');
            // Se não estiver autenticado, redirecionar para a página de login
            navigate("/escolher-tipo-login/candidato");
            return;
          }
          
          const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/candidatar-se`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${currentUser.token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ vagaIdd, candidatoId: currentUser.usuário._id }),
          });
    
          if (response.status === 201) {
            alert('Candidatura realizada com sucesso!');
          } else {
            alert('Erro ao candidatar-se. Por favor, tente novamente.');
          }
        }
        } catch (error) {
          alert('Erro ao candidatar-se. Por favor, tente novamente.');
        }
      };

    useEffect(() => {
        // Verifica se requirements é uma string antes de chamar split()
        if (typeof requirements === 'string' && typeof responsabilities === 'string') {
            const requirementsArray = requirements.split('\n');
            const responsabilitiesArray = responsabilities.split('\n');
            setRequirementsArray(requirementsArray);
            setResponsabilitiesArray(responsabilitiesArray);
        }
    }, [requirements,responsabilities]);

    
    return(
        <div className="EmpregoDescricao">
             <div className='VagaExplicacao2'>
                <article className="IntroVagaEmpregoDescricao">

                </article>
                    <img loading="lazy"className="IntroVagaEmpregoDescricaoCompanyLogo" src={companyLogo} />

                <article className="JOBSDetalhes">
                  <h2>{jobTitle}</h2>
                  <p>{companyName}</p>
                  
                </article>

                        <article className='IntroVaga2'>
                            
                                <div>
                                      
                                  <article className='DetalhesVaga2'>
                                    <article>
                                        <div>
                                          <img loading="lazy"src={de1} alt="" />
                                          <p>Localização do trabalho</p>
                                        </div>
                                        <p>{location}</p>
                                    </article>

                                    <article>
                                        <div>
                                          <img loading="lazy"src={de2} alt="" />
                                          <p>Posições</p>
                                        </div>
                                        <p>{positions}</p>
                                    </article>

                                    <article>
                                        <div>
                                          <img loading="lazy"src={de3} alt="" />
                                          <p>Tipo de trabalho</p>
                                        </div>
                                        <p>{employmentType}</p>
                                    </article>

                                    
                                    <article>
                                        <div>
                                          <img loading="lazy"src={de4} alt="" />
                                          <p>Nivel de Experiência</p>
                                        </div>
                                        <p>{experiencelevel}</p>
                                    </article>


                                    
                                            </article>
                                </div>
                        </article>
                                   
                        <article className='OverwiewVaga2'>
                                        <Link className='CandidatarVaga2'>
                                        <button  onClick={() => candidatarSe(vagaIdd)} >Candidatar-me</button>
                                        </Link>
                                       

                                    </article>       

                                    <article className='DescricaoVaga2'>
                                    <h2>
                                      Descrição da vaga          
                                          </h2>
                                        <p>{description}</p>
                                    </article>

                                        <article className='DescricaoVaga22'>
                                          <h2>
                                              Responsabilidades
                                          </h2>
                                          <p>
                                            <ul type="bullet">
                                            {responsabilitiesArray.map((item,index)=> (
                                                <li key={index}>{item}</li>
                                            ))}
                                            </ul>
                                          </p>
                                        </article>

                                        <article className='DescricaoVaga22'>
                                          <h2>
                                              Requisitos
                                          </h2>
                                          <p>
                                            <ul type="none">
                                            {requirementsArray.map((item,index)=> (
                                                <li key={index}>{item}</li>
                                            ))}
                                            </ul>
                                          </p>
                                        </article>

                                    

                                    

                                    

                                    <Link to="#" className="VoltarEmprego" onClick={onClose}>
                                        <img loading="lazy"src={SetaVoltar} />
                                        <p>Voltar</p>
                                    </Link>
                                </div>
        </div>
    )
}
import { Link } from "react-router-dom" 
import './EmpregoDescricao.css'
import SetaVoltar from '../../assets/SetaVoltar.png';
import { useEffect, useState} from "react";
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

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
          
          const response = await fetch('http://localhost:5000/candidatar-se', {
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
                                    <article className='IntroVaga2'>
                                        <img src={companyLogo} />
                                        <div>
                                            <h2>{jobTitle}</h2>
                                            <article className='DetalhesVaga2'>
                                            <button className='DetalhesVermelho2'>{employmentType}</button>
                                            <button className='DetalhesAzulEscuro2'>{location}</button>
                                            <button className='DetalhesVerde2'>Posições: {positions} </button>
                                            
                                            </article>
                                        </div>
                                    </article>
                                    <article  className="LinksDetalhesDescricao">
                                        <Link>
                                        Descrição da Vaga
                                        </Link>

                                        
                                    </article>
                                    
                                  

                                    <article className='DescricaoVaga2'>
                                     
                                        <p>{description}</p>

                                        <h2>
                                            Responsabilidades
                                        </h2>

                                        <ul type="none">
                                        {responsabilitiesArray.map((item,index)=> (
                                            <li key={index}>{item}</li>
                                        ))}
                                        </ul>

                                        <h2>
                                            Requisitos
                                        </h2>
                                        <ul type="none">
                                        {requirementsArray.map((item,index)=> (
                                            <li key={index}>{item}</li>
                                        ))}
                                        </ul>

                                    </article>

                                    

                                    <article className='OverwiewVaga2'>
                                        <Link className='CandidatarVaga2'>
                                        <button  onClick={() => candidatarSe(vagaIdd)} >Candidatar-me</button>
                                        </Link>
                                       

                                    </article>

                                    <Link to="#" className="VoltarEmprego" onClick={onClose}>
                                        <img src={SetaVoltar} />
                                        <p>Voltar</p>
                                    </Link>
                                </div>
        </div>
    )
}
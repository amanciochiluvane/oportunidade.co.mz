/* eslint-disable react/prop-types */
import './VagasSeccao.css'
import Ver from '../../../assets/Ver.png'
import Ver2 from '../../../assets/Ver2.png'
import { useState,useEffect } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import CurtirVaga from '../CurtirVaga/CurtirVaga'
import Email from '../../../assets/Email.png'
import BannerVodacom from '../../../assets/BannerVodacom.png'
import EmpregoDescricao from '../../EmpregoDescricao/EmpregoDescricao'
import Lupa from '../../../assets/LupaBlack.png'
import InscritoSucesso from '../../InscritoSucesso/InscritoSucesso'
import { useSelector} from 'react-redux';
import filtros from "../../../assets/Filtros.png"
import f1 from "../../../assets/f1.png"
import f2 from "../../../assets/f2.png"
import f3 from "../../../assets/f3.png"
import f4 from "../../../assets/f4.png"

export default function VagasSeccao({query,handleInputChange,result,handleChange,handleClick,resultLength,mensagemAparecer}){
    const [menuFiltro,setMenuFiltro]=useState(false);

    function mostrarFiltros(){
        setMenuFiltro(!menuFiltro);
    }
    
    const [menuItem1,setMenuItem1]=useState(false);
    const [menuItem2,setMenuItem2]=useState(false);
    const [menuItem3,setMenuItem3]=useState(false);
   
    const [menuItem5,setMenuItem5]=useState(false);

    function mostrarItem1(){
        setMenuItem1(!menuItem1);
    }
    function mostrarItem2(){
        setMenuItem2(!menuItem2);
    }
    function mostrarItem3(){
        setMenuItem3(!menuItem3);
    }
   
    function mostrarItem5(){
        setMenuItem5(!menuItem5);
    }

    const [mostrarPopup222, setMostrarPopup222] = useState(null);
    const [mostrarPopup, setMostrarPopup] = useState(null); // Estado para controlar qual vaga tem o pop-up aberto
    const [controlarPoup,setControlarPoup]=useState(false);
    // Função para abrir o pop-up da vaga específica
    const [controlarPoup2,setControlarPoup2]=useState(false);
    const abrirPopup = (index) => {
        setMostrarPopup(index);
        setMostrarPopup222(null);
        setControlarPoup(true);
    };
    const abrirPopup2 = (index2) => {
        setMostrarPopup(null);
        setMostrarPopup222(index2);
        setControlarPoup2(true);
    };

    // Função para fechar o pop-up
    const fecharPopup = () => {
       
        setMostrarPopup(null);
        setControlarPoup(false);

    };
    const fecharPopup2 = () => {
        setMostrarPopup222(null);
        setControlarPoup2(false);
        setMostrarPopup(null);
        setControlarPoup(false);
    };

    function handleClick2(){
        setMenuItem1(false);
        setMenuItem2(false);
        setMenuItem3(false);
        setMenuItem5(false);
    }


    const [mostrarPopup2, setMostrarPopup2] = useState(false);
    const [mostrarDiv,setMostrarDiv]=useState(false);

    const togglePopup2 = () => {
        setMostrarPopup2(!mostrarPopup2);
    };

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMostrarDiv(window.innerWidth >= 600);
        const handleResize = () => {
            // Verifica o tamanho da tela e decide qual div de vaga explicação exibir
            setMostrarDiv(window.innerWidth >= 600);
        };

        // Adiciona um event listener para verificar o redimensionamento da tela
        window.addEventListener('resize', handleResize);

        // Remove o event listener no cleanup do useEffect
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const candidatarSe = async (vagaId) => {
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
            body: JSON.stringify({ vagaId, candidatoId: currentUser.usuário._id }),
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
        // Simule o atraso de carregamento
        const timer = setTimeout(() => {
          setIsLoading(false); // Defina o carregamento como concluído após 600ms
        }, 3000);
    
        // Limpar o timer se o componente for desmontado
        return () => clearTimeout(timer);
      }, []);
     

    return(
        <div className="VagasSeccao">
            <section className='VagasSeccaoSection'>

           
            
            
            <aside className={menuFiltro?"VagasSeccaoFiltros visivel":"VagasSeccaoFiltros invisivel"}>

           

               <div className='TituloFiltroVagas'>
                    <h2>Filtro de Vagas</h2> 
                    
               </div> 

               <div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f1} />
        <h3 >Tipo de Companhia</h3>
        
    </article>
    
    <article className={"FiltroTipoDetalhes"} id='FiltroTipoDetalhesEspecial'>
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Startup" onChange={handleChange} id="Startup" />
            <p>Startup</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Estrangeira" onChange={handleChange} id="Estrangeira" />
            <p>Estrangeira</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Nacional" onChange={handleChange} id="Nacional" />
            <p>Nacional</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Corporativa" onChange={handleChange} id="Corporativa" />
            <p>Corporativa</p>
        </div>

       
    </article>
</div>



<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f2} />
        <h3 >Localização</h3>
       
    </article>
    
    <article className={"FiltroTipoDetalhes" } id="FiltroTipoDetalhesEspecial">
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Maputo" onChange={handleChange} id="Maputo" />
            <p>Maputo</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Gaza" onChange={handleChange} id="Gaza" />
            <p>Gaza</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Inhambane" onChange={handleChange} id="Inhambane" />
            <p>Inhambane</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Sofala" onChange={handleChange} id="Sofala" />
            <p>Sofala</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Manica" onChange={handleChange} id="Manica" />
            <p>Manica</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Tete" onChange={handleChange} id="Tete" />
            <p>Tete</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Zambezia" onChange={handleChange} id="Zambezia" />
            <p>Zambezia</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Nampula" onChange={handleChange} id="Nampula" />
            <p>Nampula</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Cabo Delgado" onChange={handleChange} id="CaboDelgado" />
            <p>Cabo Delgado</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Niassa" onChange={handleChange} id="Niassa" />
            <p>Niassa</p>
        </div>
    </article>
</div>


<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f3}/>
        <h3 >Indústria</h3>
        
       
    </article>
    
    <article className={"FiltroTipoDetalhes"} id="FiltroTipoDetalhesEspecial">
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Agricultura" onChange={handleChange} id="Agricultura" />
            <p>Agricultura</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Tecnologia" onChange={handleChange} id="Tecnologia" />
            <p>Tecnologia</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Construção" onChange={handleChange} id="Construção" />
            <p>Construção</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Educação" onChange={handleChange} id="Educação" />
            <p>Educação</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Saúde" onChange={handleChange} id="Saúde" />
            <p>Saúde</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Financeiro" onChange={handleChange} id="Financeiro" />
            <p>Financeiro</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Mecânica" onChange={handleChange} id="Mecânica" />
            <p>Mecânica</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Energia" onChange={handleChange} id="Energia" />
            <p>Energia</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Transporte" onChange={handleChange} id="Transporte" />
            <p>Transporte</p>
        </div>
    </article>
</div>


  
<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f4}  />
        <h3 onClick={mostrarItem5}>Nível de Experiência</h3>
       
    </article>
    
    <article className="FiltroTipoDetalhes" >
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="SemExperiência" onChange={handleChange} id="SemExperiência" />
            <p>Sem Experiência</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Estágio" onChange={handleChange} id="Estágio" />
            <p>Estágio e Recém-formado</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Executivo" onChange={handleChange} id="Executivo" />
            <p>Executivo</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Sênior" onChange={handleChange} id="Sênior" />
            <p>Sênior</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Médio" onChange={handleChange} id="Médio" />
            <p>Médio</p>
        </div>
    </article>
</div>
            </aside>

            </section>
                
        
            <section className='SubMain'>
                    <section className='SubMain1'>
                    
            <aside className={"VagasSeccaoFiltros visivel"}>



<div className='TituloFiltroVagas'>
     <h2>Filtro de Vagas</h2> 
     
</div> 


<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f1} />
        <h3 >Tipo de Companhia</h3>
        
    </article>
    
    <article className={"FiltroTipoDetalhes"} id='FiltroTipoDetalhesEspecial'>
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Startup" onChange={handleChange} id="Startup" />
            <p>Startup</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Estrangeira" onChange={handleChange} id="Estrangeira" />
            <p>Estrangeira</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Nacional" onChange={handleChange} id="Nacional" />
            <p>Nacional</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="tipoCompanhia" value="Corporativa" onChange={handleChange} id="Corporativa" />
            <p>Corporativa</p>
        </div>

       
    </article>
</div>



<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f2} />
        <h3 >Localização</h3>
       
    </article>
    
    <article className={"FiltroTipoDetalhes" } id="FiltroTipoDetalhesEspecial">
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Maputo" onChange={handleChange} id="Maputo" />
            <p>Maputo</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Gaza" onChange={handleChange} id="Gaza" />
            <p>Gaza</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Inhambane" onChange={handleChange} id="Inhambane" />
            <p>Inhambane</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Sofala" onChange={handleChange} id="Sofala" />
            <p>Sofala</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Manica" onChange={handleChange} id="Manica" />
            <p>Manica</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Tete" onChange={handleChange} id="Tete" />
            <p>Tete</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Zambezia" onChange={handleChange} id="Zambezia" />
            <p>Zambezia</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Nampula" onChange={handleChange} id="Nampula" />
            <p>Nampula</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Cabo Delgado" onChange={handleChange} id="CaboDelgado" />
            <p>Cabo Delgado</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="localizacao" value="Niassa" onChange={handleChange} id="Niassa" />
            <p>Niassa</p>
        </div>
    </article>
</div>


<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f3}/>
        <h3 >Indústria</h3>
        
       
    </article>
    
    <article className={"FiltroTipoDetalhes"} id="FiltroTipoDetalhesEspecial">
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Agricultura" onChange={handleChange} id="Agricultura" />
            <p>Agricultura</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Tecnologia" onChange={handleChange} id="Tecnologia" />
            <p>Tecnologia</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Construção" onChange={handleChange} id="Construção" />
            <p>Construção</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Educação" onChange={handleChange} id="Educação" />
            <p>Educação</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Saúde" onChange={handleChange} id="Saúde" />
            <p>Saúde</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Financeiro" onChange={handleChange} id="Financeiro" />
            <p>Financeiro</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Mecânica" onChange={handleChange} id="Mecânica" />
            <p>Mecânica</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Energia" onChange={handleChange} id="Energia" />
            <p>Energia</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="industria" value="Transporte" onChange={handleChange} id="Transporte" />
            <p>Transporte</p>
        </div>
    </article>
</div>


  
<div>
    <article className='FiltroTipo'>
        <img loading="lazy"src={f4}  />
        <h3 onClick={mostrarItem5}>Nível de Experiência</h3>
       
    </article>
    
    <article className="FiltroTipoDetalhes" >
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="SemExperiência" onChange={handleChange} id="SemExperiência" />
            <p>Sem Experiência</p>
        </div>
        
        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Estágio" onChange={handleChange} id="Estágio" />
            <p>Estágio e Recém-formado</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Executivo" onChange={handleChange} id="Executivo" />
            <p>Executivo</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Sênior" onChange={handleChange} id="Sênior" />
            <p>Sênior</p>
        </div>

        <div className='FiltroTipoDetalhesCheck' >
            <input type="radio" name="experiencia" value="Médio" onChange={handleChange} id="Médio" />
            <p>Médio</p>
        </div>
    </article>
</div>

                         </aside>

           
            <section>
            <section className='PesquisaDaVaga'>
                <h2>Descubra aqui a sua carreira ideal</h2>
                <p>Explore oportunidades que atendam aos seus interesses para alcançar a carreira que deseja</p>
                <div>
                    <label className='PesquisarVagasLabel' htmlFor="PesquisarVagas"><img loading="lazy"src={Lupa} alt="Lupa Pesquisar"/></label>
                    <input type="text" placeholder='Pesquise por vagas' id='PesquisarVagas' onChange={handleInputChange} value={query}/>

                    <div className={menuFiltro?"VagasSeccaoMostrarFiltros sombra":"VagasSeccaoMostrarFiltros normal"} onClick={mostrarFiltros}>
                    <img loading="lazy"src={filtros} />
                <p>Filtros</p>
            </div>
                </div>
                

            </section> 
            <p className='VagasEncontradasText'>Exibindo <span>{resultLength}</span> vagas encontradas</p>

            {mensagemAparecer == "Procurando Vagas ..."  ? (
        <section className='SubMain1Vagas'> <h3 className='MensagemAparecer'>{mensagemAparecer}</h3> </section>
      ):(
        mensagemAparecer == "" ?(
            <section className='SubMain1Vagas'>
            {result.slice(0, 15).reverse().map((job, index) => (
                <div key={index} className={mostrarDiv ? 'VagaExplicacao' : 'VagaExplicacao22224'}>
                    <article className='IntroVaga' onClick={() => abrirPopup(index)}>
                        <img loading="lazy"src={job.companyLogo} alt={job.companyName} />
                        <div>
                            <h2>{job.companyName}</h2>
                            <p>{mostrarDiv ? job.location : job.jobTitle}</p>
                        </div>
                    </article>

                    <article className='DescricaoVaga'>
                               <h2>{job.jobTitle}</h2>
                            {/*<p>{job.description}</p> */ } 
                           </article>
   
                           <article className='OverwiewVaga'>
                               
                               <Link className='VerDetalhesVaga'>
                               <button  onClick={() => abrirPopup(index)}>
                                   Ver Detalhes
                               </button>
                               </Link>
                              
                           </article>

                    {mostrarPopup === index && (
                        <div className={controlarPoup ? 'visible' : 'invisible'}>
                            <EmpregoDescricao
                                onClose={fecharPopup}
                                vagaIdd={job._id}
                                jobTitle={job.jobTitle}
                                description={job.description}
                                companyLogo={job.companyLogo}
                                companyName={job.companyName}
                                location={job.location}
                                responsabilities={job.responsabilities}
                                positions={job.positions}
                                employmentType={job.employmentType}
                                experiencelevel={job.experiencelevel}
                                requirements={job.requirements}
                            />
                        </div>
                    )}
                </div>
           ) )}
        </section>
      ):(<section className='SubMain1Vagas'> <h3 className='MensagemAparecer'>{mensagemAparecer}</h3> </section>))}

      </section>

     
     
         </section>   
         </section>  

            <div className={mostrarPopup2?'visible':'invisible'}>
                <InscritoSucesso onCloseSucesss={togglePopup2}/>
            </div>
        
        </div>
    )
            }
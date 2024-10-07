import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import { Link } from 'react-router-dom'
import candidatofoto from '../../assets/seeker.svg'
import empregadorfoto from '../../assets/employer.svg'
import './EscolherTipo.css'
import { Helmet } from 'react-helmet/es/Helmet'

export default function EscolherTipoLogin(){
    return(
        <div className="EscolherTipo">
            <HeaderEmprego/>
            <Helmet>
                <title>Escolher Tipo</title>
                
             </Helmet>

            <h2>Login na conta</h2>

            <section>
                <Link to="/escolher-tipo-login/candidato" className="CandidatoEscolhaConta">
                        <img loading="lazy"src={candidatofoto} />

                        <h2>Candidato</h2>
                        <p>Está a procura da sua vaga dos sonhos?</p>
                        <p>Crie uma conta com a oportunidades.co.mz</p>

                        <Link to="/escolher-tipo-login/candidato">
                            <button>Login como Candidato</button>
                        </Link>
                </Link>

                <Link to="/escolher-tipo-login/recrutador" className="EmpregadorEscolhaConta">
                <img loading="lazy"src={empregadorfoto} />

                        <h2>Recrutador</h2>
                        <p>Está a procura de talentos qualificados?</p>
                        <p>Crie uma conta com a oportunidades.co.mz</p>

                        <Link to="/escolher-tipo-login/recrutador">
                            <button>Login como Recrutador</button>
                        </Link>
                </Link>
            </section>
        </div>
    )
}
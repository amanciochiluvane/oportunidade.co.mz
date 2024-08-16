import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import { Link } from 'react-router-dom'
import candidatofoto from '../../assets/seeker.svg'
import empregadorfoto from '../../assets/employer.svg'
import './EscolherTipo.css'
import { Helmet } from 'react-helmet/es/Helmet'

export default function EscolherTipo(){
    return(
        <div className="EscolherTipo">

            <Helmet>
                <title>Escolher Tipo</title>
                
             </Helmet>
            <HeaderEmprego/>

            <h2>Crie sua Conta</h2>

            <section>
                <Link to="/criarcontaCandidato" className="CandidatoEscolhaConta">
                        <img src={candidatofoto} />

                        <h2>Candidato</h2>
                        <p>Está a procura da sua vaga dos sonhos?</p>
                        <p>Crie uma conta com a oportunidades.co.mz</p>

                        <Link>
                            <button>Sign up como Candidato</button>
                        </Link>
                </Link>

                <Link to="/criarcontaRecrutador" className="EmpregadorEscolhaConta">
                <img src={empregadorfoto} />

                        <h2>Recrutador</h2>
                        <p>Está a procura de talentos qualificados?</p>
                        <p>Crie uma conta com a oportunidades.co.mz</p>

                        <Link>
                            <button>Sign up como Recrutador</button>
                        </Link>
                </Link>
            </section>
        </div>
    )
}
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import './TrabalheConnosco.css'
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego'
import { Helmet } from 'react-helmet/es/Helmet'
export default function TrabalheConnosco(){
    return(
        <div className="TrabalheConnosco">

            <Helmet>
                <title>Trabalhe Connosco</title>
                <meta name="description" content={"Estamos à procura de profissionais talentosos e motivados para se juntarem à nossa equipe! Se você busca um ambiente de trabalho dinâmico, oportunidades de crescimento e um espaço onde suas ideias são valorizadas, queremos conhecer você."}/>
                <meta property="og:title" content={"og: Trabalhe Connosco"}/>

                <meta property="og:description" content={"og:Estamos à procura de profissionais talentosos e motivados para se juntarem à nossa equipe! Se você busca um ambiente de trabalho dinâmico, oportunidades de crescimento e um espaço onde suas ideias são valorizadas, queremos conhecer você."}/>
             </Helmet> 

            <HeaderEmprego/>

            <section>
                <div className='TextoTrabalheConnosco'>
                    <h2>Trabalhe <span>Connosco</span></h2> 
                    <p>
                        Estamos à procura de profissionais talentosos e motivados para se juntarem à nossa equipe!
                        Se você busca um ambiente de trabalho dinâmico, oportunidades de crescimento e um espaço onde suas ideias são valorizadas, queremos conhecer você.
                    </p> <br />

                    <p>Envie seu currículo e uma breve carta de apresentação e venha fazer parte de uma equipe que está sempre à frente da inovação.</p>  <br />

                    <p>Email para envio: <span>vagas@oportunidade.co.mz</span></p>  <br />

                    <p>Estamos ansiosos para receber sua candidatura!</p>
                </div>

                <div className='ImagemTrabalheConnosco'>

                </div>
            </section>

            <FooterEmprego/>
        </div>
    )
}
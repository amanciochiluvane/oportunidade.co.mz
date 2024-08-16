import HeaderEmprego from "../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego"
import Coca from '../../assets/Coca.png'
import Yango from '../../assets/Yango.png'
import Mpesa from '../../assets/Mpesa.png'
import Brandview from '../../assets/Brandview.png'
import Moza from '../../assets/Moza.png'
import './Empregadores.css'
import {Helmet} from 'react-helmet/es/Helmet'

export default function Empregadores(){
    return(
        <div className="Empregadores">
            <HeaderEmprego/>
         
            <Helmet>
                <title>Empregadores</title>
                <meta name="description" content={"Descubra as empresas que mais valorizam seus talentos e oferecem as melhores oportunidades de crescimento profissional no Oportunidade.co.mz. Explore perfis detalhados de empregadores, conheça suas culturas empresariais, benefícios e oportunidades de desenvolvimento."}/>
                <meta name="keywords" content={"keyword"}/>
                <meta property="og:title" content={"og:Empregadores"}/>
                <meta property="og:description" content={"og:Descubra as empresas que mais valorizam seus talentos e oferecem as melhores oportunidades de crescimento profissional no Oportunidade.co.mz. Explore perfis detalhados de empregadores, conheça suas culturas empresariais, benefícios e oportunidades de desenvolvimento."}/>
             </Helmet>

            <h2>Empresas <span>Recrutadoras</span></h2>
            <section>
            <article className='ArticleNivies' id="ArticleNivies22">
    
                    <div className='BoxEmpregoExperiencia2'>
                        <img src={Yango}  />
                    
                    </div>

                    <div className='BoxEmpregoExperiencia2'> 
                        <img src={Mpesa}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                        <img src={Brandview}  />
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Moza}  /> 
                    </div>

                    
                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Coca}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Mpesa}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                        <img src={Yango}  />
                    
                    </div>

                    <div className='BoxEmpregoExperiencia2'> 
                        <img src={Mpesa}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                        <img src={Brandview}  />
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Moza}  /> 
                    </div>

                    
                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Coca}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Mpesa}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Moza}  /> 
                    </div>

                    
                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Coca}  /> 
                    </div>

                    <div className='BoxEmpregoExperiencia2'>
                    <img src={Mpesa}  /> 
                    </div>
       
            </article>

            </section>
        </div>
    )
}
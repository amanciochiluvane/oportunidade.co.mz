import './OportunidadesEmprego.css'
import Seta from '../../../assets/seta.png'
import { Link } from 'react-router-dom'
import arrowNextImage from '../../../assets/Next3.png'
import arrowPrevImage from '../../../assets/Prev3.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import Coca from '../../../assets/Coca.png'
import Yango from '../../../assets/Yango.png'
import Mpesa from '../../../assets/Mpesa.png'
import Brandview from '../../../assets/Brandview.png'
import Moza from '../../../assets/Moza.png'


export default function OportunidadesEmprego(){

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "block",
              backgroundImage: `url(${arrowNextImage})`, // Substitua pelo caminho da sua imagem
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat:'no-repeat'
              
            }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "block",
              backgroundImage: `url(${arrowPrevImage})`, // Substitua pelo caminho da sua imagem
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat:'no-repeat'
            }}
            onClick={onClick}
          />
        );
      }
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay:false,
        speed:2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        
        
        responsive: [
          {
            breakpoint: 2024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: true,
              dots: true,
             
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };





    return(
        <div className="OprtunidadesEmprego">
            <div className='LinhaEmprego1'></div>
             <h2>Encontre as oportunidades de emprego adequadas na Moçambique.</h2>
             <div className='LinhaEmprego2'></div>
             <section className="FiltragemNiveisSECTION">
                <h2>Filtragem baseada em experiência.</h2>
                <article className="FiltragemNiveisArticle">
                    <div className="FiltragemNiveisArticleOVERVIEW">
                        <p>Encontre empregos que se adequem ao seu nível de experiência</p>
                        <p id="FiltragemNiveisArticleOVERVIEW2">Veja Mais Níveis de Experiência</p>
                    </div>
                    <article className='ArticleNivies'>
                    <Slider{...settings}>
                        <Link className='BoxEmpregoExperiencia' to="/vagas">
                            <h2>Sem Experiência</h2>
                            <p>30 Vagas</p>
                            <div>
                            <Link to="/vagas"><p>Explorar Vagas</p></Link>
                                <img src={Seta} alt="Seta Imagem" />
                            </div>
                        </Link>

                        <Link className='BoxEmpregoExperiencia'to="/vagas"> 
                            <h2>Estágio e Recém-formado</h2>
                            <p>30 Vagas</p>
                            <div>
                            <Link to="/vagas"><p>Explorar Vagas</p></Link>
                                <img src={Seta} alt="Seta Imagem" />
                            </div>
                        </Link>

                        <Link className='BoxEmpregoExperiencia' to="/vagas">
                            <h2>Nivel Executivo</h2>
                            <p>30 Vagas</p>
                            <div>
                            <Link to="/vagas"><p>Explorar Vagas</p></Link>
                                <img src={Seta} alt="Seta Imagem" />
                            </div>
                        </Link>

                        <Link className='BoxEmpregoExperiencia' to="/vagas">
                            <h2>Nivel Sênior</h2>
                            <p>30 Vagas</p>
                            <div>
                                <Link to="/vagas"><p>Explorar Vagas</p></Link>
                                <img src={Seta} alt="Seta Imagem" />
                            </div>
                        </Link>

                        
                        <Link className='BoxEmpregoExperiencia' to="/vagas">
                            <h2>Nivel Médio</h2>
                            <p>30 Vagas</p>
                            <div>
                            <Link to="/vagas"><p>Explorar Vagas</p></Link>
                                <img src={Seta} alt="Seta Imagem" />
                            </div>
                        </Link>

                        <Link className='BoxEmpregoExperiencia' to="/vagas">
                            <h2>Nivel Médio</h2>
                            <p>30 Vagas</p>
                            <div>
                            <Link to="/vagas"><p>Explorar Vagas</p></Link>
                                <img src={Seta} alt="Seta Imagem" />
                            </div>
                        </Link>
                        </Slider>
                    </article>

                 
                </article>
                <Link to="/vagas" className='TodasVagas'>Todas as Vagas</Link>
             </section>

<section className="FiltragemNiveisSECTION">

<h2>Empresas atualmente recrutando em Moçambique</h2>

<article className="FiltragemNiveisArticle">
    <div className="FiltragemNiveisArticleOVERVIEW">
        <p>Encontre empregos na empresa que deseja em trabalhar</p>
        <p id="FiltragemNiveisArticleOVERVIEW2">Veja Mais Empresas</p>
    </div>
    <article className='ArticleNivies'>
    <Slider{...settings}>
        <Link to="/empregadores-detalhes">
          <div className='BoxEmpregoExperiencia2'>
              <img src={Yango}  />
          
          </div>
        </Link>

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
        </Slider>
    </article>

 
</article>
<Link to="/empregadores" className='TodasVagas' id='TodasEmpresas'>Todas as Empresas e Recrutadores</Link>
</section>
        </div>
    )
}

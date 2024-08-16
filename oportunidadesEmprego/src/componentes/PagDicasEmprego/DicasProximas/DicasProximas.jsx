import './DicasProximas.css'
import { Link } from 'react-router-dom'
import SenhorInvestir3 from '../../../assets/SenhorInvestir3.png'
import SenhorInvestir4 from '../../../assets/SenhorInvestir4.png'
import SenhorInvestir5 from '../../../assets/SenhorInvestir5.png'
import arrowNextImage from '../../../assets/Next3.png'
import arrowPrevImage from '../../../assets/Prev3.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { client } from '../../../../lib/client';
import { useEffect, useState } from 'react';

export default function DicasProximas(){

  const [dicas, setDicas] = useState([]);

    useEffect(() => {
        const query = `*[_type == "destaque"] | order(_createdAt desc) {
          _id,
            titulo,
            descricao,
            category,
            "image": imagem.asset->url
        }`;
        client.fetch(query).then((data) => {
            setDicas(data);
        });
    }, []);

    const dicasAdicionais = dicas.slice(7, 13);

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
                breakpoint: 3024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: true,
                 
                }
              },
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
            breakpoint: 1300,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 1
            }
          },

          {
            breakpoint: 1097,
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
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };


    return(
        <div className="DicasProximas">
            <h2>Alguns Artigos</h2>
            <section className="SectionDicasProximas">
            <Slider{...settings}>
            {dicasAdicionais.map((dica, index) => (
              
                <Link key={index} className='SectionDicasProximasLink' to={`/dica/${dica._id}`}>
                  {console.log(dicasAdicionais)}
                  <div className='SectionDicasProximasLinkIMGDICA' style={{backgroundImage: `url(${dica.image})`}} ></div>
                   
                    <article>
                        <h2>{dica.titulo}</h2>
                    </article>
                </Link>
            ))}
        
            </Slider>
            
            </section>
        </div>
    )
}
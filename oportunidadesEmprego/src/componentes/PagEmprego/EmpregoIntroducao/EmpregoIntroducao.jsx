/* eslint-disable react/prop-types */
import './EmpregoIntroducao.css'
import HomemOculos from '../../../assets/foto.png'
import CategoriaIntroducao from '../../../assets/CategoriaIntroducao.png'
import pasta from "../../../assets/pasta.png"
import LupaAzul from '../../../assets/LupaAzul.png'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import Ver2 from '../../../assets/Ver2.png'
import Ver from '../../../assets/Ver.png'
import { useState } from 'react'
import tracado from "../../../assets/tracado.png"
import intersect from "../../../assets/Intersect.png"

export default function EmpregoIntroducao({query,handleInputChange,handleChangeHandle, selectedCategory }){
    const navigate = useNavigate();
    const [menu,setMenu]=useState(true);



    const handleCategoryChange = (event) => {
        handleChange(event);
        navigate('/vagas');
    }

    function mostrarmenu(){
        setMenu(!menu);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };
    
    const handleSearch = () => {
        if (query.trim() !== '') {
          navigate(`/vagas/pesquisar/${encodeURIComponent(query)}`);
        }
      };

    
    const handleCategoryClick = (category) => {
        handleChangeHandle(category);
        navigate('/vagas');
    }

    return(
    <div className="EmpregoIntroducao">
        <section id='EmpregoIntroducaoSECTION'>
            <h2>Encontre o emprego dos seus <span><span><span>sonhos</span><span><img src={tracado} /></span></span> connosco.</span></h2>
                <article className='EmpregoIntroducaoPesquisa'>
                    <div className='CategoriaEmpregoIntroducaoPesquisa'>
                        <img src={pasta} alt="FotoCategoria"  />
                        <p onClick={mostrarmenu} >
                            Categoria
                            <img src={menu?Ver2:Ver} alt="" />
                        </p>
                        
                    </div>
                    
                    <div className={menu?'categoriaInvisvel':'categoriaVisivel'}>
                        <Link to="/vagas/Agricultura" onClick={() => handleCategoryClick('Agricultura')}>Agricultura</Link>
                        <Link to="/vagas/Tecnologia" onClick={() => handleCategoryClick('Tecnologia')}>Tecnologia</Link>
                        <Link to="/vagas/Construção" onClick={() => handleCategoryClick('Construção')}>Construção</Link>
                        <Link to="/vagas/Educação" onClick={() => handleCategoryClick('Educação')}>Educação</Link>
                        <Link to="/vagas/Saúde" onClick={() => handleCategoryClick('Saúde')}>Saúde</Link>
                        <Link to="/vagas/Financeiro" onClick={() => handleCategoryClick('Financeiro')}>Financeiro</Link>
                        <Link to="/vagas/Mecânica" onClick={() => handleCategoryClick('Mecânica')}>Mecânica</Link>
                        <Link to="/vagas/Energia" onClick={() => handleCategoryClick('Energia')}>Energia</Link>
                        <Link to="/vagas/Transporte" onClick={() => handleCategoryClick('Transporte')}>Transporte</Link>
                    </div>

                    <input type="text" id='InputPesquisaEmprego' placeholder='Pesquisar por vagas e empresas' onChange={handleInputChange} value={query} onKeyDown={handleKeyDown}   required/>
                    <div className='BotaoPesquisaEmprego'  onClick={handleSearch}>
                        
                        <p>Pesquisa</p>
                    </div>
                </article>
                
               

            

            <section className='MaisPesquisadas'>
          <p>Mais Pesquisadas</p>
          <article>
            <Link to="/vagas/Tecnologia">
              
              <p>Tecnologia</p>
            </Link>
            <Link to="/vagas/Saúde">
              
              <p>Saúde</p>
            </Link>
            <Link to="/vagas/Educação">
              
              <p>Educação</p>
            </Link>
            <Link to="/vagas/Financeiro">
              
              <p>Financeiro</p>
            </Link>
            <Link to="/vagas/Construção">
              
              <p>Construção</p>
            </Link>
          </article>
        </section>
        </section>
        <img className='HomemOculosBack' src={HomemOculos} alt="Homem com óculos" />
        <img className="intersect" src={intersect}  />
        <div>
        </div>
    </div>
    )
}
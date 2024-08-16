import { Link } from "react-router-dom"
import './EmpregadoresEmprego.css'
import HomemTalento from '../../../assets/HomemTalento.png'
import SetaAzuelEscura from '../../../assets/SetaAzulEscura.png'
import Dica1 from '../../../assets/Dica1.png'
import Dica2 from '../../../assets/Dica2.png'
import Dica3 from '../../../assets/Dica3.png'
import { useState,useEffect } from "react"
import { client } from "../../../../lib/client"

export default function EmpregadoresEmprego(){
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
    if(!dicas.length){
        return "";
    }
    return(
        <div className="EmpregadoresEmprego">
            <section className="EmpregadoresEmpregoOverview">
                <section className="TalentoEmpregadores">
                    <article className="TalentoEmpregadoresTexto">
                        <h3>PARA EMPREGADORES</h3>
                        <h2>Em busca do talento ideal?</h2>
                        <p>Contamos com mais de 100 mil profissionais em busca de emprego em todos os níveis, perfeitos para a sua organização!</p>
                        <Link>
                        <p>Saber mais</p>
                        <img src={SetaAzuelEscura} alt="Seta Azul Escura"  />
                        </Link>
                    </article>
                    <article className="TalentoEmpregadoresImg">
                        <img src={HomemTalento} alt="Homem" />
                    </article>
                </section>

                <section className="DicasCarreiraEmprego">
                    <h2>Principais Dicas de Carreira</h2>
                    <Link to="/dicas-de-carreira">
                        <p>Pesquisar</p>
                        <img src={SetaAzuelEscura} alt="Seta Azul Escura" />
                    </Link>

                    <div className='DicaArtigosRelacionados'>
                        <section >
                        {dicas.slice(0, 3).map((dica, index) => (
                                <Link key={dica._id} to={`/dica/${dica._id}`}>
                                    <article className='ARTICLEARtigoRelacionado' style={{ backgroundImage: `url(${dica.image})` }}></article>
                                        <div>
                                            <p>{dica.titulo}</p>
                                        </div>
                                    
                                </Link>
                            ))}

                   

                        
                        </section>
                    </div>

                    
                </section>
            </section>
        </div>
    )
}
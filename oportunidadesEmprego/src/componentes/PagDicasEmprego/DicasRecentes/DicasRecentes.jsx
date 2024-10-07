import SetBranca from '../../../assets/SetaBranca.png';
import { Link } from 'react-router-dom';
import './DicasRecentes.css';
import { client } from '../../../../lib/client';
import { useEffect, useState } from 'react';

export default function DicasRecentes() {
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

    const dicaRecente = dicas[0]; 
    
    

    return (
        <div className="DicasRecentes">
          <section className='DicasGrande' style={{backgroundImage: `url(${dicaRecente.image})`}}  >
                <button>{dicaRecente.category}</button>
                <div>
                    <h2>{dicaRecente.titulo}</h2>
                    <Link className='LermaisDicaGrande' to={`/dica/${dicaRecente._id}`}>
                        <img loading="lazy"src={SetBranca} alt="Seta Branca" />
                        <p>Ler mais</p>
                    </Link>
                    <article>
                        {dicas.slice(1, 4).map((dica, index) => (
                            <Link key={index} to={`/dica/${dica._id}`}>
                                <p>{dica.titulo}</p>
                            </Link>
                        ))}
                    </article>
                </div>
            </section>
            
        </div>
    );
}

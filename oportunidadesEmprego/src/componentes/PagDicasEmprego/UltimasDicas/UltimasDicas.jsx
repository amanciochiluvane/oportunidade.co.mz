import './UltimasDicas.css'
import SenhorInvestir3 from '../../../assets/SenhorInvestir3.png'
import SenhorInvestir4 from '../../../assets/SenhorInvestir4.png'
import SenhorInvestir5 from '../../../assets/SenhorInvestir5.png'
import { Link } from 'react-router-dom'
import MulherApontando from '../../../assets/MulherApontando.png'
import { client } from '../../../../lib/client';
import { useEffect, useState } from 'react';


export default function UltimasDicas(){
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

    // Remove a última dica
    const ultimasDicas = dicas.slice(1, 4);
    const dicasAdicionais = dicas.slice(4, 7);
    return(
        <div className="UltimasDicas">
            <h2>Recentes</h2>
            <section>
                 <section className="UltimasDicasArtigos">
            {ultimasDicas.map((dica, index) => (
                
                <Link key={index} to={`/dica/${dica._id}`}>
                   
                    <article className="dicaIMGNovo" style={{ backgroundImage: `url(${dica.image})` }}> </article>
                    <div>
                        <h2>{dica.titulo}</h2>
                        <p>{dica.descricao}</p>
                        <button>{dica.category}</button>
                    </div>
                </Link>
            ))}
        </section>
                <section className="UltimasTendencias">
                    <h2>Em alta
                    </h2>
                    <section>
                    {dicasAdicionais.map((dica, index) => (
                    <Link key={index} to={`/dica/${dica._id}`}>
                        <h2>#{index+1}</h2>
                        <div>
                            <h2>{dica.titulo}</h2>
                            
                            {/* Adicione a data da dica aqui */}
                            <p>{dica.data}</p>
                        </div>
                    </Link>
                ))}
                    </section>

                    <article className='PublicidadeCriarConta'>
                        <h2>Crie uma  <span>conta gratuita</span>   preencha seu perfil e seja conectado com o emprego dos seus sonhos</h2>
                        <Link to="/escolherConta">Criar Conta</Link>
                        <img src={MulherApontando} />
                    </article>
                </section>
            </section>
        </div>
    )
}
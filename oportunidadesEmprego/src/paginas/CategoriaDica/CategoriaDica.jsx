import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoriaDica.css';
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego';
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego';
import { client } from '../../../lib/client';
import { Helmet } from 'react-helmet/es/Helmet';
// Configuração do cliente Sanity.io


export default function CategoriaDica() {
    const { id } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Busca os dados dos artigos da categoria com base no ID
        const query = `*[_type == "destaque" && category == "${id}"]{
            _id,
            titulo,
            descricao,
            "image": imagem.asset->url
        }`;
        client.fetch(query).then((data) => {
            setArticles(data);
        });
    }, [id]);

    return (
        <div className="CategoriaDica">
            <HeaderEmprego/>

            <Helmet>
            <title>Dicas de Carreira - {id}</title>
            <meta name="description" content={"O site oportunidade.co.mz oferece uma ampla gama de categorias de dicas de carreira, projetadas para ajudar profissionais em diferentes estágios de suas trajetórias profissionais. "}/>
            <meta name="keywords" content={"dicas de emprego, dicas agricultura, dicas desenvolvimento pessoal"}/>
            <meta property="og:title" content={`og:Dicas de Carreira - ${id}`}/>
            <meta property="og:description" content={"og:O site oportunidade.co.mz oferece uma ampla gama de categorias de dicas de carreira, projetadas para ajudar profissionais em diferentes estágios de suas trajetórias profissionais. "}/>
            </Helmet>

            <h2>{id}</h2>

            <section className='CategoriaDicaSection'>
                {articles.map((article) => (
                    <Link key={article._id} to={`/dica/${article._id}`}>
                        <div>
                            <article className='CategoriaDicaSectionIMG' style={{ backgroundImage: `url(${article.image})` }}></article>
                            <h2>{article.titulo}</h2>
                            <p>{article.descricao}</p>
                        </div>
                    </Link>
                ))}
            </section>

            <FooterEmprego/>
        </div>
    );
}

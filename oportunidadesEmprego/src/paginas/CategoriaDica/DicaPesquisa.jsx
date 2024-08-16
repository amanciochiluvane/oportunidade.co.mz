import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoriaDica.css';
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego';
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego';
import { client } from '../../../lib/client';
import { Helmet } from 'react-helmet/es/Helmet';

export default function DicaPesquisa() {
    const { id } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Busca os dados dos artigos da categoria com base no ID
        const query = `*[_type == "destaque" && (titulo match "${id}" || descricao match "${id}" || category match "${id}")]{
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
                <title>Pesquisar dica</title>
                
                <meta property="og:title" content={"og:Pesquisar dica"}/>
                
             </Helmet>


            <h2>Pesquisou por: <span>{id}</span></h2>

            <section className='CategoriaDicaSection'>
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <Link key={article._id} to={`/dica/${article._id}`}>
                            <div>
                                <article className='CategoriaDicaSectionIMG' style={{ backgroundImage: `url(${article.image})` }}></article>
                                <h2>{article.titulo}</h2>
                                <p>{article.descricao}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Nenhuma dica encontrada</p>
                )}
            </section>

            <FooterEmprego/>
        </div>
    );
}

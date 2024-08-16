import React, { useState, useEffect } from 'react';
import { client } from '../../../lib/client';
import { Link, useParams } from 'react-router-dom';
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego';
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego';
import Facebook from '../../assets/Facebook.png';
import Instagram from '../../assets/Instagram.png';
import Twitter from '../../assets/Twitter.png';
import LinkedIn from '../../assets/LinkedIn.png';
import './Dica.css';
import { Helmet } from 'react-helmet/es/Helmet';

export default function Dica() {
    const [dica, setDica] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    
    const { id } = useParams();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    };

    useEffect(() => {
        // Busca os dados da dica com base no ID
        const query = `*[_type == "destaque" && _id == "${id}"][0] {
            _id,
            titulo,
            descricao,
            category,
            corponoticia,
            "image": imagem.asset->url,
            data
        }`;
        client.fetch(query).then((data) => {
            setDica(data);
        });
    }, [id]);

    useEffect(() => {
        if (!dica || !dica.category){
            return;
        } 

        const categoryRef = dica.category;
        console.log("categoria")
        console.log(categoryRef);
        const queryRelated = `*[_type == "destaque" && category == "${categoryRef}" ] {
            _id,
            titulo,
            descricao,
            "image": imagem.asset->url,
            data
        }`;

        client.fetch(queryRelated).then((relatedData) => {
            // Ordena os resultados com base na data em ordem decrescente
            relatedData.sort((a, b) => new Date(b.data) - new Date(a.data));
            setRelatedArticles(relatedData);
        }).catch((err) => console.error(err));
    }, [dica]);


    return (
        <div className="Dica">
            

            <HeaderEmprego />
            {dica && (
                <React.Fragment>
                    <Helmet>
                        <title>{dica.titulo}</title>
                        <meta name="description" content={dica.descricao}/>
                        <meta property="og:title" content={`og:${dica.titulo}`}/>
                        <meta property="og:description" content={`og:${dica.descricao}`}/>
                    </Helmet>

                    <h2>{dica.category}</h2>

                    <section>
                        <article>
                            <div className='ImgArtigo' style={{ backgroundImage: `url(${dica.image})` }}></div>
                            <div className='InfoArtigo'>
                                <div className='InfoArtigo1'>
                                    <p>Publicado em: <span>{formatDate(dica.data)}</span></p>
                                </div>
                                <div className='InfoArtigo2'>
                                    <p>Compartilhar artigo:</p>
                                    <div className='SocialMedia2'>
                                        <Link to="#"><img src={Facebook} alt="Ícone Facebook" /></Link>
                                        <Link to="#"><img src={LinkedIn} alt="Ícone LinkedIn" /></Link>
                                        <Link to="#"><img src={Twitter} alt="Ícone Twitter" /></Link>
                                        <Link to="#"><img src={Instagram} alt="Ícone Instagram" /></Link>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className='ContentArtigo'>
                            <h2>{dica.titulo}</h2>
                            <p style={{ marginBottom: '10px' }}>{dica.descricao}</p>
                            {dica.corponoticia.map((block, index) => {
                                let blockElement;

                                if (block._type === 'span') {
                                    blockElement = (
                                        <span className='ImportantSPANCONTENT' key={index}>
                                            {block.marks.includes('strong') ? (
                                                <strong>{block.text}</strong>
                                            ) : (
                                                block.text
                                            )}
                                        </span>
                                    );
                                } else {
                                    if (block.style === 'h3' || block.style === 'h4' || block.style === 'blockquote' || block.style === 'normal') {
                                        switch (block.style) {
                                            case 'h3':
                                                blockElement = <h3 style={{ fontWeight: '400', fontSize: '17px', marginBottom: '10px' }}>{block.children[0].text}</h3>;
                                                break;
                                            case 'h4':
                                                blockElement = <h4 style={{ fontWeight: '600', fontSize: '17px', marginBottom: '10px' }}>{block.children[0].text}</h4>;
                                                break;
                                            case 'normal':
                                                blockElement = (
                                                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                                                        {block.children.map((child, childIndex) => (
                                                            <span key={childIndex}>
                                                                {child.marks && child.marks.includes('strong') ? (
                                                                    <strong>{child.text}</strong>
                                                                ) : (
                                                                    child.text
                                                                )}
                                                            </span>
                                                        ))}
                                                    </p>
                                                );
                                                break;
                                            case 'blockquote':
                                                blockElement = <blockquote style={{ borderLeft: '2px solid #333', paddingLeft: '10px', marginBottom: '10px' }}>{block.children[0].text}</blockquote>;
                                                break;
                                            default:
                                                break;
                                        }
                                    } else if (block.listItem === 'bullet') {
                                        blockElement = (
                                            <li style={{ fontSize: '16px', marginBottom: '5px' }}>
                                                {block.children.map((child, childIndex) => (
                                                    <span key={childIndex}>
                                                        {child.marks && child.marks.includes('strong') ? (
                                                            <strong>{child.text}</strong>
                                                        ) : (
                                                            child.text
                                                        )}
                                                    </span>
                                                ))}
                                            </li>
                                        );
                                    }
                                }

                                return blockElement;
                            })}
                        </article>
                    </section>

                    <div className='DicaArtigosRelacionados'>
    <h2>Artigos Relacionados</h2>
    <section>
        {relatedArticles.map((article) => (
            dica._id !== article._id && (
                <Link key={article._id} to={`/dica/${article._id}`}>
                    <article className='ARTICLEARtigoRelacionado' style={{ backgroundImage: `url(${article.image})` }}></article>
                    <div>
                        <p>{article.titulo}</p>
                    </div>
                </Link>
            )
        ))}
    </section>
</div>

                </React.Fragment>
            )}
            <FooterEmprego />
        </div>
    );
}


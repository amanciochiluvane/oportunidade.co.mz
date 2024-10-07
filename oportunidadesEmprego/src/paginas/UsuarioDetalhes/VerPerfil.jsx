import "./UsuarioDetalhes.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderEmprego from "../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego";
import foto from '../../assets/11.png';

export default function VerPerfil() {
    const { id } = useParams();
    const [candidato, setCandidato] = useState(null);

    useEffect(() => {
        // Fetch candidate data based on the id from the URL
        fetch(`${import.meta.env.VITE_APP_BACKEND}/candidato/${id}`)
            .then(res => res.json())
            .then(data => {
                setCandidato(data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do candidato:", error);
            });
    }, [id]);

    if (!candidato) {
        return <p>...</p>;
    }

    return (
        <div className="UsuarioDetalhes">
            <HeaderEmprego />
            <section>
                <div className="FundoUserProfile"></div>

                <section className="IntroUser">
                    <img loading="lazy"src={candidato.candidatoFotoPerfil} alt="Foto do Candidato" />
                    <div>
                        <h2>{candidato.candidatoFirstName} {candidato.candidatoLastName}</h2>
                        <h3>{candidato.candidatoProfissao}</h3>
                        <div>
                            <img loading="lazy"src={foto} alt="Localização" />
                            <p>{candidato.candidatoProvincia}</p>
                        </div>
                    </div>
                </section>
            </section>

            <section className="BasicInfo">
                <h2>Sobre mim</h2>
                <p>
                {candidato.candidatoSobreMim}
                </p>
            </section>

            <section className="BasicInfo">
                <h2>Informações Básicas</h2>

                <article>
                    <p><span>Email</span>: {candidato.candidatoEmail}</p>
                    <p><span>Gênero</span>: {candidato.candidatoGenero}</p>
                    <p><span>Nacionalidade</span>: {candidato.candidatoNacionalidade}</p>
                    <p><span>Localização</span>: {candidato.candidatoProvincia}</p>
                    <p><span>Data de Nascimento</span>: {candidato.candidatoDataNascimento}</p>
                    <p><span>Número de Celular</span>: {candidato.candidatoNumero}</p>
                    <p><span>Anos de Experiência</span>: {candidato.candidatoAnosExperiencia}</p>
                    <p><span>Formação Acadêmica</span>: {candidato.candidatoFormacaoAcademica}</p>
                    <p id="LinkCV"><a href={candidato.candidatoCV} target="_blank" rel="noopener noreferrer">Baixar CV</a></p>
                </article>
            </section>
        </div>
    );
}

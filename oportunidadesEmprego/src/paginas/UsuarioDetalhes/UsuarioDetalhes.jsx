import "./UsuarioDetalhes.css"
import { useSelector } from 'react-redux';
import HeaderEmprego from "../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego";
import foto from '../../assets/11.png'
import fundo from '../../assets/Fundo.jpg'

export default function UsuarioDetalhes(){
    const { currentUser } = useSelector((state) => state.user);
    
    return(
        <div className="UsuarioDetalhes">
            <HeaderEmprego/>
            <section>
                <div className="FundoUserProfile" ></div>

                <section className="IntroUser">
                    <img loading="lazy"src={currentUser.usuário.candidatoFotoPerfil}  />
                    <div>
                        <h2>{currentUser.usuário.candidatoFirstName} {""} {currentUser.usuário.candidatoLastName}</h2>
                        <h3>{currentUser.usuário.candidatoProfissao}</h3>
                        <div>
                            <img loading="lazy"src={foto} />
                            <p>{currentUser.usuário.candidatoProvincia}</p>
                        </div>
                        
                    </div>

                </section>
            </section>

            <section className="BasicInfo">
             <h2>Sobre mim</h2>
                <p>
                {currentUser.usuário.candidatoSobreMim}
                </p>
             </section>
             
             <section className="BasicInfo">
                <h2>Informações Básicas</h2>

                <article>
                    <p><span>Email</span> {currentUser.usuário.candidatoEmail}</p>
                    <p><span>Gênero</span> {currentUser.usuário.candidatoGenero}</p>
                    <p><span>Nacionalidade</span> {currentUser.usuário.candidatoNacionalidade}</p>
                    <p><span>Localização</span> {currentUser.usuário.candidatoProvincia}</p>
                    <p><span>Data de Nascimento</span> {currentUser.usuário.candidatoDataNascimento}</p>
                    <p><span>Número de Celular</span> {currentUser.usuário.candidatoNumero}</p>
                    <p><span>Anos de Experiência</span> {currentUser.usuário.candidatoAnosExperiencia}</p>
                    <p><span>Formação Acadêmica</span> {currentUser.usuário.candidatoFormacaoAcademica}</p>
                    <p id="LinkCV"> <a href={currentUser.usuário.candidatoCV} target="_blank" rel="noopener noreferrer">Baixar CV</a></p>
                </article>
             </section>

           
             


        </div>
    )
}
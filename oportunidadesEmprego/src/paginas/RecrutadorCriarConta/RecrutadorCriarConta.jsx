import { Link } from 'react-router-dom'
import SetaVoltar from '../../assets/SetaVoltar.png';
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import hide from '../../assets/hide.png'
import show from '../../assets/show.png'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet/es/Helmet';

export default function RecrutadorCriarConta(){
    const [mensagem,setMensagem]=useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function trocarpassword(){
        setShowPassword(!showPassword);
    }


    const {
        register,
        handleSubmit,
        // eslint-disable-next-line no-unused-vars
        formState:{ errors },

    }=useForm();

    const onSubmit = (data) => {
        setIsLoading(true);
        const logoFile = data.companyLogotipo[0]; // Assuming "logo" is the name of your file input field
    
        // Convert the logo file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const logoBase64 = reader.result;
            
            // Add the logo base64 string to the data object
            data.companyLogotipo = logoBase64;
    
            // Now you can send the data to the server
            fetch(`${import.meta.env.VITE_APP_BACKEND}/criar-conta/recrutador`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                if(result.message){
                    setIsLoading(false);
                    setMensagem(result.message);

                }
                if(result.messageSuccess){
                    setIsLoading(false);
                    alert(result.messageSuccess)
                    navigate('/escolher-tipo-login/recrutador');
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
        };
    
        reader.readAsDataURL(logoFile);
    };
    
    return(
        <div className="RecrutadorCriarConta">
            <Helmet>
                <title>Criar Conta Como Recrutador</title>
                <meta name="description" content={"Maximize seu processo de recrutamento e encontre os melhores talentos criando sua conta como recrutador no Oportunidade.co.mz. Ao se cadastrar, você terá acesso a uma plataforma eficiente e intuitiva para postar vagas de emprego, gerenciar candidaturas e se conectar com profissionais qualificados. Aproveite nossas ferramentas avançadas de busca e filtragem para identificar rapidamente os candidatos ideais para suas vagas."}/>
                <meta property="og:title" content={"og: Criar Conta Como Recrutador"}/>

                <meta property="og:description" content={"og:Maximize seu processo de recrutamento e encontre os melhores talentos criando sua conta como recrutador no Oportunidade.co.mz. Ao se cadastrar, você terá acesso a uma plataforma eficiente e intuitiva para postar vagas de emprego, gerenciar candidaturas e se conectar com profissionais qualificados. Aproveite nossas ferramentas avançadas de busca e filtragem para identificar rapidamente os candidatos ideais para suas vagas."}/>
             </Helmet> 

        {isLoading ? (
                            <section className='card123'>
                                <div className="dots">
                                    <span style={{ "--i": 1 }}></span>
                                    <span style={{ "--i": 2 }}></span>
                                    <span style={{ "--i": 3 }}></span>
                                    <span style={{ "--i": 4 }}></span>
                                    <span style={{ "--i": 5 }}></span>
                                    <span style={{ "--i": 6 }}></span>
                                    <span style={{ "--i": 7 }}></span>
                                    <span style={{ "--i": 8 }}></span>
                                    <span style={{ "--i": 9 }}></span>
                                    <span style={{ "--i": 10 }}></span>
                                    <span style={{ "--i": 11 }}></span>
                                    <span style={{ "--i": 12 }}></span>
                                    <span style={{ "--i": 13 }}></span>
                                    <span style={{ "--i": 14 }}></span>
                                    <span style={{ "--i": 15 }}></span>
                                </div>
                            </section>
                        ): (

    <div className="SignUp">



        <Link to="/escolherConta" className='VoltarSign'><img loading="lazy"src={SetaVoltar}/></Link>
        <div className='IntroSignUp'>
            <h1>Criar Conta</h1>
            <p>Crie uma conta e recrute talentos para sua empresa</p>
            
        </div>
        
        <section className="SignUpInfo1">
            <div>
                <h2>Preencha o seguinte Formulário</h2>
                <p>O seu novo grupo de trabalhadores está a um click de distância</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className='InputInfo1'>
                    <div>
                        <p>Nome da empresa</p>
                        <input type="text" {...register("recruterName")} required  />
                    </div>

                    <div>
                        <p>Email da empresa</p>
                        <input type="email" {...register("recruterEmail")} required />
                    </div>

                    <div>
                        <p>Criar Password</p>
                        <div>
                        <input type={showPassword ? "text" : "password"} {...register("recruterPassword")} required  />
                        <img loading="lazy" src={showPassword?hide:show} onClick={trocarpassword}/>
                        </div>
                        
                    </div >
                    <div>
                        <p>Coloque a foto da empresa</p>
                        <input type="file"{...register("companyLogotipo")} required  />
                    </div>
                </article>

               {mensagem == ""?"":<>
               <h3 className='resultadoForm'>{mensagem}</h3>
               </>}

               <input type="submit" className='SubmeterSignUp'  value="Criar nova conta" />

                
            </form>
        </section>
    </div>
    )}
        </div>
    )
}
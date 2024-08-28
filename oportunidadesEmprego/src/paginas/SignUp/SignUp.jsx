import './SignUp.css'
import { Link } from 'react-router-dom'
import SetaVoltar from '../../assets/SetaVoltar.png';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import {storage} from '../../firebase/firebase.config'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import hide from '../../assets/hide.png'
import show from '../../assets/show.png'
import { Helmet } from 'react-helmet/es/Helmet';



export default function SignUp(){
    const [mensagem,setMensagem]=useState("");
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    function trocarpassword(){
        setShowPassword(!showPassword);
    }


    const {
        register,
        handleSubmit,
        
        // eslint-disable-next-line no-unused-vars
        formState:{ errors },

    }=useForm();
    const navigate=useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const logoFile = data.candidatoFotoPerfil[0]; // Assuming "candidatoFotoPerfil" is the name of your file input field for the photo
            const cvFile = data.candidatoCV[0];

            const storageRef = ref(storage);
            const pdfsRef = ref(storageRef, 'cvs');
            const cvRef = ref(pdfsRef, cvFile.name);

            // Upload files
            console.log("uploading files");
            setProgress(25); // Update progress to 25%

            await uploadBytes(cvRef, cvFile);
            console.log("uploaded com sucesso!");
            setProgress(50); // Update progress to 50%

            // Get download URLs
            const cvURL = await getDownloadURL(cvRef);
            data.candidatoCV = cvURL;

            const reader = new FileReader();
            console.log(data);

            reader.onloadend = () => {
                const logoBase64 = reader.result;
                data.candidatoFotoPerfil = logoBase64;

                setProgress(75); // Update progress to 75%

                // Now you can send the data to the server
                fetch(`${import.meta.env.VITE_APP_BACKEND}/criar-conta/candidato`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(result => {
                    if (result.message) {
                        setIsLoading(false);
                        setMensagem(result.message);
                        navigate("/escolher-tipo-login/candidato")
                        
                    }
                    if(result.messageSuccess){
                        setIsLoading(false);
                        alert(result.messageSuccess)
                        navigate("/escolher-tipo-login/candidato")
                    }
                  
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            };

            reader.readAsDataURL(logoFile); // Read the photo file as base64 
        } catch (error) {
            console.error('Error:', error);
            // Handle errors here
        }
    };

    return(
        <> 
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
        ):(
    <div className="SignUp">
         <Helmet>
                <title>Criar Conta Como Candidato</title>
                <meta name="description" content={"Inicie sua jornada rumo ao sucesso profissional criando sua conta como candidato no Oportunidade.co.mz. Ao se cadastrar, você terá acesso a uma plataforma completa para explorar oportunidades de emprego, desenvolver suas habilidades e conectar-se com os melhores empregadores."}/>
                <meta property="og:title" content={"og: Criar Conta Como Recrutador"}/>

                <meta property="og:description" content={"og:Inicie sua jornada rumo ao sucesso profissional criando sua conta como candidato no Oportunidade.co.mz. Ao se cadastrar, você terá acesso a uma plataforma completa para explorar oportunidades de emprego, desenvolver suas habilidades e conectar-se com os melhores empregadores."}/>
             </Helmet> 


        <Link to="/escolherConta" className='VoltarSign'><img src={SetaVoltar}/></Link>
        <div className='IntroSignUp'>
            <h1>Criar Conta</h1>
            <p>Crie uma conta e seja visto pelas empresas</p>
            
        </div>
        
        <section className="SignUpInfo1">
            <div>
                <h2>Preencha o seguinte Formulário</h2>
                <p>A sua nova carreira está a um click de distância</p>
            </div>
            <form  onSubmit={handleSubmit(onSubmit)}>
                
                <article className='InputInfo1'>
                    <div>
                        <p>Primeiro nome</p>
                        <input type="text" {...register("candidatoFirstName")} required  />
                    </div>
                    

                    <div>
                        <p>Ultimo nome</p>
                        <input type="text" {...register("candidatoLastName")} required  />
                    </div>

                    <div>
                        <p>Email</p>
                        <input type="email" {...register("candidatoEmail")} required  />
                    </div>

                    <div>
                        <p>Criar Password</p>
                        <div>
                            <input type={showPassword ? "text" : "password"} {...register("candidatoPassword")} required  />
                            <img  src={showPassword?hide:show} onClick={trocarpassword}/>
                        </div>
                        
                    </div>
                    <div>
                        <p>Profissão</p>
                        <input type="text" {...register("candidatoProfissao")} required  />
                    </div>
                </article>

                <article className='InputInfo2'>
                  

                    <article className='InputInfo21'>
                        <div>
                            <p>Gênero</p>
                             <select {...register("candidatoGenero")} required  >
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Feminino">Prefiro não dizer </option>
                             </select>
                        </div>

                        <div>
                            <p>Nacionalidade</p>
                                <select name="nacionalidade" {...register("candidatoNacionalidade")} required >
    <option value="">-- selecione uma --</option>
    <option value="afegao">Afegão</option>
    <option value="albanes">Albanês</option>
    <option value="argelino">Argelino</option>
    <option value="americano">Americano</option>
    <option value="andorrano">Andorrano</option>
    <option value="angolano">Angolano</option>
    <option value="antiguano">Antiguano</option>
    <option value="argentino">Argentino</option>
    <option value="armenio">Armênio</option>
    <option value="australiano">Australiano</option>
    <option value="austríaco">Austríaco</option>
    <option value="azerbaijano">Azerbaijano</option>
    <option value="bahamense">Bahamense</option>
    <option value="bahreiniano">Bahreiniano</option>
    <option value="bangladeshiano">Bangladeshiano</option>
    <option value="barbadiano">Barbadiano</option>
    <option value="barbudano">Barbudano</option>
    <option value="batswana">Batswana</option>
    <option value="bielorrusso">Bielorrusso</option>
    <option value="belga">Belga</option>
    <option value="belizenho">Belizenho</option>
    <option value="beninense">Beninense</option>
    <option value="butanês">Butanês</option>
    <option value="boliviano">Boliviano</option>
    <option value="bósnio">Bósnio</option>
    <option value="brasileiro">Brasileiro</option>
    <option value="britânico">Britânico</option>
    <option value="bruneano">Bruneano</option>
    <option value="búlgaro">Búlgaro</option>
    <option value="burquinense">Burquinense</option>
    <option value="birmanês">Birmanês</option>
    <option value="burundiano">Burundiano</option>
    <option value="cambojano">Cambojano</option>
    <option value="camaronês">Camaronês</option>
    <option value="canadense">Canadense</option>
    <option value="cabo-verdiano">Cabo-verdiano</option>
    <option value="centro-africano">Centro-africano</option>
    <option value="chadiano">Chadiano</option>
    <option value="chileno">Chileno</option>
    <option value="chinês">Chinês</option>
    <option value="colombiano">Colombiano</option>
    <option value="comorense">Comorense</option>
    <option value="congoles">Congoles</option>
    <option value="costarriquenho">Costarriquenho</option>
    <option value="croata">Croata</option>
    <option value="cubano">Cubano</option>
    <option value="cipriota">Cipriota</option>
    <option value="tcheco">Tcheco</option>
    <option value="dinamarquês">Dinamarquês</option>
    <option value="djibutiano">Djibutiano</option>
    <option value="dominicano">Dominicano</option>
    <option value="holandês">Holandês</option>
    <option value="timorense">Timorense</option>
    <option value="equatoriano">Equatoriano</option>
    <option value="egípcio">Egípcio</option>
    <option value="emiradense">Emiradense</option>
    <option value="guinéu-equatoriano">Guinéu-equatoriano</option>
    <option value="eritreu">Eritreu</option>
    <option value="estoniano">Estoniano</option>
    <option value="etíope">Etíope</option>
    <option value="fijiano">Fijiano</option>
    <option value="filipino">Filipino</option>
    <option value="finlandês">Finlandês</option>
    <option value="francês">Francês</option>
    <option value="gabonense">Gabonense</option>
    <option value="gambiano">Gambiano</option>
    <option value="georgiano">Georgiano</option>
    <option value="alemão">Alemão</option>
    <option value="ganês">Ganês</option>
    <option value="grego">Grego</option>
    <option value="granadino">Granadino</option>
    <option value="guatemalteco">Guatemalteco</option>
    <option value="guineense">Guineense</option>
    <option value="guianense">Guianense</option>
    <option value="haitiano">Haitiano</option>
    <option value="hondurenho">Hondurenho</option>
    <option value="húngaro">Húngaro</option>
    <option value="islandês">Islandês</option>
    <option value="indiano">Indiano</option>
    <option value="indonésio">Indonésio</option>
    <option value="iraniano">Iraniano</option>
    <option value="iraquiano">Iraquiano</option>
    <option value="irlandês">Irlandês</option>
    <option value="israelense">Israelense</option>
    <option value="italiano">Italiano</option>
    <option value="marfinense">Marfinense</option>
    <option value="jamaicano">Jamaicano</option>
    <option value="japonês">Japonês</option>
    <option value="jordaniano">Jordaniano</option>
    <option value="kazakh">Kazakh</option>
    <option value="queniano">Queniano</option>
    <option value="kiranês">Kiranês</option>
    <option value="kittitian">Kittitian</option>
    <option value="kuwaitiano">Kuwaitiano</option>
    <option value="quirguiz">Quirguiz</option>
    <option value="laosiano">Laosiano</option>
    <option value="letão">Letão</option>
    <option value="libanês">Libanês</option>
    <option value="liberiano">Liberiano</option>
    <option value="líbio">Líbio</option>
    <option value="liechtensteinense">Liechtensteinense</option>
    <option value="lituano">Lituano</option>
    <option value="luxemburguês">Luxemburguês</option>
    <option value="macedônio">Macedônio</option>
    <option value="malgaxe">Malgaxe</option>
    <option value="malaio">Malaio</option>
    <option value="maldivo">Maldivo</option>
    <option value="maliano">Maliano</option>
    <option value="maltês">Maltês</option>
    <option value="marroquino">Marroquino</option>
    <option value="mauritano">Mauritano</option>
    <option value="mauriciano">Mauriciano</option>
    <option value="mexicano">Mexicano</option>
    <option value="micronésio">Micronésio</option>
    <option value="moldávio">Moldávio</option>
    <option value="monegasco">Monegasco</option>
    <option value="mongol">Mongol</option>
    <option value="marroquino">Marroquino</option>
    <option value="mosotho">Mosotho</option>
    <option value="motswana">Motswana</option>
    <option value="mozambicano">Moçambicano</option>
    <option value="namibiano">Namibiano</option>
    <option value="nauruano">Nauruano</option>
    <option value="nepalês">Nepalês</option>
    <option value="neozelandês">Neozelandês</option>
    <option value="ni-vanuatu">Ni-Vanuatu</option>
    <option value="nicaraguense">Nicaraguense</option>
    <option value="nigerino">Nigerino</option>
    <option value="norte-coreano">Norte-coreano</option>
    <option value="norte-irlandês">Norte-irlandês</option>
    <option value="norueguês">Norueguês</option>
    <option value="omani">Omani</option>
    <option value="paquistanês">Paquistanês</option>
    <option value="palauense">Palauense</option>
    <option value="panamenho">Panamenho</option>
    <option value="papuásio">Papuásio</option>
    <option value="paraguaio">Paraguaio</option>
    <option value="peruano">Peruano</option>
    <option value="polonês">Polonês</option>
    <option value="português">Português</option>
    <option value="qatariano">Qatariano</option>
    <option value="romeno">Romeno</option>
    <option value="russo">Russo</option>
    <option value="ruandês">Ruandês</option>
    <option value="samoano">Samoano</option>
    <option value="marinense">Marinense</option>
    <option value="são-tomense">São-tomense</option>
    <option value="árabe saudita">Árabe Saudita</option>
    <option value="escocês">Escocês</option>
    <option value="senegalês">Senegalês</option>
    <option value="sérvio">Sérvio</option>
    <option value="seichelense">Seichelense</option>
    <option value="serra-leonês">Serra-leonês</option>
    <option value="singapuriano">Singapuriano</option>
    <option value="eslovaco">Eslovaco</option>
    <option value="esloveno">Esloveno</option>
    <option value="salomonense">Salomonense</option>
    <option value="somali">Somali</option>
    <option value="sul-africano">Sul-africano</option>
    <option value="sul-coreano">Sul-coreano</option>
    <option value="espanhol">Espanhol</option>
    <option value="cingalês">Cingalês</option>
    <option value="sudanês">Sudanês</option>
    <option value="surinamês">Surinamês</option>
    <option value="suazi">Suazi</option>
    <option value="sueco">Sueco</option>
    <option value="suíço">Suíço</option>
    <option value="sírio">Sírio</option>
    <option value="taiwanês">Taiwanês</option>
    <option value="tajique">Tajique</option>
    <option value="tanzaniano">Tanzaniano</option>
    <option value="tailandês">Tailandês</option>
    <option value="togolês">Togolês</option>
    <option value="tonganês">Tonganês</option>
    <option value="trinitário-tobagoniano">Trinitário-tobagoniano</option>
    <option value="tunisino">Tunisino</option>
    <option value="turco">Turco</option>
    <option value="tuvaluano">Tuvaluano</option>
    <option value="ugandense">Ugandense</option>
    <option value="ucraniano">Ucraniano</option>
    <option value="uruguaio">Uruguaio</option>
    <option value="uzbeque">Uzbeque</option>
    <option value="venezuelano">Venezuelano</option>
    <option value="vietnamita">Vietnamita</option>
    <option value="galês">Galês</option>
    <option value="iemenita">Iemenita</option>
    <option value="zambiano">Zambiano</option>
    <option value="zimbabuense">Zimbabuense</option>
                                </select>

                        </div>

                        <div>
                            <p>Localização</p>
                <select name="provincia" {...register("candidatoProvincia")} required >
                

                <option value="Cidade de Maputo">Cidade de Maputo</option>
                <option value="Maputo Provincia">Maputo Provincia</option>
                <option value="Gaza">Gaza</option>
                <option value="Inhambane">Inhambane</option>
                <option value="Sofala">Sofala</option>
                <option value="Manica">Manica</option>
                <option value="Tete">Tete</option>
                <option value="Zambezia">Zambezia</option>
                <option value="Nampula">Nampula</option>
                <option value="Cabo Delgado">Cabo Delgado</option>
                <option value="Niassa">Niassa</option>
                </select>

                        </div>
                    </article>

                    <article className='Info22'>
                        <article>
                            <div>
                                <p>Data de Nascimento</p>
                                <input type="date" placeholder="Dia" {...register("candidatoDataNascimento")} required />
                            </div>
                        </article>

                        <article>
                            <div>
                                <p>Numero de Celular (+258)</p>
                                <input type="number" {...register("candidatoNumero")} required />
                            </div>
                        </article>
                        
                    </article>


                    
                </article>
                
                <article className='InputInfo3'>
                    <article className='InputInfo31'>
                        
                        <div>
                            <p>Anos de Experiência</p>
                            <input type="number" {...register("candidatoAnosExperiencia")} required  />
                        </div>

                        <div>
                            <p>Formação académica</p>
                             <select {...register("candidatoFormacaoAcademica")} required  >
                                <option value="Médio">Médio</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Licenciatura">Licenciatura </option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutoramento">Doutoramento</option>
                             </select>
                        </div>
                        
                    </article>

                    <article className='InputInfo33'>
                        
                        <div>
                            <p>Sobre mim</p>
                            <textarea  {...register("candidatoSobreMim")} required  />
                        </div>
 
                    </article>

                    <article className='InputInfo32'>
                        
                        <div>
                            <p>Adicione o seu CV</p>
                            <input type="file" {...register("candidatoCV")} required  />
                        </div>

                        <div>
                            <p>Não tem CV?</p>
                            <Link to="/cv">Criar CV</Link>
                        </div>


                        <div>
                            <p>Adicione uma foto sua</p>
                            <input type="file" {...register("candidatoFotoPerfil")} required  />
                        </div>
                        
                    </article>

                   
                </article>
                {mensagem == ""?"":<>
        <h3 className='resultadoForm'>{mensagem}</h3>
        </>}
       

               <input type="submit" className='SubmeterSignUp' value="Criar nova conta" />

                
            </form>

            
        </section>
    </div>
    )}
    </>
    )
}
import './Login.css'

import LogoGoogle from '../../assets/LogoGoogle.png'

import SetaVoltar from '../../assets/SetaVoltar.png';
import FundoMulher from '../../assets/FundoMulher.jpg'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import hide from '../../assets/hide.png'
import show from '../../assets/show.png'

import { Helmet } from 'react-helmet/es/Helmet';

export default function Login() {
    
    const [showPassword, setShowPassword] = useState(false);


    const [mensagem, setMensagem] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    function trocarpassword(){
        setShowPassword(!showPassword);
    }

    const handleGoogleClick = async () => {
        try {
            setIsLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const recruterEmail = result._tokenResponse.email;

            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}/googleRecrutador`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recruterEmail }),
            });
            const resultado = await res.json();

            if (resultado.erro) {
                setMensagem(resultado.erro);
                setIsLoading(false);
                return;
            } else if (resultado.data.token) {
                localStorage.setItem('token', resultado.data.token);
                dispatch(signInSuccess(resultado));
                navigate('/recrutador');
            }
            if (result.success === false) {
                dispatch(signInFailure(result));
                setIsLoading(false);
                return;
              }
            } catch (error) {
                console.log('could not login with google', error);
                setIsLoading(false);
            }
        };
    
        const {
            register,
            handleSubmit,
            // eslint-disable-next-line no-unused-vars
            formState: { errors },
        } = useForm();
    
        const onSubmit = (data) => {
            setIsLoading(true);
            dispatch(signInStart());
            fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                if (result.erro) {
                    setMensagem(result.erro);
                    setIsLoading(false);
                    return;
                } else if (result.data.token) {
                    localStorage.setItem('token', result.data.token);
                    dispatch(signInSuccess(result));
                    navigate('/recrutador');
                }
                if (result.success === false) {
                    dispatch(signInFailure(result));
                    setIsLoading(false);
                    return;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                dispatch(signInFailure(error));
                setIsLoading(false);
            });
        };
    
        return (
            <div className="Login">
                <Helmet>
                    <title>Login Como Recrutador</title>
                    
                    <meta property="og:title" content={"og: Login Recrutador"}/>

             </Helmet> 


                <section className='LoginInfo2'>
                    <section className='LoginInfo'>
                        <Link to="/" className='VoltarLogin'><img src={SetaVoltar}/></Link>
                        <h2 className='EntrarLoginTitulo'>Por favor faça Log in Como Recrutador</h2>
                        <div>
                            <Link id='GoogleConta' onClick={handleGoogleClick}><img src={LogoGoogle}/> <p>Continue com Google</p></Link>
                            {/* <Link id='LinkedInConta'><img src={LogoLinkedIn}/><p>Continue com LinkedIn</p></Link> */}
                        </div>
                        <p className='OpEntrarLogin'>Ou usando seu email:</p>
    
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
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {mensagem === "" ? "" : <>
                                    <h3 className='resultadoForm'>{mensagem}</h3>
                                </>}
                                <input type="email" {...register("recruterEmail")} required placeholder='Digite seu Email' />
                                <div>
                                    <input type={showPassword ? "text" : "password"}  {...register("recruterPassword")} required placeholder='Digite seu Password' />
                                    <img  src={showPassword?hide:show} onClick={trocarpassword}/>
                                </div>
                                
                                <Link className='EsquecerSenha' to="/esquecer-senha">Esqueci-me da Senha</Link>
                                <input type="submit" className='SubmeterCadastro' value="Submeter" />
                            </form>
                        )}
                        
                        <p className='CriarContaLogin'>Não tens uma conta?<Link to="/escolherConta"> Criar conta</Link></p>
                    </section>
                </section>
    
                <section className='LoginImg'>
                    <img src={FundoMulher} />
                </section>
            </div>
        )
    }
    
import './Contacto.css'
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import  Facebook from '../../assets/Facebook.png'
import  Instagram from '../../assets/Instagram.png'
import  LinkedIn from '../../assets/LinkedIn.png'
import woman from '../../assets/woman.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet/es/Helmet'

export default function Contacto (){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [responseMessageERRO, setResponseMessageERRO] = useState('');
    const [valorSubmeter, setValorSubmeter] = useState(true);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setValorSubmeter(false);
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setResponseMessage('Email enviado com sucesso!');
                setValorSubmeter(true);

            } else {
                setResponseMessageERRO(`Erro: ${data.errors.map(err => err.msg).join(', ')}`);
            }
        } catch (error) {
            setResponseMessageERRO(`Erro: ${error.toString()}`);
        }
    };


    return(
        <div className="Contacto">
            <HeaderEmprego/>

            <Helmet>
                <title>Contacto</title>
                <meta name="description" content={"Seja bem-vindo ao seu destino online para oportunidades incríveis em Moçambique. Estamos aqui para conectar você com as melhores vagas de emprego, estágios, oportunidades de formação e muito mais."}/>
                <meta property="og:title" content={"og:Contacto"}/>
                <meta property="og:description" content={"og:Seja bem-vindo ao seu destino online para oportunidades incríveis em Moçambique. Estamos aqui para conectar você com as melhores vagas de emprego, estágios, oportunidades de formação e muito mais."}/>
             </Helmet>
            
            <section className='IntroContacto'>
                <h2>Entre Em <span>Contacto</span></h2>
                
                <section className='IntroContactoInfo'>
                    <section className='IntroContactoTextNormal'>
                        <article>
                            <h2>Celular</h2>
                            <p>+258 84 000 0000</p>
                        </article>

                        <article>
                            <h2>Email</h2>
                            <p>contacto@oportunidade.co.mz</p>
                        </article>

                        <article className='RedesSociasContacto'>
                            <h2>Redes Sociais</h2>
                            <article>
                                <Link><img src={ Facebook} alt="" /></Link>
                                <Link><img src={ Instagram} alt="" /></Link>
                                <Link><img src={ LinkedIn} alt="" /></Link>
                            </article>
                        </article>
                    </section>
                        
                    <section className='IntroContactoTextForm'>
                        <form onSubmit={handleSubmit} >
                            <div>
                                <p>Nome</p>
                                <input name="name" value={formData.name} onChange={handleChange} required type="text" />

                            </div>

                            <div>
                                <p>Email</p>
                                <input name="email" value={formData.email} onChange={handleChange} required type="email" />

                            </div>
                            <div>
                                <p>Assunto</p>
                                <input name="subject" value={formData.subject} onChange={handleChange}  required type="text" />
                            </div>
                            <div>
                                <p>Mensagem</p>
                                <textarea value={formData.message} onChange={handleChange}  required name="message"></textarea>
                            </div>

                            <input className='SubmeterContactoEmail'  type="submit" value={valorSubmeter?"Enviar Email":"Processando ..."} />

                            <h1 className='responseMessage'>{responseMessage}</h1>
                            <h1>{responseMessageERRO}</h1>
                        </form>
                    </section>

                    <img className='MulherIntroContacto' src={woman} />
                </section>
            </section>

           
        </div>
    )
}
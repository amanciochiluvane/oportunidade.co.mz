import './HeaderLilache.css'
import Logo from '../../assets/LogotipoLilache.png' 

import {Link} from 'react-router-dom'

import { useState } from 'react'

export default function HeaderLilache(){
    const [Menu, setMenu]=useState(false);

    function ActivarMenu(){
        if(Menu == true){
            setMenu(false);
        }
        else{
            setMenu(true);
        }
    }

    return(
        <div className='HeaderLilache'>
            <Link to="/" ><img loading="lazy"id='Logotipo' src={Logo} alt="Logotipo Oportunidades"/></Link>
           <div id={Menu?"Fechar":"MenuBurguer"} onClick={ActivarMenu} >

           </div>
          
           <ul type="none" className={Menu?'MenuVisivel':'MenuVisivelResponsivo'}>
                <li><Link className='LinksUteisLilache' to="/cursos">Cursos</Link></li>
                <li><Link className='LinksUteisLilache' to="/paraempresas">Para Empresas</Link></li>
                
                <li>
                    <div>
                        < Link id='LinkEntrarLilache' className='LinksUteisLilache' to="#">Entrar</Link>
                    </div>
                </li>

                <li>
                    <Link  id='LinkAjudaLilache' to="#">
                       <div id='LinkAjudaImgLilache'>
                        <p>?</p>
                       </div>
                    </Link>
                </li>
           </ul>
           
        </div>
    )
}

import Fechar from '../../../assets/Fechar.png'
import './BarraMenu.css'
import { useState } from 'react'

import Candidatos from '../../../assets/Candidatos.png'
import Dashboard from '../../../assets/Dashboard.png'
import PublicarVaga from '../../../assets/PublicarVaga.png'
import LogOut from '../../../assets/LogOut.png'
import Settings from '../../../assets/Settings.png'
import setabranca from '../../../assets/SetaBranca2.png'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    signOut,
  } from '../../../redux/user/userSlice';

export default function BarraMenu(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [menu,setMenu]=useState(false);
    function mostrarMenu(){
        setMenu(!menu);
    }
    const handleSignOut = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/signout`, {
            method: 'GET', // Usando método GET
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to sign out');
          }
          alert("Log Out feito com sucesso!");
          dispatch(signOut());
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
      
    return(
        <div className="BarraMenu">
            <aside onClick={mostrarMenu} className={menu?'Menu2 invisivel2':'BarraMenuBurguer'} >
                <img loading="lazy"src={setabranca}  />
                
            </aside>

            <aside className={menu?'Menu2 visivel2':'Menu2 invisivel2'}>
                <img loading="lazy"onClick={mostrarMenu} src={Fechar} />
                <Link className='LinkEspecialDashboard' to="/recrutador">
                <img loading="lazy"src={Dashboard} />
                <p>Minhas Vagas</p>
                </Link>
                <Link to="/candidatos">
                <img loading="lazy"src={Candidatos} />
                <p>Recrutar Candidatos</p>
                </Link>
                <Link to="/publicar-vaga">
                <img loading="lazy"src={PublicarVaga} />
                <p>Publicar Vaga</p>
                </Link>
                
                 <Link to="/configuracoes">
                <img loading="lazy"src={Settings} />
                <p>Configurações</p>
                </Link>

                <Link className='EspecialItemLogOut' onClick={handleSignOut} >
                <img loading="lazy"src={LogOut} />
                <p>Log out</p></Link>
               
            
            </aside>
        </div>
    )
}
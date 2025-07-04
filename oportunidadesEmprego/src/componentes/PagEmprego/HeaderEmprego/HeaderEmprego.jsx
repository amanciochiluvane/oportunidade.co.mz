import { Link, useNavigate } from "react-router-dom";
import Logo from '../../../assets/LogotipoLilache.png';
import MenuBurguer from '../../../assets/MenuBurguer.png';
import Fechar from '../../../assets/Fechar.png'; 
import seta from '../../../assets/seta.png';
import './HeaderEmprego.css';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from "react";
import { signOut } from '../../../redux/user/userSlice';

import user from '../../../assets/img/user.png';
import edit from '../../../assets/img/edit.png';
import logout from '../../../assets/img/log-out.png';

export default function HeaderEmprego() {
  const [Menu, setMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  function mostrarMenu() {
    setMenu(!Menu);
  }

  function DropdownItem(props) {
    return (
      <li className='dropdownItem' onClick={props.onClick}>
        <img loading="lazy"src={props.img} alt={props.text} />
        <Link to={props.link}> {props.text} </Link>
      </li>
    );
  }

  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    document.addEventListener("mousedown", handler);

    return () => {
        document.removeEventListener("mousedown", handler);
    }
}, [menuRef]);


  return (
    <div className="HeaderEmprego">
      <section className="HeaderEmpregoLogotipo">
        <Link to="/"><img loading="lazy"src={Logo} alt="Logotipo" /></Link>

        {currentUser ? (
          <>
            {currentUser.usuário.candidatoFirstName ? (
              <>
                <div className='menu-container' ref={menuRef}>
                  <div className="LoginDadosUsuario">
                    <p>Olá, {currentUser.usuário.candidatoFirstName} 👋!</p>
                    <Link to="#" onClick={() => { setOpen(!open) }}>
                      <img loading="lazy"src={currentUser.usuário.candidatoFotoPerfil} alt="Foto do candidato" />
                    </Link>
                  </div>

                  <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <h3 className="h3">
                      <img loading="lazy"className="HoverDadosCandidato" src={currentUser.usuário.candidatoFotoPerfil} alt="Candidato" />
                      <br />
                      {currentUser.usuário.candidatoFirstName}
                      <br />
                      <span>{currentUser.usuário.candidatoEmail}</span>
                    </h3>
                    <ul>
                      <DropdownItem img={user} text={"Meu Perfil"} link={"/meu-perfil"} />
                      <DropdownItem img={edit} text={"Editar Perfil"} link={"/actualizar-candidato"} />
                      <DropdownItem img={logout} text={"Logout"} onClick={handleSignOut} />
                    </ul>
                  </div>
                </div>
              </>
            ) : currentUser.usuário.recruterName ? (
              <>
                <div className="LoginDadosUsuario">
                  <p>Olá, {currentUser.usuário.recruterName} 👋!</p>
                  <Link to="/recrutador">
                    <img loading="lazy"src={currentUser.usuário.companyLogotipo} alt="Logotipo da empresa" />
                  </Link>
                </div> 
              </>
            ) : null}
          </>
        ) : (
          <>

          <div className="ContaDetalhesVagEmprego">
            <Link to="/escolher-tipo-login" className="SignVagaEmprego" >
              <button>Login</button>
            </Link>
            <Link to="/escolherConta" className="LoginVagaEmprego">
              <button>Sign up</button>
            </Link>
          </div>

          
          </>
        )}
      </section>
      <section></section>
      <section className="HeaderEmpregoLinks">
        <img loading="lazy"src={Menu ? Fechar : MenuBurguer} id="MenuBurguerNew"  alt="Menu Burguer" onClick={mostrarMenu} />
      </section>
      

      <section className={Menu ? 'HeaderEmpregoLinksResponsivo visivel' : 'HeaderEmpregoLinksResponsivo invisivel'}>

      <img loading="lazy"src={Menu ? Fechar : MenuBurguer} id="MenuBurguerNew"  alt="Menu Burguer" onClick={mostrarMenu} />

      
      
        <Link to="/vagas"><p>Procurar vaga</p></Link>
        <Link to="/revisao-de-cv"><p>Revisão de CV</p></Link>
        <Link to="/salario"><p>Pesquisa Salarial</p></Link>
        <Link to='/dicas-de-carreira'><p>Dicas de Carreira</p></Link>
        <Link id="LinkSetaHeaderEmprego" to="/recrutador"><p>Recrutador / Postar vaga</p><img loading="lazy"src={seta} alt="Ícone seta" /></Link>
       
      </section>
    </div>
  );
}

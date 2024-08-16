import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import VagaEmprego from './paginas/VagaEmprego/VagaEmprego.jsx'
import EmpregoDescricao from './componentes/EmpregoDescricao/EmpregoDescricao.jsx'
import Login from './paginas/Login/Login.jsx'
import SignUp from './paginas/SignUp/SignUp.jsx'
import Recrutador from './paginas/Recrutador/Recrutador.jsx'
import RecrutadorLIstaCandidatosRecrutador from './paginas/RecrutadorLIstaCandidatos/RecrutadorLIstaCandidatos.jsx'
import RecrutadorPostarVaga from './paginas/RecrutadorPostarVaga/RecrutadorPostarVaga.jsx'
import Settings from './paginas/Settings/Settings.jsx'
import DicasCarreira from './paginas/DicasCarreira/DicasCarreira.jsx'
import Dica from './paginas/Dica/Dica.jsx'
import CV from './paginas/CV/CV.jsx'
import Salario from './paginas/Salario/Salario.jsx'
import RevisaoCv from './paginas/RevisaoCV/RevisaoCV.jsx'
import Empregadores from './paginas/Empregadores/Empregadores.jsx'
import EmpregadoresDetalhes from './paginas/EmpregadoresDetalhes/EmpregadoresDetalhes.jsx'
import CategoriaDica from './paginas/CategoriaDica/CategoriaDica.jsx'
import EscolherTipo from './paginas/EscolherTipo/EscolherTipo.jsx'
import RecrutadorCriarConta from './paginas/RecrutadorCriarConta/RecrutadorCriarConta.jsx'
import EscolherTipoLogin from './paginas/EscolherTipo/EscolherTipoLogin.jsx'
import LoginCandidato from './paginas/Login/LoginCandidato.jsx'
import PrivateRouteCandidato from './PrivateRouteCandidato/PrivateRouteCandidato.jsx'
import PrivateRouteRecrutador from './PrivateRouteRecrutador/PrivateRoute.jsx'
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ActualizarVaga from './paginas/ActualizarVaga/ActualizarVaga.jsx'
import ForgetPassword from './componentes/ForgetPassword/ForgetPassword.jsx'
import ResetPassword from './componentes/ResetPassword/ResetPassword.jsx'
import UsuarioDetalhes from './paginas/UsuarioDetalhes/UsuarioDetalhes.jsx'
import ActualizarCandidato from './paginas/ActualizarCandidato/ActualizarCandidato.jsx'
import Recrutador1 from './paginas/Recrutador/Recrutador1.jsx'
import VerPerfil from './paginas/UsuarioDetalhes/VerPerfil.jsx'
import VagaEmpregoVaga from './paginas/VagaEmprego/VagaEmpregoVaga.jsx'
import VagaEmpregoPesquisar from './paginas/VagaEmprego/VagaEmpregoPesquisar.jsx'
import DicaPesquisa from './paginas/CategoriaDica/DicaPesquisa.jsx'
import TrabalheConnosco from './paginas/TrabalheConnosco/TrabalheConnosco.jsx'
import SobreNos from './paginas/SobreNos/SobreNos.jsx'
import Contacto from './paginas/Contacto/Contacto.jsx'
import IntroCv from './paginas/IntroCV/IntroCv.jsx'
import TesteVocacional from "./paginas/TesteVocacional/TesteVocacional.jsx"
import TestePerguntas from "./paginas/TestePerguntas/TestePerguntas.jsx"
import CV2 from "./paginas/CV/CV2.jsx"
import CV3 from "./paginas/CV/CV3.jsx"
import CV4 from "./paginas/CV/CV4.jsx"
import PagamentoMpesa from './paginas/PagamentoMpesa/PagamentoMpesa.jsx'

const router = createBrowserRouter([
  {
    path:"/teste-vocacional/perguntas",
    element:<TestePerguntas/>
  },
  {
    path :"/pagamento-mpesa",
  element:<PagamentoMpesa/> },
  {
    path:"/modelo-de-cv-02",
    element:<CV2/>
  },
  {
    path:"/modelo-de-cv-03",
    element:<CV3/>
  },
  {
    path:"/modelo-de-cv-04",
    element:<CV4/>
  },
  {
    path:"/",
    element: <App/>},
    {path:"/reset-password/:id/:token",
      element:<ResetPassword/>
    },
    {
      path:"/teste-vocacional",
      element:<TesteVocacional/>
    },
    {
      path:"/contacto",
      element:<Contacto/>
    },
    {
      path:"/criacao-de-cv",
      element:<IntroCv/>
    },
    {
      element:<SobreNos/>,
      path:"/sobre-nos"
    },
    {
      element:<TrabalheConnosco/>,
      path:"/trabalhe-connosco"
    },
    {path:"/pesquisar-dica/:id",
      element:<DicaPesquisa/>
    },
    {
      path:"/vagas/:category",
      element:<VagaEmpregoVaga/>
    },
    {
      path:"/vagas/pesquisar/:queryPesquisa",
      element:<VagaEmpregoPesquisar/>
    },
    {path:"/candidaturas-vaga/:idVaga",
      element:<Recrutador1/>
    },
    {
      path:"/ver-perfil-candidato/:id",
      element:<VerPerfil/>
    },
    {
      path:"/actualizar-candidato",
      element:<ActualizarCandidato/>
    },
    {
      path:"/meu-perfil",
      element:<UsuarioDetalhes/>
    },
    {
      path:"/esquecer-senha",
      element: <ForgetPassword/>},

      {path:"/reset-password-candidato/:id/:token",
      element:<ResetPassword/>
    },
    {
      path:"/esquecer-senha-candidato",
      element: <ForgetPassword/>},
  {
    path:"/vagas",
    element:<VagaEmprego/>
  },
  {
    path:"/actualizar-vaga/:id",
    element:<ActualizarVaga/>,
    loader: ({params}) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
  },
  {
    path:"/vagas/detalhesdavaga",
    element:<EmpregoDescricao/>
  },
  {
    path:"/escolher-tipo-login/recrutador",
    element:<Login/>
  },
  {
    path:"/escolher-tipo-login/candidato",
    element:<LoginCandidato/>
  },
  {
    path:"/vagas/login",
    element:<Login/>
  },
  {
    path:"/vagas/signup",
    element:<SignUp/>
  },
  {
    path:"/criarcontaCandidato",
    element:<SignUp/>
  },
  {
    path:"/criarcontaRecrutador",
    element:<RecrutadorCriarConta/>
  },
  {
    path:"/recrutador",
    element:<PrivateRouteRecrutador ><Recrutador/></PrivateRouteRecrutador> 
  },
  {
    path:"/candidatos",
    element:<RecrutadorLIstaCandidatosRecrutador/>
  },
  {
    path:"/publicar-vaga",
    element:<RecrutadorPostarVaga/>
  },
  {
    path:"/configuracoes",
    element:<Settings/>
  },
  {
    path:"/dicas-de-carreira",
    element:<DicasCarreira/>
  },
  {
    path:"/dica/:id",
    element:<Dica/>
  },
  {
    path:"/modelo-de-cv-01",
    element:<CV/>
  },
  {
    path:"/salario",
    element:<Salario/>
  },
  {
    path:"/revisao-de-cv",
    element:<RevisaoCv/>
  },
  {
    path:"/empregadores",
    element:<Empregadores/>
  },
  {
    path:"/empregadores-detalhes",
    element:<EmpregadoresDetalhes/>
  },
  {
    path:"/categoria/:id",
    element:<CategoriaDica/>
  },
  {
    path:"/escolherConta",
    element:<EscolherTipo/>
  },
  {
    path:"/escolher-tipo-login",
    element:<EscolherTipoLogin/>
  }
 
 
 
 ])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
     <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <RouterProvider router={router} />
    </PersistGate>
  </Provider>
   
 </React.StrictMode>,
)


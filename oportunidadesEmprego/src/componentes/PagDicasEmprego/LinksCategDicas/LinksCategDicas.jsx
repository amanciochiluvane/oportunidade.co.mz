import './LinksCategDicas.css'
import { Link } from 'react-router-dom'

export default function LinksCategDicas(){
    return(
    <div className='LinksCategDicas'>
       <section>        
                <Link><button className='LinksCategDicasEspecial'>Categorias </button></Link>
               <Link to="/categoria"><button>Busca de Emprego</button></Link>
               <Link to="#"><button>Currículo</button></Link>
                <Link to="#"><button>Desenvolvimento de Carreira</button></Link>
                <Link to="#"><button>Entrevistas</button></Link>
                <Link to="#"><button>Networking</button></Link>
        </section>
    </div>
    )
}
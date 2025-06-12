import estilos from './BarraPg.module.css';
import logo from '../assets/logo_aurorakids_img.png';
import { Link } from 'react-router-dom';

// estrutura basica, o function tem que ser do mesmo nome da pasta
export function BarraPg(){
    return(
        <nav className={estilos.container}>
                <Link to='/inicial'>
                    <p className={estilos.logout}>Home</p>
                </Link>
                 
                <img className={estilos.logo} src={logo} alt="É a logo do projeto" />  

                <Link to="/login">
                    <p className={estilos.logout}>Logout</p>
                </Link>

        </nav>
    )
}
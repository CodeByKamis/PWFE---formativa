import estilos from './BarraNavegacao.module.css';
import logo from '../assets/logo_aurorakids_img.png';
import { Link } from 'react-router-dom';

// estrutura basica, o function tem que ser do mesmo nome da pasta
export function BarraNavegacao(){
    return(
        <nav className={estilos.container}>
                <img  className={estilos.logo} src={logo} alt="É um ícone que representa os professores" />
            <ul className={estilos.navgbarra}>
                <Link className={estilos.navgbarrinha} to="/">
                    <li>HOME</li>
                </Link>
                <Link className={estilos.navgbarrinha} to="faleconosco">
                    <li>FALE CONOSCO</li>
                </Link>
                <Link className={estilos.navgbarrinha} to="login">
                    <li>FAZER LOGIN</li>
                </Link>
            </ul>
            <div className={estilos.nava}>
                <a href="http://">
                    <button className={estilos.navbutton}>Agendar Uma Visita</button>
                </a>

                
                
            </div>
        </nav>
    )
}
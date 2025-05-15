import estilos from './BarraNavegacao.module.css';
import logo from '../assets/logo_aurorakids_img.png';


// estrutura basica, o function tem que ser do mesmo nome da pasta
export function BarraNavegacao(){
    return(
        <nav className={estilos.container}>
                <img  className={estilos.logo} src={logo} alt="É um ícone que representa os professores" />

                <ul className={estilos.navgbarra}>
                    <li className={estilos.navgbarrinha}>HOME</li>
                    <li className={estilos.navgbarrinha}>FALE CONOSCO</li>
                    <li className={estilos.navgbarrinha}>FAZER LOGIN</li>
                </ul>
                <a className={estilos.nava} href="http://">
                    <button className={estilos.navbutton}>Agendar Uma Visita</button>
                </a>
        </nav>
    )
}
import estilos from './Footer.module.css';
import logo from '../assets/logo_aurorakids_img.png';


export function Footer(){
    return(
        <div className={estilos.container}>
            <p className={estilos.footerp}>AURORA</p>
            <img  className={estilos.logo} src={logo} alt="É a logo da escola Aurora Kids" />
            <p className={estilos.footerp}>KIDS</p>
        </div>
    )
}
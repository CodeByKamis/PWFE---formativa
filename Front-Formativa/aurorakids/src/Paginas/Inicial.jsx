import { BarraPg } from "../Componentes/BarraPg";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Menu } from "../Componentes/Menu";
import { Outlet } from "react-router-dom";
import { Footer } from "../Componentes/Footer";
//dar espaço é boa pratica e deve ser cumprida para melhor compreensao
export function Inicial (){
    return(
        <>
            <BarraPg/>
            <Outlet/>
            <Menu/>
            <Footer/>
        </>
    )
}
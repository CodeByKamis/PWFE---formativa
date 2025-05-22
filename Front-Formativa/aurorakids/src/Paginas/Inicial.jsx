import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react--router-dom";
import { Footer } from "../Componentes/Footer";
//dar espaço é boa pratica e deve ser cumprida para melhor compreensao
export function Inicial (){
    return(
        <>
            <BarraNavegacao/>
            <Cabecalho/>
            <Outlet/>
            <Footer/>
        </>
    )
}
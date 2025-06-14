import { BarraPg } from "../Componentes/BarraPg"; //cabecalho da pagina
import { Cabecalho } from "../Componentes/Cabecalho";
import { Menu } from "../Componentes/Menu"; //componente menu
import { Outlet } from "react-router-dom";
import { Footer } from "../Componentes/Footer"; //foooter da pagina
//dar espaço é boa pratica e deve ser cumprida para melhor compreensao
export function Inicial (){
    return(
        <>
        {/* os componentes foram importados para as coisas aparecerem */}
            <BarraPg/>
            <Outlet/>
            <Menu/>
            <Footer/>
        </>
    )
}
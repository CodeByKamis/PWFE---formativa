// o app tem uma estruturação diferente defoult
import { BarraNavegacao } from "./Componentes/BarraNavegacao";
import { Cabecalho } from "./Componentes/Cabecalho";
import { Conteudo } from "./Componentes/Conteudo";
import { Footer } from "./Componentes/Footer"
//dar espaço é boa pratica e deve ser cumprida para melhor compreensao

function App() {

  return (
    <>
      <BarraNavegacao/>
      <Cabecalho/>
      <Conteudo/>
      <Footer/>
    </>
  )
}

export default App

import React from "react"; //importando o react
import  { BrowserRouter } from "react-router-dom"; //para o react controlar as rotas e navegar entre elas
import { Rotas } from "./Rotas/Rotas"; //importando as rotas

function App() {
// puxa as rotas para tudo rodar certo
// browserrouter permite que o react controle as rotas que eu imoportei
  return (
    <>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </>
  )
}

export default App

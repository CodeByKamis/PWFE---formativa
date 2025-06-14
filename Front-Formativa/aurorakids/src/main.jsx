import { StrictMode } from 'react' //contribui para identificar erros no codigo durante o momento de codar
import { createRoot } from 'react-dom/client' //cria o root
import './index.css' //importa a estilização
import App from './App.jsx' //importa o componente principal que é o app
//stricmode vai avisar codigo ruim, erros etc.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

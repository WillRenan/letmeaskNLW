//importando o controlador de página
import { BrowserRouter, Route } from 'react-router-dom';
//importando as páginas do projeto
import { Home } from '../src/pages/Home'
import { NewRoom } from './pages/NewRoom';
//importando autenticação do arquivo AuthContext
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    // '/' rota página Home
    //'/room/new' ''rota página NewRoom

    <BrowserRouter>
      <AuthContextProvider>
        < Route path="/" exact component={Home} />
        < Route path="/room/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>


  );
}

export default App;

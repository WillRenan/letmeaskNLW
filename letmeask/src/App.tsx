//importando o controlador de página
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//O COMANDO SWITCH é pra não deixar que mais de uma rota seja chamada ao mesmo tempo
//importando as páginas do projeto
import { Home } from '../src/pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { AdminRoom } from './pages/AdminRoom';
//importando autenticação do arquivo AuthContext
import { AuthContextProvider } from './context/AuthContext';



function App() {
  return (
    // '/' rota página Home
    //'/room/new' ''rota página NewRoom

    <BrowserRouter>
      <AuthContextProvider>
        <Switch> 
          < Route path="/" exact component={Home} />
          < Route path="/room/new"  component={NewRoom} />
          < Route path="/rooms/:id"  component={Room} /> 

          < Route path="/admin/rooms/:id"  component={AdminRoom} /> 
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>


  );
}

export default App;

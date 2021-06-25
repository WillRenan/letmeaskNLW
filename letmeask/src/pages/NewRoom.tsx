//imagens
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


//styles
import '../styles/auth.scss';

//botão
import { Button } from '../components/Button';

//importando router para navegação desse componente
import { Link, useHistory } from 'react-router-dom'

//importando o AuthContext
import { useAuth } from '../hooks/useAuth';
//importes do React
import{ FormEvent, useState} from 'react'
import { database } from '../services/firebase';


export function NewRoom() {
  const { user } = useAuth();// pegando o valor que está no contexto do de TestContext em App.tsx
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event:FormEvent ) {
    
    event.preventDefault();//tirando o comportamento padrão do formulário
      //console.log(newRoom);
      if (newRoom.trim() ==='') {
        return;
      }
      const roomRef = database.ref('rooms'); //criando salas no firebase
      const firebaseRoom = await roomRef.push({ //adicionando coisas na salas
          title: newRoom,
          authorId: user?.id,
      })

      history.push(`/rooms/${firebaseRoom.key}`);//Redirecionando para uma pagina com o final igual a chave da sala criada
  }
  return (
      <div id="page-auth">
        <aside>
          <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
          <strong>Toda pergunta tem uma resposta</strong>
          <p>Aprenda e compartilhe conhecimento com outras pessoas</p>

        </aside>
        <main>

          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <h2>Criar uma nova sala</h2>
            <form  onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="Nome da sala"
                onChange ={ event => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">
                Criar sala
              </Button>

            </form>
            <p>
              Quer entrar em uma sala ja existente? <Link to="/">Clique aqui</Link>

            </p>
          </div>
        </main>
      </div>
    )
}
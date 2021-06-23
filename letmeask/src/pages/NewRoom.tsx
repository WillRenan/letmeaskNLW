//imagens
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


//styles
import '../styles/auth.scss';

//botão
import { Button } from '../components/Button';

//importando router para navegação desse componente
import { Link } from 'react-router-dom'

//importando o AuthContext
import { useAuth } from '../hooks/useAuth';


export function NewRoom() {
  const { user } = useAuth();// pegando o valor que está no contexto do de TestContext em App.tsx
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
          <form >
            <input
              type="text"
              placeholder="Nome da sala"
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
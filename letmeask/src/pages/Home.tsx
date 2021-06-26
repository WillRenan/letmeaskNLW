//imagens
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//botão
import { Button } from '../components/Button';

//styles
import '../styles/auth.scss';

//importando router para navegação desse componente
import { useHistory } from 'react-router-dom';

//importando o AuthContext 
import { useAuth } from '../hooks/useAuth';

//import React
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';



export function Home() {
  const history = useHistory(); // toda função que comece com 'use' tem que estar  dentro do componente, pois faz uso de informações do contexto do componente
  const { user, singInWithGoogle } = useAuth();
  const [roomCode,setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push('/room/new');
  }
  async function handleJoinRoom(event: FormEvent ) { //entrar em uma sala
    event.preventDefault();
    if (roomCode.trim() === '') {
      return;
    }

    const roomRef =   await database.ref(`rooms/${roomCode}`).get();// vai pegar(.get()) os dados da sala digitada pelo usuário

    if (!roomRef.exists()) { // Verificação se a sala exite
       alert('Room does not exists.')
       return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.')
      return;
    }
    history.push(`rooms/${roomCode}`);//caso exista a sala será redirecionado para ela

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit= {handleJoinRoom} >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange = { event=> setRoomCode(event.target.value)}
              value = {roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
}
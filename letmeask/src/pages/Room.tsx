//import assets
import logoImg from '../assets/images/logo.svg'
//importando toast do React-hot-toast
import toast, { Toaster } from 'react-hot-toast';
//importando botão
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
//import style
import '../styles/room.scss'
//import para pegar parâmetros passados pelas rotas do react-router-dom
import{ useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react';
//importando autenticador de usuário
import { useAuth } from '../hooks/useAuth';
//import firebase
import { database } from '../services/firebase';



import { Questions } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';
//tipagens manuais
type RoomParams ={
  id:string;
}






export function Room(){
  //toast
  const notify = () => toast.success('Message sent successfully!'); 
  //
  const { user } = useAuth();
  const params = useParams<RoomParams>();//pegando parâmetros
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id; // id da sala

  //hook de questões
  const {questions,title} = useRoom( roomId);
  

  

    async function handleSendQuestion( event: FormEvent){//essa função será chamada pelo form/textarea 
      event.preventDefault();//parando comportamento padrão do evento
      if (newQuestion.trim() === '') {
        return;
      }

      if (!user)  {
        throw new Error ('You must  be logged in ');
      }

      const question = {
        content: newQuestion,
        author:{
          name: user.name,
          avatar:user.avatar
        },
        isHighLighted: false,
        isAnswered: false
      }

      await database.ref(`rooms/${roomId}/questions`).push(question);//entrando do banco de dados e colocando  a question dentro
      setNewQuestion('');
    }

    async function handleLikeQuestion(questionId:string, likeId:string | undefined) {

      /* await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        author: user?.id, //olha essa parte aqui para adicionar o like
      }) */
       
       if (likeId) {
        //remover o like
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
      
      }else{
         await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
          author: user?.id,
        })
      }
    } 
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return(
    
    <div id="page-room">
      
     
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code = {roomId}></RoomCode>
        </div>
      </header>
      <main >
        <div className="room-title">
          <h1>Sala {title}</h1>
         { questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}
        </div>
          <form  onSubmit={handleSendQuestion}>
            <textarea  
            placeholder=" O  que vc quer perguntar?"
            onChange={ event =>setNewQuestion(event.target.value)}
            value = {newQuestion}
            />
            <div className="form-footer">
              {user  ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>Para enviar sua pergunta, <button>faça login</button> </span>
              )}
              <Button onClick={notify} type="submit"  disabled = {!user} >Enviar Pergunta </Button>
              
              <Toaster //Configurações de toast ? pesquisar como fazer isso em outro arquivo?
                 position="top-center"
                 reverseOrder={false}
                 gutter={8}
                 containerClassName=""
                 containerStyle={{}}
                 toastOptions={{
                   // Define default options
                   className: '',
                   duration: 5000,
                   style: {
                     background: '#363636',
                     color: '#fff',
                   },
                   // Default options for specific types
                   success: {
                     duration: 3000,
                     theme: {
                       primary: 'green',
                       secondary: 'black',
                     },
                   },
                 }}
              />
      
            </div>
          </form>
          <div className="question-list">
              {questions.map(question =>{
                return(
                  <Questions 
                    key = {question.id}//para identificar as questions
                    content ={question.content}
                    author={question.author}
                  >
                    <button 
                      //className ={`like-button ${question.hasLiked ? 'liked': ''}`}//não muda de cor com o hasLiked
                      className={`like-button ${question.likeId ? 'liked' : ''}`}//não muda de cor com o hasLiked
                      type ="button"
                      area-aria-label = "Marcar como gostei"
                      onClick = {()=> handleLikeQuestion(question.id, question.likeId)}//chamando a função de like
                      > 
                      {question.likeCount > 0 && <span>{question.likeCount}</span>}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                                            
                    </button>

                  </Questions>
                )
              })}
          </div>
        
      </main>
    </div>
  );
}
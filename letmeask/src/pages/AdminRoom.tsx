//import assets
import logoImg from '../assets/images/logo.svg';
import deleImage from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

//importando toast do React-hot-toast
//import toast, { Toaster } from 'react-hot-toast';
//importando botão
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
//import style
import '../styles/room.scss'
//import para pegar parâmetros passados pelas rotas do react-router-dom
import{ useHistory, useParams } from 'react-router-dom';
//import { FormEvent, useState } from 'react';
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

export function AdminRoom(){
  //hookie de questoes
  const history = useHistory();
  const {user} = useAuth();
  const params = useParams<RoomParams>();//pegando parâmetros
  const roomId = params.id; // id da sala
  const {questions,title} = useRoom( roomId);

  async function handleEndRoom() { //função para deletar sala
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push(`/`);
  }

  async function handleDeleteQuestion(questionId:string){ //função para poder remover perguntas
    if (window.confirm(' Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  } 

  async function handleCheckQuestionAsAnswered(questionId:string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered:true,
    });
  }

  async function handleHighlighQuestion(questionId:string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted:true,
    });
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return(
    
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code = {roomId}></RoomCode>
            <Button isOutlined onClick = {handleEndRoom}> Encerrar Sala</Button>
          </div> 
        </div> 
      </header>

      <main >
        <div className="room-title">
          <h1>Sala {title}</h1>
         { questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
              {questions.map(question =>{
                return(
                  <Questions 
                    key = {question.id}//para identificar as questions
                    content ={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighLighted={question.isHighLighted}
                  >
                    { !question.isAnswered && 
                      (<> {/* fragmento que não aparece no HTML da pagina*/}
                        <button
                      type="button"
                      onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida." />
                    </button>


                    <button
                      type="button"
                      onClick={()=> handleHighlighQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à uma pergunta." />
                    </button>
                      </>)

                    }


                    <button
                      type="button"
                      onClick={()=> handleDeleteQuestion(question.id)}
                    >
                      <img src={deleImage} alt="Deletar pergunta." />
                    </button>
                  </Questions>
                )
              })}
          </div>
      </main>
    </div>
  );
}
//import imagem copy  
import copyImg from '../assets/images/copy.svg';
//import style
import '../styles/room-code.scss';


type RoomCodeProps = {
  code: string;
}

export function RoomCode( props: RoomCodeProps ){

  function copyRoomCodeToClipBoard(){
    navigator.clipboard.writeText(props.code);//API do navegador para copiar para a memória temporária
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return(
    <button className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
        
      </div>
      <span> Sala #{props.code}</span>
    </button>
  )
}
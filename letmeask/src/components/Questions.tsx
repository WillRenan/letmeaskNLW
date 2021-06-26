//import pacotes de classmanes 
import cx from 'classnames';

//import style
import { ReactNode } from 'react';
import '../styles/question.scss';
type  QuestionProps ={
  content : string;
  author :{
    name:string;
    avatar:string;
  };
  children?:ReactNode;
  isAnswered?:boolean;
  isHighLighted?:boolean;
}
export function Questions({
  content,
  isAnswered=false,
  isHighLighted=false,
  author ,
  children
}: QuestionProps){
  return(
    <div 
      className={cx( //cx controlador de classes
        'question',
        {answered: isAnswered},
        {highlighted: isHighLighted && !isAnswered},
      )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name }</span>
        </div>

        <div className="btn">
          {children}
        </div>
      </footer>
    </div>

  );
}
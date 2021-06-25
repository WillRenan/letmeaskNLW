import { ButtonHTMLAttributes } from "react";  //importando todos os atributos que um botãoo pode receber
import '../styles/buttonStyle.scss'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined ?: boolean
};
export function Button({isOutlined = false , ...props}: ButtonProps) {
  return (
    <button className={`button  ${isOutlined ? 'outlined' :  '' } `} 
    {...props} /> // utilizando o ...props vai adicionar ao botão os atibutos passasdos para ele
  )
}



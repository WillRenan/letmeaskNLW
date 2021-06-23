import { ButtonHTMLAttributes } from "react";  //importando todos os atributos que um botãoo pode receber
import '../styles/buttonStyle.scss'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props} /> // utilizando o ...props vai adicionar ao botão os atibutos passasdos para ele
  )
}
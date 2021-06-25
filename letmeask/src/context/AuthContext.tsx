//importando contextos
import { createContext, ReactNode, useEffect } from 'react';

//importando função pra criar estados
import { useState } from 'react';

//importando firebase
import { auth, firebase } from '../services/firebase'
import { error } from 'console';

//criando tipagem para o Usuário
type User = {
  id: string;
  name: string;
  avatar: string;
}
//criando tipagem  pra o AuthContext por estar usando typescript
type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
//criando contexto
export const AuthContext = createContext({} as AuthContextType); // inicializando o contexto dizendo que tipo de dados ele vai receber, esse caso um objeto

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>(); // criando estado para AuthContext

  useEffect(() => { //pegando e verificando se o login ta feito ou n
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;//pegando nome, foto e id do usuário


        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])


  async function singInWithGoogle() { //função de login

    //fazendo autenticação com o Firebase
    const provider = new firebase.auth.GoogleAuthProvider(); // pegando autenticação do google com o Firebase
    const result = await auth.signInWithPopup(provider);//abrindo Popup na janela do usuário

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;//pegando nome, foto e id do usuário


      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }//abrir um popup para o usuário fazer o login dele na conta do google

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>

  );
}
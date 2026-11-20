import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebaseConfig';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import InicioScreen from './src/screens/InicioScreen';
import TarefasScreen from './src/screens/TarefasScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const parar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
    return parar;
  }, []);

  if (carregando) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <>
            <Stack.Screen name="Inicio" component={InicioScreen}
              options={{ title: 'Mural da Turma' }} />
            <Stack.Screen name="Tarefas" component={TarefasScreen}
              options={{ title: 'Minhas tarefas' }} />
            <Stack.Screen name="Chat" component={ChatScreen}
              options={{ title: 'Chat da turma' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen}
              options={{ title: 'Entrar' }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen}
              options={{ title: 'Criar conta' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

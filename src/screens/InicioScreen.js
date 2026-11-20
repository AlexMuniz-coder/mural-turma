import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import styles from '../styles';

export default function InicioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const usuario = auth.currentUser;

  useEffect(() => {
    const ref = doc(db, 'usuarios', usuario.uid);
    const parar = onSnapshot(ref, (snap) => {
      if (snap.exists()) setNome(snap.data().nome);
    }, (e) => console.log(e.code));
    return parar;
  }, []);

  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>Olá, {nome}!</Text>
      <Text style={styles.item}>{usuario.email}</Text>
      <Button title="Minhas tarefas"
        onPress={() => navigation.navigate('Tarefas')} />
      <Button title="Chat da turma"
        onPress={() => navigation.navigate('Chat')} />
      <Button title="Sair" onPress={() => signOut(auth)} />
    </View>
  );
}

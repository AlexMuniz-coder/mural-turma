import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { mensagemErro } from '../erros';
import styles from '../styles';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');

  async function cadastrar() {
    try {
      const cred = await createUserWithEmailAndPassword(
        auth, email, senha);
      await updateProfile(cred.user, { displayName: nome });
      await setDoc(doc(db, 'usuarios', cred.user.uid), {
        nome: nome,
        email: email,
        criadoEm: serverTimestamp(),
      });
    } catch (e) {
      setAviso(mensagemErro(e));
    }
  }

  return (
    <View style={styles.centro}>
      <TextInput style={styles.campo} placeholder="Nome"
        value={nome} onChangeText={setNome} />
      <TextInput style={styles.campo} placeholder="E-mail"
        value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.campo}
        placeholder="Senha (6 caracteres ou mais)"
        value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Criar conta" onPress={cadastrar} />
      <Text style={styles.aviso}>{aviso}</Text>
    </View>
  );
}

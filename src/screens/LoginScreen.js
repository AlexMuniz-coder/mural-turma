import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { mensagemErro } from '../erros';
import styles from '../styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');

  async function entrar() {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (e) {
      setAviso(mensagemErro(e));
    }
  }

  async function esqueciSenha() {
    try {
      await sendPasswordResetEmail(auth, email);
      setAviso('Enviamos um link para o seu e-mail.');
    } catch (e) {
      setAviso(mensagemErro(e));
    }
  }

  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>Mural da Turma</Text>
      <TextInput style={styles.campo} placeholder="E-mail"
        value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.campo} placeholder="Senha"
        value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={entrar} />
      <Button title="Criar conta"
        onPress={() => navigation.navigate('Cadastro')} />
      <Button title="Esqueci a senha" onPress={esqueciSenha} />
      <Text style={styles.aviso}>{aviso}</Text>
    </View>
  );
}

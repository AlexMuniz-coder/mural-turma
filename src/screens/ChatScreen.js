import { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList,
} from 'react-native';
import {
  ref, push, set, remove, onValue, onDisconnect, serverTimestamp,
} from 'firebase/database';
import { auth, rtdb } from '../firebaseConfig';
import styles from '../styles';

export default function ChatScreen() {
  const [texto, setTexto] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [online, setOnline] = useState(0);
  const usuario = auth.currentUser;
  const nome = usuario.displayName || usuario.email;

  useEffect(() => {
    const pararChat = onValue(ref(rtdb, 'chat'), (snap) => {
      const dados = snap.val() || {};
      setMensagens(Object.entries(dados)
        .map(([id, m]) => ({ id, ...m })));
    });
    const pararOnline = onValue(ref(rtdb, 'online'), (snap) => {
      setOnline(snap.size);
    });
    const presenca = ref(rtdb, 'online/' + usuario.uid);
    set(presenca, nome);
    onDisconnect(presenca).remove();
    return () => {
      pararChat();
      pararOnline();
      remove(presenca);
    };
  }, []);

  function enviar() {
    if (!texto.trim()) return;
    push(ref(rtdb, 'chat'), {
      nome: nome,
      texto: texto,
      enviadaEm: serverTimestamp(),
    });
    setTexto('');
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.item}>{online} pessoa(s) online</Text>
      <FlatList data={mensagens} keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nome}: {item.texto}</Text>
        )} />
      <TextInput style={styles.campo} placeholder="Mensagem"
        value={texto} onChangeText={setTexto} />
      <Button title="Enviar" onPress={enviar} />
    </View>
  );
}

import { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList, Pressable,
} from 'react-native';
import {
  collection, addDoc, onSnapshot, query, orderBy,
  doc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import styles from '../styles';

export default function TarefasScreen() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const uid = auth.currentUser.uid;
  const tarefasRef = collection(db, 'usuarios', uid, 'tarefas');

  useEffect(() => {
    const q = query(tarefasRef, orderBy('criadaEm', 'desc'));
    const parar = onSnapshot(q, (snap) => {
      setTarefas(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (e) => console.log(e.code));
    return parar;
  }, []);

  async function adicionar() {
    if (!texto.trim()) return;
    await addDoc(tarefasRef, {
      texto: texto,
      feita: false,
      criadaEm: serverTimestamp(),
    });
    setTexto('');
  }

  function alternar(tarefa) {
    updateDoc(doc(tarefasRef, tarefa.id), { feita: !tarefa.feita });
  }

  function apagar(tarefa) {
    deleteDoc(doc(tarefasRef, tarefa.id));
  }

  return (
    <View style={styles.tela}>
      <TextInput style={styles.campo} placeholder="Nova tarefa"
        value={texto} onChangeText={setTexto} />
      <Button title="Adicionar" onPress={adicionar} />
      <FlatList data={tarefas} keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => alternar(item)}
            onLongPress={() => apagar(item)}>
            <Text style={item.feita ? styles.feita : styles.item}>
              {item.texto}
            </Text>
          </Pressable>
        )} />
    </View>
  );
}

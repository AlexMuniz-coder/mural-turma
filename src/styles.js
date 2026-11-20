import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 12 },
  centro: {
    flex: 1, justifyContent: 'center', padding: 24, gap: 12,
  },
  campo: {
    borderWidth: 1, borderColor: '#999', borderRadius: 8,
    padding: 10,
  },
  titulo: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  item: { fontSize: 18, paddingVertical: 8 },
  feita: {
    fontSize: 18, paddingVertical: 8, color: '#999',
    textDecorationLine: 'line-through',
  },
  aviso: { color: '#C62828', textAlign: 'center' },
});

export default styles;

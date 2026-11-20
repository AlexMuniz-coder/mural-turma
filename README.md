# Mural da Turma

App da prática guiada de Desenvolvimento Híbrido: Firebase Authentication, Cloud Firestore e Realtime Database no React Native com Expo.

## O que o app faz

- **Authentication**: criar conta, entrar, "esqueci a senha" e sair. O login continua salvo depois de fechar o app.
- **Firestore**: cada usuário tem a sua lista de tarefas em `usuarios/{uid}/tarefas`. Toque marca como feita; toque longo apaga.
- **Realtime Database**: chat da turma e contador de quem está online.

## Arquivos

```
mural-turma
  App.js                     navegação e controle de login
  firestore.rules            regras do Firestore (colar no console)
  database.rules.json        regras do Realtime Database (colar no console)
  src
    firebaseConfig.js        conexão com o Firebase (preencher)
    styles.js                estilos das telas
    erros.js                 mensagens de erro em português
    screens
      LoginScreen.js
      CadastroScreen.js
      InicioScreen.js
      TarefasScreen.js
      ChatScreen.js
```

## Como rodar

1. Instale as dependências:

   ```
   npm install
   ```

2. No console do Firebase (console.firebase.google.com):
   - crie um projeto e registre um app **Web** (ícone `</>`);
   - em **Authentication > Sign-in method**, ative **E-mail/senha**;
   - crie o **Firestore Database** (modo de produção) e o **Realtime Database** (modo bloqueado);
   - em **Configurações do projeto > Seus apps**, copie o `firebaseConfig`. Ele precisa ter o campo `databaseURL`.

3. Abra `src/firebaseConfig.js` e troque os `'...'` pelos valores do seu `firebaseConfig`.

4. Publique as regras:
   - **Firestore Database > Regras**: cole o conteúdo de `firestore.rules` e clique em Publicar;
   - **Realtime Database > Regras**: cole o conteúdo de `database.rules.json` e clique em Publicar.

5. Rode o app e abra no Expo Go:

   ```
   npx expo start
   ```

## Erros comuns

| Mensagem | O que fazer |
|---|---|
| `auth/operation-not-allowed` | Ative E-mail/senha em Authentication > Sign-in method |
| `Missing or insufficient permissions` | Publique as regras do Firestore |
| `PERMISSION_DENIED` | Publique as regras do Realtime Database |
| `Can't determine Firebase Database URL` | Falta `databaseURL` no `firebaseConfig` |
| Erro de módulo ao abrir | Rode `npx expo start -c` para limpar o cache |

## Versões

Projeto criado com `create-expo-app` (modelo blank), Expo SDK 58, firebase 13. Para conferir as versões compatíveis com o seu Expo, rode `npx expo install --check`.

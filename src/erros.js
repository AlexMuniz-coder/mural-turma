const MENSAGENS = {
  'auth/email-already-in-use': 'Este e-mail já tem conta.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/weak-password': 'Use uma senha com 6 caracteres ou mais.',
  'auth/missing-password': 'Digite a senha.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Espere um pouco.',
};

export function mensagemErro(e) {
  return MENSAGENS[e.code] || e.message;
}

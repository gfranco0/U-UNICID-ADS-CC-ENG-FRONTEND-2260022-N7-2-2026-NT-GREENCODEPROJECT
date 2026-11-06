# Evidências e testes — CicloBairro

## Verificações automatizadas realizadas no ambiente de desenvolvimento
- Dez documentos HTML identificados e com `lang="pt-BR"`.
- Verificação estrutural: um `h1` e um `main` por página; IDs sem duplicação; textos alternativos nas imagens; campos com labels.
- Links internos e referências a arquivos locais inspecionados.
- JavaScript validado com `node --check`.
- Testes de navegador: carregamento das dez páginas, menu mobile, filtro, mensagens do formulário, validação de campos, preferências e rascunho em armazenamento local no ambiente de teste.

## Limitações do teste
O teste automatizado do navegador utilizou um ambiente de simulação para carregar os arquivos locais. A persistência deve ser confirmada novamente em um navegador comum, com servidor local ou publicação.

## Pendências antes da entrega
- Executar o Nu HTML Checker nas dez páginas e corrigir erros e avisos relevantes.
- Testar manualmente navegação apenas por teclado, foco, zoom e leitor de tela.
- Revisar contraste com ferramenta apropriada e verificar WCAG 2.2 AA nos critérios aplicáveis.
- Testar vídeo, áudio, iframe e transcrição em dispositivos reais.
- Testar formulário inválido e válido, recarregar a página e confirmar rascunho local.
- Verificar todos os links após publicação HTTPS.
- Guardar capturas de tela desktop e mobile da versão publicada.

Não declarar “zero erros W3C” ou “certificado WCAG” antes da verificação formal.

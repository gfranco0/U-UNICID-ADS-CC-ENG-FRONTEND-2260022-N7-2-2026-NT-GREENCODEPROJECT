# Publicação com GitHub Pages

O repositório contém arquivos de configuração para publicar o site por GitHub Actions após o merge do pull request.

## Passos
1. Abra o repositório no GitHub e entre em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça merge do pull request do CicloBairro na branch `main`.
4. Abra **Actions** e acompanhe a execução de **Publicar CicloBairro no GitHub Pages**.
5. Quando o fluxo terminar com sucesso, acesse o endereço mostrado na execução. Em geral será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
6. Confirme HTTPS e teste as dez páginas, os arquivos de mídia e o formulário.

## Antes de entregar
- Atualize o README com a URL pública.
- Verifique todos os links na versão publicada.
- Confirme que o ZIP entregue corresponde ao mesmo código publicado.
- Não registre commits ou contribuições em nome de colegas: cada integrante deve fazer commits reais com a própria conta, conforme a orientação da disciplina.
- Guarde capturas de tela da home em desktop e celular.

Se o fluxo falhar, leia a mensagem em **Actions → workflow run → job**. Não declare o site publicado até que o endereço abra sem erro.


# Aplicativo de Gerenciamento de Vagas para Motos com RFID

## Integrantes

- Guilherme Jardim - RM556814  
- Fernando Fontes - RM555317  

---

## Descrição do Projeto

Este aplicativo foi desenvolvido para solucionar o problema da empresa Mottu, que necessita de um sistema eficiente para gerenciamento de vagas de motos utilizando tecnologia RFID. A solução permite:

- Cadastro de motos com placa, vaga, e RFID;
- Visualização dinâmica do mapa de vagas com indicação das vagas ocupadas;
- Atualização automática do mapa conforme motos são cadastradas ou removidas;
- Tela sobre o projeto e seus integrantes;
- Navegação intuitiva entre as telas.

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão recomendada >= 16)
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Android Studio ou Xcode para emuladores, ou dispositivo físico com Expo Go instalado

### Passos para execução

1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Entre na pasta do projeto:
   ```bash
   cd <NOME_DA_PASTA_DO_PROJETO>
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor do Expo:
   ```bash
   npm start
   ```

5. Rode o app em um emulador ou dispositivo físico:
   - Para Android: use um emulador ou abra o app Expo Go no dispositivo e escaneie o QR code.
   - Para iOS: use um simulador ou dispositivo físico com Expo Go e escaneie o QR code.

---

## Estrutura do Projeto

- `screens/` — Telas principais da aplicação (Lista, Mapa, Sobre, etc.)
- `components/` — Componentes reutilizáveis como o HeaderCustom
- `assets/` — Imagens e recursos estáticos
- `App.js` — Entrada principal da aplicação

---

## Considerações Finais

Este projeto integra conceitos de React Native, AsyncStorage para armazenamento local e navegação via React Navigation. O mapa de vagas é atualizado automaticamente com base nas motos cadastradas, garantindo uma visão em tempo real do uso do espaço.

---

Se tiver dúvidas ou sugestões, fique à vontade para entrar em contato!

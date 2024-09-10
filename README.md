# Vite Project

Este projeto utiliza o **Vite** como ferramenta de build para desenvolvimento rápido de aplicações frontend. A seguir estão as instruções para configurar e rodar o projeto localmente.

## Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn** para gerenciamento de pacotes

## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local.

1. **Clone o repositório**:

   Execute o comando abaixo para clonar o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. **Instalar dependências**:

   Após clonar o repositório, instale as dependências do projeto executando:

   - Com **npm**:

     ```bash
     npm install
     ```

   - Com **yarn**:
     ```bash
     yarn install
     ```

## Executando o Projeto

Após a instalação das dependências, você pode rodar o projeto em modo de desenvolvimento ou buildá-lo para produção.

### Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

- Com **npm**:

  ```bash
  npm run dev
  ```

- Com **yarn**:
  ```bash
  yarn dev
  ```

Por padrão, o projeto estará acessível em `http://localhost:5173/`.

### Build para Produção

Para gerar os arquivos otimizados para produção, execute o comando:

- Com **npm**:

  ```bash
  npm run build
  ```

- Com **yarn**:
  ```bash
  yarn build
  ```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Servir Arquivos de Produção

Se quiser servir os arquivos de produção localmente para teste, execute:

- Com **npm**:

  ```bash
  npm run serve
  ```

- Com **yarn**:
  ```bash
  yarn serve
  ```

# 🎮 Game Backlog

Aplicação web full-stack para gerenciar sua biblioteca de jogos — busque qualquer jogo, adicione à sua coleção e acompanhe seu progresso com status, avaliação e notas pessoais.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

---

## 📸 Preview

> Busque jogos pela RAWG API, adicione à sua biblioteca e gerencie sua coleção com uma interface dark minimalista.

---

## ✨ Funcionalidades

- 🔍 Busca de jogos pelo nome via RAWG API
- ➕ Adição de jogos à biblioteca pessoal
- 📊 Gerenciamento de status (Quero jogar, Jogando, Zerado, Abandonado)
- ⭐ Avaliação de 1 a 5 e notas pessoais
- 🔃 Ordenação da biblioteca por nome, status ou avaliação
- ✏️ Edição e remoção de jogos
- 💾 Persistência de dados em PostgreSQL

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Banco de Dados | PostgreSQL |
| Cliente HTTP | Axios |
| Templating | EJS |
| Estilização | CSS3 |
| Fonte de dados | RAWG API |
| Deploy | Render |

---

## 📁 Estrutura do Projeto

```
game-backlog/
│
├── db/
│   └── pool.js              # Configuração do pool de conexões PostgreSQL
│
├── public/
│   ├── css/
│   │   └── style.css        # Estilos globais
│   └── js/
│       └── search.js        # Busca e renderização de resultados no cliente
│
├── routes/
│   └── games.js             # Rotas Express (CRUD completo)
│
├── views/
│   ├── index.ejs            # Página principal — busca e biblioteca
│   └── edit.ejs             # Formulário de edição de jogo
│
├── index.js                 # Ponto de entrada do servidor
├── package.json
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js v18+
- PostgreSQL
- Chave de API gratuita em [rawg.io](https://rawg.io/apidocs)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/GuilhermeAlves58/Game-Backlog

# Acesse a pasta do projeto
cd game-backlog

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=game_backlog
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
RAWG_API_KEY=sua_chave_rawg
```

### Banco de Dados

Execute o seguinte SQL no PostgreSQL para criar a tabela:

```sql
CREATE TABLE games(
    id SERIAL PRIMARY KEY,
    rawg_id INT,
    nome VARCHAR(255),
    capa_url VARCHAR(255),
    status VARCHAR(20),
    notas_pessoais VARCHAR(100),
    avaliacao INT,
    data_adicionado DATE DEFAULT CURRENT_DATE
);
```

### Executando localmente

```bash
node index.js
```

Acesse em **http://localhost:3000**

---

## 🔌 API Utilizada

Este projeto utiliza a [RAWG API](https://rawg.io/apidocs) — gratuita com cadastro, até 20.000 requisições/mês.

| Endpoint | Uso |
|---|---|
| `/api/games?search={nome}&key={key}` | Busca jogos pelo nome |

Campos utilizados: `id`, `name`, `background_image`

---

## 💡 Decisões Técnicas

- **PostgreSQL com pg.Pool** — o pool reutiliza conexões abertas, evitando overhead de criar uma nova conexão a cada requisição.
- **Validação do ORDER BY** — o valor de ordenação é verificado contra uma lista de colunas permitidas antes de ser interpolado no SQL, prevenindo SQL injection.
- **POST para deletar** — formulários HTML não suportam o método DELETE nativamente, então a rota de remoção usa POST `/delete/:id`.
- **Dados da API como campos ocultos** — nome, capa e id da RAWG são enviados via `<input type="hidden">` no formulário, evitando uma segunda chamada à API na hora de salvar.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `node index.js` | Inicia o servidor em modo produção |

---

## 🌐 Deploy

Acesse a aplicação em produção: [https://game-backlog-zy2v.onrender.com](#)

---

## 📝 Licença

Projeto desenvolvido como parte de um curso de desenvolvimento web full-stack. Sinta-se à vontade para usar como referência.

# Dashboard Financeiro

Um dashboard web para controle financeiro pessoal, desenvolvido com HTML, CSS e JavaScript puro. Esta aplicação permite que você gerencie suas receitas e despesas, visualize gráficos de gastos e acompanhe sua evolução financeira.

## 🚀 Funcionalidades

- **Autenticação de Usuário**
  - Sistema de login básico (simulado)
  - Proteção de rotas

- **Gerenciamento de Transações**
  - Cadastro de receitas e despesas
  - Categorização de gastos
  - Registro de data e descrição
  - Valores em reais (R$)

- **Visualização de Dados**
  - Saldo atual
  - Gráfico de pizza: gastos por categoria
  - Gráfico de linha: evolução do patrimônio
  - Lista das últimas 5 transações

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 4.5.2
- Chart.js
- Font Awesome 5.15.4

## 📦 Como Usar

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/dashboard-beta.git
```

2. Abra o arquivo `index.html` em seu navegador

3. Faça login com qualquer usuário e senha (sistema simulado)

4. Comece a adicionar suas transações financeiras

## 💻 Estrutura do Projeto

```
dashboard-beta/
├── index.html      # Interface principal
├── script.js       # Lógica da aplicação
└── README.md       # Este arquivo
```

## 🔒 Armazenamento

Os dados são salvos localmente no navegador usando `localStorage`. Em um ambiente de produção, recomenda-se implementar um backend para armazenamento seguro dos dados.

## 🎨 Interface

- Design responsivo
- Menu lateral com navegação
- Formulário intuitivo para cadastro de transações
- Visualização clara de dados através de gráficos
- Cores intuitivas (verde para receitas, vermelho para despesas)

## 🔄 Próximas Melhorias

- [ ] Implementar filtros por período
- [ ] Adicionar exportação de relatórios
- [ ] Criar sistema de metas financeiras
- [ ] Implementar alertas de gastos excessivos
- [ ] Permitir categorias personalizadas
- [ ] Adicionar autenticação real com backend
- [ ] Implementar sistema de backup dos dados

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Contribuições são sempre bem-vindas! Por favor, leia o guia de contribuição antes de enviar um pull request.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor, abra uma issue no repositório. 
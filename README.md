# Gerenciado de Pedidos

## Descrição

Esta é uma aplicação web desenvolvida utilizando Node.js como plataforma principal, Express como framework web, EJS como engine de visualização, Bootstrap para estilos, Express Session para gerenciamento de sessões, SQLite como banco de dados e Sequelize como ORM.

A aplicação é uma estrutura básica para começar um projeto web utilizando estas tecnologias. Você pode expandir e personalizar conforme suas necessidades específicas.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

## Instalação

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
     

2. **Navegue até o diretório do projeto:**
   ```bash
   cd seu-repositorio
   

3. **Instale as dependências:**
   ```bash
   npm install
   

4. **Execute a aplicação:**
   ```bash
   npm start
   

A aplicação estará disponível em http://localhost:8081.(pode ser alterado no app.js)

## Estrutura do Projeto
- /public: Contém arquivos estáticos como CSS, JavaScript e imagens.
- /views: Armazena os arquivos EJS para renderização de páginas.
- /Config: Define as rotas, páginas e etc.
- /Models: Contém os modelos Sequelize para interagir com o banco de dados.
- /Controllers: Lida com a lógica de controle das rotas.
- app.js: Ponto de inicialização da aplicação.
## Configuração do Banco de Dados
O arquivo Database/db.js contém as configurações do banco de dados. Certifique-se de ajustar conforme suas necessidades.

Licença
````
Reconhecimentos e Direitos Autorais
@autores: André Luís Costa dos Santos de Sousa Maciel, Gildson Souza Aguiar, José Vinícius Reis de Almeida, Thiago Bastos Santos
@data última versão: 09/12/2023
@versão: 1.0
@Agradecimentos: Universidade Federal do Maranhão (UFMA), Professor Doutor Thales Levi Azevedo Valente, e colegas de curso.
@Copyright/License
Este material é resultado de um trabalho acadêmico para a disciplina PROJETO E DESENVOLVIMENTO DE SOFTWARE, sobre a orientação do professor Dr. THALES LEVI AZEVEDO VALENTE, semestre letivo 2023.2, curso Engenharia da Computação, na Universidade Federal do Maranhão (UFMA). Todo o material sob esta licença é software livre: pode ser usado para fins acadêmicos e comerciais sem nenhum custo. Não há papelada, nem royalties, nem restrições de "copyleft" do tipo GNU. Ele é licenciado sob os termos da licença MIT reproduzida abaixo e, portanto, é compatível com GPL e também se qualifica como software de código aberto. É de domínio público. Os detalhes legais estão abaixo. O espírito desta licença é que você é livre para usar este material para qualquer finalidade, sem nenhum custo. O único requisito é que, se você usá-los, nos dê crédito.
Copyright © 2023 Educational Material
Este material está licenciado sob a Licença MIT. É permitido o uso, cópia, modificação, e distribuição deste material para qualquer fim, desde que acompanhado deste aviso de direitos autorais.
O MATERIAL É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO VIOLAÇÃO. EM HIPÓTESE ALGUMA OS AUTORES OU DETENTORES DE DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, ATO ILÍCITO OU DE OUTRA FORMA, DECORRENTE DE, OU EM CONEXÃO COM O MATERIAL OU O USO OU OUTRAS NEGOCIAÇÕES NO MATERIAL.
Para mais informações sobre a Licença MIT: https://opensource.org/licenses/MIT.


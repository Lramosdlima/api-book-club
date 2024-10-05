<h1 align="center">
    <a href="#" alt="Api Book Club 📚"> 📚 API Book Club </a>
</h1>

<h3 align="center">
    API responsável pelas funções do projeto Book Club.
</h3>

<p align="center">
  Feito por Leonardo R., Felipe R. e Rafael C.
</p>

# Sobre o Projeto 🤔

Essa API é um projeto de graduação no CEUB de Análise e Desenvolvimento de Sistemas para o Projeto Integrador. Ela foi desenvolvida com o intuito de praticar conhecimentos adquiridos no decorrer do curso. Essa API fornece os serviços para o [App Book Club](https://github.com/Lramosdlima/app-book-club).

# Sobre o BookClub 📚

![image](https://github.com/user-attachments/assets/d64847ce-b03b-441f-beff-cd3f9c19ff48)

O projeto nasceu com a necessidade de unir pessoas que gostam de livros e seus universos, além de incentivar a leitura explorando, comentando e avaliando livros. Você pode favoritar livros e até mesmo criar uma coleção de livros. Coleção essa que você pode agrupar livros com alguma ideia como "Livros com melhores PLOTs!" ou "Livros perfeitos para fim de semana!".

Existem tantos outros lugares que são possível comprar livros e ver suas avaliações, mas poucos unem uma comunidade que façam interagir!
![image](https://github.com/user-attachments/assets/d6c26fa4-1ec3-4f48-8ce3-b69f684f61d2)

# Mais sobre a construção da API
![image](https://github.com/user-attachments/assets/942856fd-c4e0-4342-a4b7-09fb8c87d881)

- Fizemos a conexão ao banco de dados com a plataforma "Supabase" que fornece uma instância de banco de dados PostgreSQL.
- A cada novo push na branch Main aciona a Action do GitHub para subir nossa API para o serviço da "Azure" por meio da pipeline pré configurada.
- Criamos um MER (Modelo Entidade-Relacionamento) do projeto na plataforma DBDiagram para contemplar todas as necessidades do APP:
![BookClubModel](https://github.com/user-attachments/assets/743596ef-602f-4ef8-8052-fb920e2ff0e5)
- A maioria das tabelas/entidades foi contempladas com endpoints de CRUD.
- Algumas rotas foram protegidas com Middleware e AccessToken, pois só poderiam ser acessadas quando um token da authentication fosse identificado na requisição e posteriormente dando permissão para o cliente usar aquela rota.
- Começamos o projeto em JavaScript puro, mas depois atualizei para TypeScript devido algumas formalidades de tipagem e algumas bibliotecas que eram mais bem utilizadas nele.
- As camadas do projeto contemplam:
1) As routes com os próprios verbos http GET, POST, PUT, DELETE.
2) Depois a controller para intermediar e fazer a passagem dos parâmetros de url, body etc e depois devolver a resposta ao cliente.
3) A service que fica responsável por fazer a regra de negócio e validação de dados. Em alguns casos até acessar o CACHE de dados com DbCache.
4) Temos a repository que contêm todos os métodos de manipulação de banco de dados: get, update, save, softDelete. Nesse caso estamos usando o TypeORM para fazer isso. Antes começamos com SQL puro, para fins de conhecimento e teste, mas por fins de segurança e praticidade, mudamos nessa camada. O que poderia ser mudado até mesmo para o Prisma ou outro ORM nessa camada sem que tenha que mudar em todas as services.
5) E por fim a entity, que nada mais é que a modelagem da tabela expressa com as notations (@) que permite aplicar propriedades às colunas e permitir sua manipulação pelo ORM.

## 🛠 Conhecimentos Aplicados

- NODE JS + Express
- API REST
- Arquitetura MSC: divididas em camadas de rotas > controles > serviços > modelos
- dotENV: usado para armazenar as variáveis de ambiente, como os de acesso ao banco de dados.
- Json Web Token: usado para criação de token de autenticação do usuário.
- Middleware: usado para a autenticação do usuário e permissão de acesso dos conteúdos envolvidos nas rotas.
- BCryptJS: usado para encriptografar a senha do usuário cadastrado.

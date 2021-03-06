const { gql } = require("apollo-server");
const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    authors(searchQuery: String! = "") : [Author!]!
    books(searchQuery: String! = "") : [Book!]!
    users(searchQuery: String! = ""): [User!]!
    book(id: ID!): Book
    user(id: ID!): User
    author(id: ID!): Author
    anything(id: ID!): Anything @deprecated(reason: "No longer supported. Use 'resource' instead")
    everything: [Anything!]! @deprecated(reason: "No longer supported. Use 'resource' instead")
    resources: [Resource!]! 
    resource(id:ID!): Resource
  }

  type Mutation {
    borrowBookCopy(id:ID!): BookCopy!
    returnBookCopy(id:ID!): BookCopy!
  }

  union Anything = Author | Book | BookCopy | User 
  interface Resource {
    id: ID!
  }

  type Author implements Resource {
    id: ID!
    name: String!
    bio: String!
    photo: Image!
    books: [Book!]!
  }
  type Book implements Resource {
    id: ID!
    title: String!
    cover: Image!
    description: String!
    author: Author!
    copies: [BookCopy!]!
  }
  type User implements Resource {
    id: ID!
    name: String!
    email: String!
    info: String!
    avatar: Avatar!
    ownedBookCopies: [BookCopy!]!
    borrowedBookCopies: [BookCopy!]!
  }
  type Image {
    url: String!
  }
  type Avatar {
    image: Image!
    color: String!
  }
  type BookCopy implements Resource {
    id: ID!
    book: Book!
    owner: User!
    borrower: User
  }
`;

module.exports = typeDefs;

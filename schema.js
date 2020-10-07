import {
  pattern,
  ValidateDirectiveVisitor
} from "@profusion/apollo-validation-directives";
import { gql, makeExecutableSchema } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    test(myString: String! @pattern(regexp: "[A-Za-z]+")): Boolean
  }
`;

const resolvers = {
  Query: {
    test: () => {
      return true;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    ...ValidateDirectiveVisitor.getMissingCommonTypeDefs(),
    ...pattern.getTypeDefs()
  ],
  resolvers,
  schemaDirectives: {
    pattern: pattern
  }
});

export default schema;

import { addMocksToSchema } from "@graphql-tools/mock";
import schema from "./schema";
import { graphql } from "graphql";
import { ValidateDirectiveVisitor } from "@profusion/apollo-validation-directives";

let query = null;

beforeAll(() => {
  // switching preserveResolvers to true
  // makes tests pass but we only want to preserve
  // the validationResolvers not ALL resolvers.
  const schemaWithMocks = addMocksToSchema({
    schema,
    preserveResolvers: false
  });

  const schemaWithValidators = ValidateDirectiveVisitor.addValidationResolversToSchema(
    schemaWithMocks
  );

  query = async graphqlQuery => {
    const result = await graphql(schemaWithValidators, graphqlQuery);
    return result;
  };
});

test("should pass pattern validation", async () => {
  const res = await query(`
    query {
      test(myString: "xyz")
    }
    `);

  expect(res.data).toBeTruthy();
});

test("should fail pattern validation", async () => {
  const res = await query(`
    query {
      test(myString: "123")
    }
   `);

  // this should fail with validation errors
  expect(res).toHaveProperty("errors");
});

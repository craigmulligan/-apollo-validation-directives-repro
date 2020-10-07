I'd like to get [apollo-validation-directives](https://github.com/profusion/apollo-validation-directives) working with [graphql-tools](https://www.graphql-tools.com/docs/mocking) mocking lib.

I thought I'd be able to call after adding mocks and I'd therefore have both real validationResolvers with mock application resolvers. But it doesn't appear to work. (see `schema.test.js`)

```js
ValidateDirectiveVisitor.addValidationResolversToSchema(schemaWithMocks);
```

Is there a way to pass custom resolvers to graphql-tools `mock` property?

Running the reproduction:

```
npm test
```

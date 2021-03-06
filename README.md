# Mongease GraphQL

Mongease plugin for adding support to GraphQL schemas creation.

## Install

```shell
$ npm install --save mongease-graphql
```

## Usage

```js
import Mongease from 'mongease';
import MongeaseGraphQL from 'mongease-graphql';

Mongease.plugin ( MongeaseGraphQL.make );

Mongease.make ( 'Book', {
  schema: {
    title: String,
    category: Number,
    read: Boolean
  },
  resolvers: {
    Query: {
      findBooks () {}
    },
    Mutation: {
      bookMarkAsRead () {}
    }
  }
});

const schema = MongeaseGraphQL.getSchema ();
```

## API

### `.getTypes (): string`

Returns the GraphQL schema as a string.

### `.getResolvers (): {}`

Returns all the parsed resolvers, grouped by type.

### `.getSchema (): GraphQLSchema`

Returns the compiled GraphQL schema.

### `.make ( name: string, config: {} )`

Function that should be passed to `Mongease.plugin`, enables auto creation of types, parsing of resolvers, and creation of schemas.

## Related

- [mongoose-to-graphql](https://github.com/fabiospampinato/mongoose-to-graphql) - Converts a Mongoose schema to its GraphQL representation.
- [mongease](https://github.com/fabiospampinato/mongease) - Tiny wrapper around Mongoose for easier creation of schemas and models. Supports plugins.
- [mongease-graphql-builder](https://github.com/fabiospampinato/mongease-graphql-builder) - Module for auto-generating simple GraphQL queries from Mongease descriptions.

## License

MIT © Fabio Spampinato

# Mongease GraphQL

![Issues](https://img.shields.io/github/issues/fabiospampinato/mongease-graphql.svg)
[![NPM version](https://img.shields.io/npm/v/mongease-graphql.svg)](https://www.npmjs.com/package/mongease-graphql)

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

## License

MIT © Fabio Spampinato

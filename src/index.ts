
/* IMPORT */

import isFunction = require ( 'lodash/isFunction' );
import reduce = require ( 'lodash/reduce' );
import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools';
import M2G from 'mongoose-to-graphql';

/* GRAPHQL */

//TODO: Test it

const GraphQL = {

  /* VARIABLES */

  _parsed: {
    parsed: [] as string[],
    types: {},
    resolvers: {}
  },

  /* GET */

  getTypes (): string {

    const {parsed, types} = GraphQL._parsed,
          compiled: string[] = [];

    compiled.push ( parsed.join ( '\n' ) );

    for ( let type in types ) {

      if ( !types.hasOwnProperty ( type ) ) continue;

      compiled.push (`
        type ${type} {
          ${types[type].join ( '\n' )}
        }
      `);

    }

    compiled.push (`
      schema {
        query: Query,
        mutation: Mutation
      }
    `);

    return compiled.join ( '\n' );

  },

  getResolvers (): {} {

    return GraphQL._parsed.resolvers;

  },

  getSchema (): GraphQLSchema {

    return makeExecutableSchema ({
      typeDefs: GraphQL.getTypes (),
      resolvers: GraphQL.getResolvers ()
    });

  },

  /* MAKE */

  make ( name: string, config: {} ) {

    if ( config.hasOwnProperty ( 'resolvers' ) ) {

      GraphQL.makers.resolvers ( name, config['resolvers'] );

    }

    GraphQL.makers.type ( name, config );

  },

  makers: {

    resolvers ( name: string, resolvers ) {

      const parsedTypes = GraphQL._parsed.types,
            parsedResolvers = GraphQL._parsed.resolvers;

      for ( let namespace in resolvers ) {

        if ( !parsedTypes[namespace] ) parsedTypes[namespace] = [];
        if ( !parsedResolvers[namespace] ) parsedResolvers[namespace] = {};

        for ( let endpoint in resolvers[namespace] ) {

          const data = resolvers[namespace][endpoint],
                args = reduce ( data.args, ( acc, type, name ) => acc.concat ([ `${name}: ${type}` ]), [] as string[] );

          parsedTypes[namespace].push ( `${endpoint} ` + ( args.length ? `( ${args.join ( ', ' )} )` : '' ) + `: ${data.type || name}` );
          parsedResolvers[namespace][endpoint] = isFunction ( data ) ? { resolve: data } : data.resolve;

        }

      }

    },

    type ( name: string, config: {} ): string {

      const type = config['type'] || M2G ( name, config['schema'] );

      GraphQL._parsed.parsed.push ( type );

      return type;

    }

  }

};

/* EXPORT */

export default GraphQL;

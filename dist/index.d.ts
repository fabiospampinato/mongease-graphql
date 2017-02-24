import { GraphQLSchema } from 'graphql';
declare const GraphQL: {
    _parsed: {
        parsed: string[];
        types: {};
        resolvers: {};
    };
    getTypes(): string;
    getResolvers(): {};
    getSchema(): GraphQLSchema;
    make(name: string, config: {}): void;
    makers: {
        resolvers(name: string, resolvers: any): void;
        type(name: string, config: {}): string;
    };
};
export default GraphQL;

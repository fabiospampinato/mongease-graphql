/* IMPORT */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var graphql_tools_1 = require("graphql-tools");
var mongoose_to_graphql_1 = require("mongoose-to-graphql");
/* GRAPHQL */
//TODO: Test it
var GraphQL = {
    /* VARIABLES */
    _parsed: {
        parsed: [],
        types: {},
        resolvers: {}
    },
    /* GET */
    getTypes: function () {
        var _a = GraphQL._parsed, parsed = _a.parsed, types = _a.types, compiled = [];
        compiled.push(parsed.join('\n'));
        for (var type in types) {
            if (!types.hasOwnProperty(type))
                continue;
            compiled.push("\n        type " + type + " {\n          " + types[type].join('\n') + "\n        }\n      ");
        }
        compiled.push("\n      schema {\n        query: Query,\n        mutation: Mutation\n      }\n    ");
        return compiled.join('\n');
    },
    getResolvers: function () {
        return GraphQL._parsed.resolvers;
    },
    getSchema: function () {
        return graphql_tools_1.makeExecutableSchema({
            typeDefs: GraphQL.getTypes(),
            resolvers: GraphQL.getResolvers()
        });
    },
    /* MAKE */
    make: function (name, config) {
        if (config.hasOwnProperty('resolvers')) {
            GraphQL.makers.resolvers(name, config['resolvers']);
        }
        GraphQL.makers.type(name, config);
    },
    makers: {
        resolvers: function (name, resolvers) {
            var parsedTypes = GraphQL._parsed.types, parsedResolvers = GraphQL._parsed.resolvers;
            for (var namespace in resolvers) {
                if (!parsedTypes[namespace])
                    parsedTypes[namespace] = [];
                if (!parsedResolvers[namespace])
                    parsedResolvers[namespace] = {};
                for (var endpoint in resolvers[namespace]) {
                    var data = resolvers[namespace][endpoint], args = _.reduce(data.args, function (acc, type, name) { return acc.concat([name + ": " + type]); }, []);
                    parsedTypes[namespace].push(endpoint + " " + (args.length ? "( " + args.join(', ') + " )" : '') + (": " + (data.type || name)));
                    parsedResolvers[namespace][endpoint] = _.isFunction(data) ? { resolve: data } : data.resolve;
                }
            }
        },
        type: function (name, config) {
            var type = config['type'] || mongoose_to_graphql_1.default(name, config['schema']);
            GraphQL._parsed.parsed.push(type);
            return type;
        }
    }
};
/* EXPORT */
exports.default = GraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7O0FBRVosMEJBQTRCO0FBRTVCLCtDQUFtRDtBQUNuRCwyREFBc0M7QUFFdEMsYUFBYTtBQUViLGVBQWU7QUFFZixJQUFNLE9BQU8sR0FBRztJQUVkLGVBQWU7SUFFZixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsRUFBYztRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULFNBQVMsRUFBRSxFQUFFO0tBQ2Q7SUFFRCxTQUFTO0lBRVQsUUFBUSxFQUFSO1FBRVEsSUFBQSxvQkFBaUMsRUFBaEMsa0JBQU0sRUFBRSxnQkFBSyxFQUNkLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFFOUIsUUFBUSxDQUFDLElBQUksQ0FBRyxNQUFNLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFLENBQUM7UUFFdkMsR0FBRyxDQUFDLENBQUUsSUFBSSxJQUFJLElBQUksS0FBTSxDQUFDLENBQUMsQ0FBQztZQUV6QixFQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUcsSUFBSSxDQUFHLENBQUM7Z0JBQUMsUUFBUSxDQUFDO1lBRS9DLFFBQVEsQ0FBQyxJQUFJLENBQUUsb0JBQ04sSUFBSSxzQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSx3QkFFOUIsQ0FBQyxDQUFDO1FBRUwsQ0FBQztRQUVELFFBQVEsQ0FBQyxJQUFJLENBQUUsb0ZBS2QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUM7SUFFaEMsQ0FBQztJQUVELFlBQVksRUFBWjtRQUVFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUVuQyxDQUFDO0lBRUQsU0FBUyxFQUFUO1FBRUUsTUFBTSxDQUFDLG9DQUFvQixDQUFF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
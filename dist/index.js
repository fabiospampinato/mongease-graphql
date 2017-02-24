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
            for (var namespace in resolvers) {
                GraphQL._parsed.types[namespace] = [];
                GraphQL._parsed.resolvers[namespace] = {};
                for (var endpoint in resolvers[namespace]) {
                    var data = resolvers[namespace][endpoint], args = _.reduce(data.args, function (acc, type, name) { return acc.concat([name + ": " + type]); }, []);
                    GraphQL._parsed.types[namespace].push(endpoint + " " + (args.length ? "( " + args.join(', ') + " )" : '()') + (": " + (data.type || name)));
                    GraphQL._parsed.resolvers[namespace][endpoint] = data.resolve;
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
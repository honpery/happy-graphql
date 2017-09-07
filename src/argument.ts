import { GraphQLArgumentConfig, GraphQLFieldConfigArgumentMap, GraphQLInputType } from 'graphql';

export type ArgDesc = string;
export type ArgDefault = any;
export type ArgReason = string;         // deprecationReason

export type Arg = [GraphQLInputType, ArgDesc] | [GraphQLInputType, ArgDesc, ArgDefault];

export interface Args {
    [name: string]: Arg;
}

export function toggleArg(arg: Arg): GraphQLArgumentConfig {
    return {
        type: arg[0],
        description: arg[1],
        defaultValue: arg[2],
    };
}

export function toggleArgs(args: Args): GraphQLFieldConfigArgumentMap {
    const result = {};

    for (const name in args) {
        result[name] = toggleArg(args[name]);
    }

    return result;
}

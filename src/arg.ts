import { GraphQLArgument, GraphQLArgumentConfig, GraphQLFieldConfigArgumentMap, GraphQLType } from 'graphql';

type argDesc = string;

type argDefault = any;

export interface IArgument {
    type: GraphQLType;
    desc: argDesc;
    default: argDefault;
}

export type Argument = IArgument | [GraphQLType, argDesc] | [GraphQLType, argDesc, argDefault];

export interface IArgumentMap {
    [name: string]: Argument;
}

export function genArg(arg: Argument): GraphQLArgumentConfig {
    return Array.isArray(arg)
        ? {
            name,
            type: arg[0],
            description: arg[1],
            defaultValue: arg[2],
        }
        : {
            name,
            type: arg.type,
            description: arg.desc,
            defaultValue: arg.default,
        };
}

export function genArgs(args: IArgumentMap): GraphQLFieldConfigArgumentMap {
    const result = {};
    for (const name in args) {
        result[name] = genArg(args[name]);
    }
    return result;
}

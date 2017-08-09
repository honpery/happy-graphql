import {
    graphql, GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInt,
    GraphQLScalarType, GraphQLScalarTypeConfig, GraphQLString, ValueNode,
} from 'graphql';
import { bigCamel } from './helper';

type ScalarDesc = string;

interface IScalarOptions<TInternal, TExternal> {
    desc: ScalarDesc;
    serialize(value: any): TExternal | null | undefined;
    parseValue?(value: any): TInternal | null | undefined;
    parseLiteral?(valueNode: ValueNode): TInternal | null | undefined;
}

type ScalarOptions<TInternal, TExternal> =
    IScalarOptions<TInternal, TExternal>
    | [ScalarDesc, (value: any) => TExternal | null | undefined];

export function Scalar(name: string, options: ScalarOptions<any, any>) {
    const stdName = bigCamel(name);
    const config: GraphQLScalarTypeConfig<any, any> = Array.isArray(options)
        ? { name: stdName, description: options[0], serialize: options[1] }
        : {
            name: stdName, description: options.desc, serialize: options.serialize,
            parseLiteral: options.parseLiteral, parseValue: options.parseValue,
        };
    return new GraphQLScalarType(config);
}

export const scalars = {

    // int
    int: GraphQLInt,

    // float
    float: GraphQLFloat,

    // boolean
    boolean: GraphQLBoolean,

    // string
    string: GraphQLString,

    // id
    id: GraphQLID,

    // url
    url: Scalar('Url', {
        desc: 'URL',
        serialize: val => val,
    }),

    // email
    email: Scalar('Email', {
        desc: 'email',
        serialize: val => val,
    }),
};

import {
    GraphQLBoolean, GraphQLFloat, GraphQLID,
    GraphQLInt, GraphQLScalarType, GraphQLString, ValueNode,
} from 'graphql';

export interface ScalarOptions {
    desc: string;
    serialize(value: any): any;
    parseValue?(value: any): any;
    parseLiteral?(ast: ValueNode & { value: any }): any;
}

export function Scalar(name: string, options: ScalarOptions) {
    const { desc: description, serialize, parseValue, parseLiteral } = options;
    return new GraphQLScalarType({ name, description, serialize, parseValue, parseLiteral });
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
};

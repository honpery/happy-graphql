import {
    GraphQLArgumentConfig, GraphQLBoolean, GraphQLFieldConfig,
    GraphQLFieldConfigArgumentMap, GraphQLFieldConfigMap, GraphQLFieldResolver, GraphQLFloat,
    GraphQLID, GraphQLInputFieldConfigMap, GraphQLInputType,
    GraphQLInt, GraphQLInterfaceType, GraphQLList, GraphQLNonNull, GraphQLObjectType,
    GraphQLOutputType, GraphQLScalarType, GraphQLString, ValueNode,
} from 'graphql';
import { bigCamel, ResolveThunk, smallCamel, Thunk } from './helper';

/**
 * scalar
 */

export interface ScalarOptions {
    desc: string;
    serialize(value: any): any;
    parseValue?(value: any): any;
    parseLiteral?(node: ValueNode & { value: any }): any;
}

export function Scalar(name: string, options: ScalarOptions) {
    const { desc, serialize, parseValue, parseLiteral } = options;
    return new GraphQLScalarType({
        name,
        description: desc,
        serialize,
        parseValue,
        parseLiteral,
    });
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

/**
 * list
 */
export function List(type: GraphQLObjectType) {
    return new GraphQLList(type);
}

/**
 * required
 */
export function Required(type: GraphQLObjectType) {
    return new GraphQLNonNull(type);
}

/**
 * args
 */

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

/**
 * fields
 */

export type FieldDesc = string;
export type FieldReason = string;        // deprecationReason

export type Field =
    [GraphQLOutputType, FieldDesc] | [GraphQLOutputType, FieldDesc, FieldReason]
    | {
        type: GraphQLOutputType;
        desc: string;
        args?: Args;
        resolver?: GraphQLFieldResolver<any, any>;
        deprecationReason?: FieldReason;
    };

export interface Fields {
    [name: string]: Field;
}

export function toggleField(field: Field): GraphQLFieldConfig<any, any> {
    if (Array.isArray(field)) {
        return {
            type: field[0],
            description: field[1],
            deprecationReason: field[2] as string,
        };
    }
    const { type, desc, args, resolver, deprecationReason } = field;
    return {
        type,
        description: desc,
        args: toggleArgs(args),
        resolve: resolver,
        deprecationReason,
    };
}

export function toggleFields(fields: Fields): GraphQLFieldConfigMap<any, any> {
    const result = {};

    for (const name in fields) {
        result[name] = toggleField(fields[name]);
    }

    return result;
}

/**
 * types
 */

export interface TypeOptions {
    desc: string;
    interfaces?: Thunk<GraphQLInterfaceType[]>;
    fields: Thunk<Fields>;
    // isTypeOf?: GraphQLIsTypeOfFn<TSource, TContext>;
}

export function Type(name: string, options: TypeOptions) {
    const { desc, fields } = options;
    return new GraphQLObjectType({
        name: bigCamel(name),
        description: desc,
        fields: () => toggleFields(ResolveThunk(fields)),
    });
}

/**
 * query
 */

export interface QueryOptions {
    desc: string;
    args?: Args;
    type: GraphQLOutputType;
    resolver: any;
}

export function Query(name: string, options: QueryOptions): GraphQLObjectType {
    return Type('Query', {
        desc: 'Query Types.',
        fields: () => ({ [smallCamel(name)]: options }),
    });
}

/**
 * mutation
 */

export interface MutationOptions {
    desc: string;
    input: Args;
    output: Field;
    resolver: any;
}

export function Mutation(name: string, options: MutationOptions): GraphQLObjectType {
    const { desc, input: args, resolver, output: type } = options;
    return Type('Mutation', {
        desc: 'Mutation Types.',
        fields: () => ({
            [smallCamel(name)]: {
                desc,
                args,
                resolver,
                type,
            } as any,
        }),
    });
}

/**
 * subscription
 */

export interface SubscriptionOptions {
    desc: string;
    resolver: any;
    type: GraphQLOutputType;
    args?: Args;
}

export function Subscription(name: string, options: SubscriptionOptions): GraphQLObjectType {
    return Type('Subscription', {
        desc: 'Subscription Types.',
        fields: () => ({ [smallCamel(name)]: options }),
    });
}

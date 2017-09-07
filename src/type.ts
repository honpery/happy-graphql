import {
    GraphQLInterfaceType, GraphQLIsTypeOfFn,
    GraphQLObjectType, GraphQLOutputType,
} from 'graphql';
import { Args, toggleArgs } from './argument';
import { Field, Fields, toggleFields } from './field';
import { bigCamel, ResolveThunk, smallCamel, Thunk } from './helper';

export interface TypeOptions<TSource, TContext> {
    desc: string;
    interfaces?: Thunk<GraphQLInterfaceType[]>;
    fields: Thunk<Fields>;
    isTypeOf?: GraphQLIsTypeOfFn<TSource, TContext>;
}

export function Type(name: string, options: TypeOptions<any, any>) {
    const { desc, fields } = options;
    return new GraphQLObjectType({
        name: bigCamel(name),
        description: desc,
        fields: () => toggleFields(ResolveThunk(fields)),
    });
}

export const Root = {
    query: 'Query',
    mutation: 'Mutation',
    subscription: 'Subscription',
};

export interface QueryOptions {
    desc: string;
    args?: Args;
    type: GraphQLOutputType;
    resolver: any;
}

export function Query(name: string, options: QueryOptions): GraphQLObjectType {
    return Type(Root.query, {
        desc: '',
        fields: () => ({ [smallCamel(name)]: options }),
    });
}

export interface MutationOptions {
    desc: string;
    input: Args;
    output: Fields;
    resolver: any;
}

export function Mutation(name: string, options: MutationOptions): GraphQLObjectType {
    const { desc, input: args, resolver, output: type } = options;
    return Type(Root.mutation, {
        desc: '',
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

export interface SubscriptionOptions {
    desc: string;
    resolver: any;
    type: GraphQLOutputType;
    args?: Args;
}

export function Subscription(name: string, options: SubscriptionOptions): GraphQLObjectType {
    return Type(Root.subscription, {
        desc: '',
        fields: () => ({ [smallCamel(name)]: options }),
    });
}

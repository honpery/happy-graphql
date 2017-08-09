import {
    GraphQLFieldConfig, GraphQLFieldConfigArgumentMap,
    GraphQLFieldConfigMap, GraphQLFieldResolver, GraphQLOutputType,
} from 'graphql';

type FieldDesc = string;

export interface IField<TSource, TContext> {
    type: GraphQLOutputType;
    desc: FieldDesc;
    args?: GraphQLFieldConfigArgumentMap;
    resolve?: GraphQLFieldResolver<TSource, TContext>;
    deprecationReason?: string;
}

export type Field<TSource, TContext> = IField<TSource, TContext> | [GraphQLOutputType, FieldDesc];

export interface IFieldMap<TSource, TContext> {
    [name: string]: Field<TSource, TContext>;
}

export function genField(field: Field<any, any>): GraphQLFieldConfig<any, any> {
    return Array.isArray(field)
        ? {
            type: field[0],
            description: field[1],
        }
        : {
            type: field.type,
            description: field.desc,
            args: field.args,
            resolve: field.resolve,
            deprecationReason: field.deprecationReason,
        };
}

export function genFieldMap(fields: IFieldMap<any, any>): GraphQLFieldConfigMap<any, any> {
    const result: GraphQLFieldConfigMap<any, any> = {};

    for (const key in fields) {
        result[key] = genField(fields[key]);
    }

    return result;
}

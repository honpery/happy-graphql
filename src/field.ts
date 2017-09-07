import {GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLFieldResolver, GraphQLOutputType} from 'graphql';
import {Args, toggleArgs} from './argument';

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

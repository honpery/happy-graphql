import {GraphQLObjectType} from 'graphql';
import {Root} from './type';

export function Schema(...types: Array<GraphQLObjectType | any>) {
    const result = {};

    types.forEach(type => {
        if (!(type instanceof GraphQLObjectType)) return;
        if (type.name in Object.values(Root)) {
            // result[type.name] =
        }
    });
}

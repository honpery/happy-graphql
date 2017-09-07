import {
    GraphQLList, GraphQLNonNull, GraphQLObjectType,
} from 'graphql';

export function List(type: GraphQLObjectType) {
    return new GraphQLList(type);
}

export function Required(type: GraphQLObjectType) {
    return new GraphQLNonNull(type);
}

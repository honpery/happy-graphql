import { GraphQLList, GraphQLType } from 'graphql';

export function List(type: GraphQLType) {
    return new GraphQLList(type);
}

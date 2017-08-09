import { GraphQLNonNull, GraphQLType } from 'graphql';

export function Required(type: GraphQLType) {
    return new GraphQLNonNull(type);
}

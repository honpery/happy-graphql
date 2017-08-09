import { GraphQLObjectType } from 'graphql';
import { genFieldMap, IFieldMap } from './field';
import { bigCamel, ResolveThunk, Thunk } from './helper';

interface ITypeOptions<TSource, TContext> {
    desc: string;
    fields: Thunk<IFieldMap<TSource, TContext>>;
}

const cache = {};

export function Type(name: string, options: ITypeOptions<any, any>) {
    const stdName = bigCamel(name);
    return cache[stdName] ||
        (cache[stdName] = new GraphQLObjectType({
            name: stdName,
            description: options.desc,
            fields: () => ({
                ...genFieldMap(ResolveThunk(options.fields)),
            }),
        }));
}

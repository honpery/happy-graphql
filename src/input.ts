import { GraphQLInputObjectType, GraphQLInputType } from 'graphql';
import { genFieldMap, IFieldMap } from './field';
import { ResolveThunk, Thunk } from './helper';

export interface IInputOptions {
    desc: string;
    fields: Thunk<IFieldMap<any, any>>;
}

export function Input(name: string, options: IInputOptions) {
    return new GraphQLInputObjectType({
        name,
        description: options.desc,
        fields: () => ({
            ...genFieldMap(ResolveThunk(options.fields)),
        }),
    });
}

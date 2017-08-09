import { IArgumentMap } from './arg';
import { genFieldMap, IFieldMap } from './field';
import { ResolveThunk, Thunk } from './helper';
import { IRoot, RootType } from './schema';

export interface IMutationOptions {
    desc: string;
    input: IArgumentMap;
    payload: Thunk<IFieldMap<any, any>>;
    resolve: (input: any, ctx: any) => Promise<any>;
}

export function Mutation(name: string, options: IMutationOptions): IRoot {
    return {
        __type__: 'mutation',
        fields: () => ({
            ...genFieldMap(ResolveThunk(options.payload)),
        }),
    };
}

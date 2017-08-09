import { IArgumentMap } from './arg';
import { IFieldMap } from './field';
import { Thunk } from './helper';

export type RootType = 'query' | 'mutation' | 'subscription';

export interface IRoot {
    __type__: RootType;
    fields: Thunk<IFieldMap<any, any>>;
    args?: IArgumentMap;
    resovle: any;
}

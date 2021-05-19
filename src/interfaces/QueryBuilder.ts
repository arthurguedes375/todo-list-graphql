import Tables from "@src/QueryBuilder/tables";

export type Commands =
    'insert' |
    'select' |
    'update' |
    'delete' |
    'where' |
    'orderBy';

export type Command = {
    command: Commands;
    params: any[];
};

export interface QueryBuilderMethods<T, O> {
    insert: <Q>(data: Q) => QueryBuilderImplement<T, O>;
    select: (data: string[]) => QueryBuilderImplement<T, O>;
    update: <Q>(data: Q) => QueryBuilderImplement<T, O>;
    delete: () => QueryBuilderImplement<T, O>;
    where: <Q>(data: Q | object | string) => QueryBuilderImplement<T, O>;
    orderBy: (field: string, order?: string) => QueryBuilderImplement<T, O>;
}

export interface QueryBuilderImplement<T, O> extends ImplementQueryBuilderMethods<T, O> {
    exec: () => Promise<T>;
}

export interface ImplementQueryBuilder<T, O> extends ImplementQueryBuilderMethods<T, O>, QueryBuilderImplement<T, O> { }

export type QueryBuilder =
    <T = object>(table: Tables) => ImplementQueryBuilder<T, Tables>;


export class ImplementQueryBuilderMethods<T, O> implements QueryBuilderMethods<T, O> {

    protected commands: Command[] = [];
    protected _ImplementationInstance: QueryBuilderImplement<T, O> = <any>null;

    constructor(
        protected _table: O | string,
    ) { }


    insert<Q>(...params: Q[]) {

        this.commands = [
            ...this.commands,
            {
                command: 'insert',
                params: params,
            }
        ];

        return this._ImplementationInstance;
    }
    select(...params: any[]) {
        this.commands = [
            ...this.commands,
            {
                command: 'select',
                params: params,
            }
        ];
        return this._ImplementationInstance;
    }
    update<Q>(...params: Q[]) {
        this.commands = [
            ...this.commands,
            {
                command: 'update',
                params: params,
            }
        ];
        return this._ImplementationInstance;
    }
    delete() {
        this.commands = [
            ...this.commands,
            {
                command: 'delete',
                params: [],
            }
        ];
        return this._ImplementationInstance;
    }
    where<Q>(...params: Q[]) {
        this.commands = [
            ...this.commands,
            {
                command: 'where',
                params: params,
            }
        ];
        return this._ImplementationInstance;
    }
    orderBy(field: string, order?: string) {
        this.commands = [
            ...this.commands,
            {
                command: 'orderBy',
                params: [field, order],
            }
        ];
        return this._ImplementationInstance;
    }
}
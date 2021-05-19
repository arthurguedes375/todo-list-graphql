import { QueryBuilder, QueryBuilderImplement, ImplementQueryBuilderMethods } from "@src/interfaces/QueryBuilder";

import knex from '@db/connection';

import Tables from './tables';


export class KnexQueryBuilderImplement<T, O> extends ImplementQueryBuilderMethods<T, O> implements QueryBuilderImplement<T, O> {

    constructor(
        protected table: Tables,
    ) {
        super(table);
        super._ImplementationInstance = this;
    }

    async exec() {
        let knexStatement = knex(this.table);

        this.commands.forEach((command) => {
            knexStatement = knexStatement[command.command](...command.params);
        })

        const dataReturn = await knexStatement;

        return <T>dataReturn;
    }
}

const knexQueryBuilder: QueryBuilder = <T>(table: Tables) => {
    return new KnexQueryBuilderImplement<T, Tables>(table);
}

export default knexQueryBuilder;
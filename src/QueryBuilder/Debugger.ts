import { QueryBuilder, QueryBuilderImplement, ImplementQueryBuilderMethods, Commands } from "@src/interfaces/QueryBuilder";

import { KnexQueryBuilderImplement } from './Knex';

import Tables from './tables';


class DebuggerQueryBuilderImplement<T, O> extends ImplementQueryBuilderMethods<T, O> implements QueryBuilderImplement<T, O> {

    constructor(
        protected table: Tables,
    ) {
        super(table);
        super._ImplementationInstance = this;
    }

    async exec() {
        const QueryBuilder: any = new KnexQueryBuilderImplement<T, O>(this.table);

        this.commands.forEach((command) => {
            QueryBuilder[command.command](...command.params);
        })

        const dataReturn = await QueryBuilder.exec();

        // TODO: Find a way to mock the results

        console.log("Commands");
        console.log(JSON.stringify(this.commands, null, 2));
        console.log("Return");
        console.log(JSON.stringify(dataReturn, null, 2));
        console.log("--------------------------------");

        return <T>dataReturn;
    }
}

const debuggerQueryBuilder: QueryBuilder = <T>(table: Tables) => {
    return new DebuggerQueryBuilderImplement<T, Tables>(table);
}

export default debuggerQueryBuilder;
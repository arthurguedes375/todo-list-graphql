import { Repository } from "@interfaces/Repositories";

import { FieldsFactory } from "./base/Factory";

// Filters
import emailFilter from './filters/email.filter';
import dateFilter from './filters/date.filter';
import passwordFilter from './filters/password.filter';

export const FilterExample = (data: object) => {
    const repo: Repository = {
        firstname: null,
        lastname: null,
        email: {
            filter: emailFilter,
            filterFailMessage: "Send a valid e-mail!"
        },
        birthday: {
            filter: dateFilter,
            filterFailMessage: "Send a valid birthday! (YYYY-MM-DD)"
        },
        password: {
            filter: passwordFilter,
            filterFailMessage: "The password needs at least 8 characters, one uppercase letter, one lowercase letter and one number!",
        },
    };

    return FieldsFactory(repo, data);
}
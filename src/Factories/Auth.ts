import KnexQueryBuilder from '@src/QueryBuilder/Knex';
import JwtToken from '@src/Tokens/Jwt';

import Auth from '@middlewares/auth';

export default new Auth(KnexQueryBuilder, JwtToken);
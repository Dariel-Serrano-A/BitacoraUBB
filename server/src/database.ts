import keys from './keys';

import mysql from 'mysql2';

const pool = mysql.createPool(keys.database);

const poolPromise = pool.promise();

export default poolPromise;
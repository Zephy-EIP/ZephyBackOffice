import {Pool} from 'pg';

const pool = new Pool();

pool.on('error', (err, _client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;

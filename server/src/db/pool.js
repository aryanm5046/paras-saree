import pg from 'pg';

export function openPool(connectionString) {
  const pool = new pg.Pool({ connectionString, connectionTimeoutMillis: 5000 });
  pool.on('error', (error) => {
    console.error('PostgreSQL connection lost', error.code ?? error.name);
  });
  return pool;
}

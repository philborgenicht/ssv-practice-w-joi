module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/ssv_practice_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/ssv_practice_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
}

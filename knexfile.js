module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: 'postgresql://app:2661kjL5ebP0950iHYoEQT4J@totally-musical-ram.a1.pgedge.io/test_db?sslmode=require',
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './migrations'
    }
  }
};

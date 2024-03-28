var config;
const setupConfig = () => {
  if (!config) {
    config={};
    config.sqlConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME
    };
  }
  return config;
};

module.exports = setupConfig();

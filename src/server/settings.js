//settings
const env = (process.env.NODE_ENV == 'production') ? 'prod' : 'dev';
const isDev = (env == 'dev');
const settings = {
  env: env,
  port: (isDev) ? 4242 : process.env.PORT
};

export default settings;

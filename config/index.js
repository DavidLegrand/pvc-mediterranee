module.exports = {
  ENV : process.env.NODE_ENV,
  PORT : process.env.PORT || 8080,
  API_URL : process.env.API_URL,
  DB_URI : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
}
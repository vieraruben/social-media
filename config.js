const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || process.env['jwtSecret'],
  mongoUri: `mongodb+srv://${process.env['DATABASE_USER']}:${process.env['DATABASE_PASSWORD']}@cluster0.fklki.mongodb.net/${process.env['DATABASE_NAME']}?retryWrites=true&w=majority`,
  apiUrl: "https://rv-social-media.herokuapp.com" 
}

module.exports = config
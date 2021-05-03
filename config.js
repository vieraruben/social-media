const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: "mongodb+srv://admin:admin123@cluster0.fklki.mongodb.net/social-media?retryWrites=true&w=majority",
  apiUrl: "http://localhost:3000" 
}

module.exports = config
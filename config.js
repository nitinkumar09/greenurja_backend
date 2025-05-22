require('dotenv').config();

const requiredEnvVars = ['MONGODB_URL', 'JWT_USER_PASSWORD', 'JWT_ADMIN_PASSWORD'];
console.log("Loaded ENV:", {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_USER_PASSWORD: process.env.JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD: process.env.JWT_ADMIN_PASSWORD
});

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

if (JWT_USER_PASSWORD.length < 32 || JWT_ADMIN_PASSWORD.length < 32) {
    throw new Error('JWT secrets must be at least 32 characters long');
}

module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD,
};

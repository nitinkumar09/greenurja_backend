require('dotenv').config();

const requiredEnvVars = [
    'MONGODB_URL',
    'JWT_USER_PASSWORD',
    'JWT_ADMIN_PASSWORD',
    'JWT_SELLER_PASSWORD'
];

console.log("JWT_SELLER_PASSWORD in config:", process.env.JWT_SELLER_PASSWORD);
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const JWT_SELLER_PASSWORD = process.env.JWT_SELLER_PASSWORD;

if (
    JWT_USER_PASSWORD.length < 32 ||
    JWT_ADMIN_PASSWORD.length < 32 ||
    JWT_SELLER_PASSWORD.length < 32
) {
    throw new Error('JWT secrets must be at least 32 characters long');
}

module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD,
    JWT_SELLER_PASSWORD
};

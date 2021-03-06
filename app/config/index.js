import joi from '@hapi/joi';
import dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = joi
	.object({
		NODE_ENV: joi
			.string()
			.allow("development", "production", "test", "staging")
			.required(),
		PORT: joi.number().default(8080),
		DATABASE_NAME: joi.string().required(),
		DATABASE_DIALECT: joi.string().default("postgres"),
		DATABASE_PASSWORD: joi.string().default(null),
		DATABASE_USER: joi.string().required(),
		DATABASE_URL: joi.string().default(null),
		HOST: joi.string().required(),
		SECRET_KEY: joi.string().required(),
	})
	.unknown()
	.required();

export const getConfig = () => {
  const { error, value: envVars } = envVarsSchema.validate(process.env);

  if (error) {
    //throw new Error(`Config validation error: ${error.message}`);
    console.log(`Config validation error: ${error.message}`)
  }

const config = {
	env: envVars.NODE_ENV || "development",
	port: envVars.PORT,
	db: {
		name: envVars.DATABASE_NAME,
		username: envVars.DATABASE_USER,
		password: envVars.DATABASE_PASSWORD,
		databaseUrl: envVars.DATABASE_URL,
		host: envVars.HOST,
	},
	secretKey: envVars.SECRET_KEY,
};

  return config;
};
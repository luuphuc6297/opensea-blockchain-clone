const { merge } = require('lodash');
const { withSentryConfig } = require('@sentry/nextjs');

const env = {
    NEXT_PUBLIC_APP_NAME: 'Familia Studio',
    NEXT_PUBLIC_APP_ENV: 'development',
    NEXT_PUBLIC_APP_DOMAIN: 'http://localhost:3000',

    // Mongo
    MONGODB_URI:
        'mongodb+srv://luuphuc:luuphuc@hgbocluster-iirfd.mongodb.net/work-hard-solution-dev?authSource=admin&replicaSet=HGBOCluster-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',

    // Mail-gun
    MAIL_GUN_API_KEY: '',
    MAIL_GUN_DOMAIN: '',

    // Aws3
    AWS_S3_KEY_ID: '',
    AWS_S3_USERNAME: '',
    AWS_S3_SECRET_KEY: '',
    AWS_S3_BUCKET: '',
    AWS_S3_REGION: '',

    // Strapi
    NEXT_PUBLIC_STRAPI_API_URL: '',
};

if (process.env.ENV_VARIABLES) {
    const overwriteEnvVariables = JSON.parse(process.env.ENV_VARIABLES);
    merge(env, overwriteEnvVariables);
}

console.info({ ENV_VARIABLES: env });

const SentryWebpackPluginOptions = {
    silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(
    {
        env,
        serverRuntimeConfig: {},
        publicRuntimeConfig: {},
        pageExtensions: ['ts', 'tsx', 'mdx'],
        poweredByHeader: false,
        images: {
            domains: ['example.com'],
        },
    },
    SentryWebpackPluginOptions,
);

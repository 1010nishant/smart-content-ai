
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://ridebook_owner:oEOMYR7sZpz5@ep-fragrant-mouse-a534lsi8.us-east-2.aws.neon.tech/smart-content-ai?sslmode=require',
    }
};
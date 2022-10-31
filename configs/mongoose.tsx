/* eslint-disable consistent-return */
import glob from 'glob';
import mongoose from 'mongoose';
import path from 'path';

mongoose.Promise = Promise;

mongoose.connection
    .on('error', (err) => {
        console.info(`🔥 MongoDB connection error: ${err}`);
        process.exit(-1);
    })
    .on('disconnected', () => {
        console.info('🔥 MongoDB disconnected...');
    })
    .on('reconnected', () => {
        console.info('✅ MongoDB reconnected...');
    });

// Register database models
const modelFiles = glob.sync('./models/**/*.model.tsx');

modelFiles.forEach((file: string) => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    require(path.resolve(file));
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectToDatabase = async (mongoURI?: string) => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    return mongoose.connection;
};

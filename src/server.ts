import { Server } from 'http';
import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection detected, shutting down the server...');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.error('Uncaught Exception detected! Shutting down...');

  // Exit the process immediately (can't guarantee app is stable anymore)
  process.exit(1);
});

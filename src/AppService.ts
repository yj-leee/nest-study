import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Connection, createConnection } from "typeorm";

import { Config } from "src/Config";



export class AppService implements OnModuleInit, OnModuleDestroy {
  private databaseConnection: Connection;
  private readonly config = new Config();

  async onModuleInit(): Promise<void> {
    try {
      await this.createConnection();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  private async createConnection(): Promise<void> {
    const entities = [
      ProductEntity,
    ];

    this.databaseConnection = await createConnection({
      type: "mysql",
      entities,
      synchronize: this.config.DATABASE_SYNC,
      logging: this.config.DATABASE_LOGGING,
      replication: {
        master: {
          host: this.config.DATABASE_WRITE_HOST,
          port: this.config.DATABASE_PORT,
          database: this.config.DATABASE_NAME,
          username: this.config.DATABASE_USER,
          password: this.config.DATABASE_PASSWORD,
        },
        slaves: [
          {
            host: this.config.DATABASE_WRITE_HOST,
            port: this.config.DATABASE_PORT,
            database: this.config.DATABASE_NAME,
            username: this.config.DATABASE_USER,
            password: this.config.DATABASE_PASSWORD,
          },
        ],
      },
    });
    if (!this.databaseConnection)
      throw new Error("Can not create database connection");
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.databaseConnection != null)
        await this.databaseConnection.close();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

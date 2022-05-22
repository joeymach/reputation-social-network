import "reflect-metadata";
import { createConnection } from "typeorm";


export async function intializeDB(): Promise<void> {
    
    await createConnection({
        type: "redis",
        host: "localhost",
        port: 8080,
        username: "postgres",
        password: "pass",
        database: "reputation_social_network"
    });
}
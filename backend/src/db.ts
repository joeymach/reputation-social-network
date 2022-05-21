import "reflect-metadata";
import { createConnection } from "typeorm";


export async function intializeDB(): Promise<void> {
    
    await createConnection({
        type: "postgres",
        host: "postgres-docker",
        port: 5432,
        username: "postgres",
        password: "pass",
        database: "reputation_social_network"
    });
}
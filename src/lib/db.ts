import { PrismaClient } from "../../prisma/generated/client";

const db = new PrismaClient();

export default db;
export * from "../../prisma/generated/client";

// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//     return new PrismaClient();
// };

// declare global {
//     var db: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const db = globalThis.db ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== "production") globalThis.db = db;

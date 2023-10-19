// @ts-nocheck

import db from "../lib/db";
import { User } from "../../prisma/generated/client";

type PartialUser = Omit<User, "id" | "createdAt" | "updatedAt">;

const users: PartialUser[] = [
    {
        firstName: "John",
        lastName: "Smith",
        phone: "123-456-7890",
    },
    {
        firstName: "Emily",
        lastName: "Johnson",
        phone: "987-654-3210",
    },
    {
        firstName: "Michael",
        lastName: "Davis",
        phone: "555-123-4567",
    },
    {
        firstName: "Sarah",
        lastName: "Wilson",
        phone: "111-222-3333",
    },
    {
        firstName: "David",
        lastName: "Brown",
        phone: "444-555-6666",
    },
    {
        firstName: "Sophia",
        lastName: "Miller",
        phone: "777-888-9999",
    },
    {
        firstName: "Daniel",
        lastName: "Anderson",
        phone: "666-777-8888",
    },
    {
        firstName: "Olivia",
        lastName: "Taylor",
        phone: "999-888-7777",
    },
    {
        firstName: "William",
        lastName: "Clark",
        phone: "333-444-5555",
    },
    {
        firstName: "Ava",
        lastName: "Moore",
        phone: "222-111-0000",
    },
];

const main = async () => {
    try {
        // users.forEach(async (user) => {
        //     await db.user.create({
        //         data: user,
        //     });
        // });

        await db.user.create({
            data: users[0],
        });

        console.log("Success");
    } catch (err) {
        console.log("Error", err);
    }
};

main();

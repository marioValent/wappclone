import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            throw new Error("File not found");
        }

        console.log("file: ", file);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const { BUCKET_NAME, CLIENT_EMAIL, PRIVATE_KEY_BUCKET, PROJECT_ID } =
            process.env;

        const storage = new Storage({
            projectId: PROJECT_ID,
            credentials: {
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY_BUCKET,
            },
        });

        const bucket = storage.bucket(BUCKET_NAME ?? "");

        const blob = bucket.file(file?.name);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        // Handle stream events
        blobStream.on("error", (err) => {
            console.error("Error uploading file:", err);
            return NextResponse.json(
                {
                    message: "File not uploaded",
                    error: err.message,
                },
                { status: 500 }
            );
        });
        // blobStream.on("finish", () => {
        //     return NextResponse.json(
        //         {
        //             message: "File uploaded successfully.",
        //         },
        //         {
        //             status: 200,
        //         }
        //     );
        // });

        blobStream.end(buffer);

        //@ts-ignore
        const storageFile = bucket.file(file);

        const options = {
            expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
            fields: { "x-goog-meta-source": "bucket-for-documents" },
        };

        const [response] = await storageFile.generateSignedPostPolicyV4(
            options
        );

        return NextResponse.json(
            {
                response: response,
                message: "File uploaded",
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json(
            {
                message: "File not uploaded",
                error: error.message,
            },
            { status: 400 }
        );
    }
}

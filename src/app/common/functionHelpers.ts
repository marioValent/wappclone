export const fileToBase64 = (file: File | null): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
            } else {
                reject(new Error("Failed to read file as base64."));
            }
        };
        file && reader.readAsDataURL(file);
    });
};

import LoginPage from "./LoginPage";

export default async function Home() {
    return (
        <main className="flex items-center justify-center space-x-10 h-screen p-24 bg-gradient-to-b from-app-gray to-app-gray-deeper">
            <LoginPage />
        </main>
    );
}

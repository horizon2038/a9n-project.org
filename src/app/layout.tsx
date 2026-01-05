import type {Metadata} from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "A9N Project",
    description: "Official website for the A9N open source project.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main className="z-0">{children}</main>
            </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
// import { AuthContextProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <Provider>
            {children}
          </Provider>
      </body>
    </html>
  );
}

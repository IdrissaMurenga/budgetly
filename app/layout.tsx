import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { ApolloProviderWrapper } from "./libs/ApolloProvider";


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
          <ApolloProviderWrapper>
            {children}
          </ApolloProviderWrapper>
          </Provider>
      </body>
    </html>
  );
}

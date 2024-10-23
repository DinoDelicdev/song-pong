import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import RecoilContextProvider from "./providers/RecoilContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Song Pong",
  description: "Song sharing game app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <RecoilContextProvider>{children}</RecoilContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

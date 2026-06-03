import NavBar from "./components/NavBar";
import AuthSessionProvider from "./components/SessionProvider";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-mist-200">
        <AuthSessionProvider>
          <NotificationProvider>
            <Notification />
            <NavBar />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}

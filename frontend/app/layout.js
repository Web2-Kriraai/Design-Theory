import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
import SubscriptionPopup from "./components/SubscriptionPopup";

export const metadata = {
  title: "Design Theory | Bespoke Architecture & Interior Design Studio",
  description: "Intellectual Luxury meets Editorial Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <SessionWrapper>
          <Header />
          {children}
          <Footer />
        </SessionWrapper>
        <SubscriptionPopup />
      </body>
    </html>
  );
}

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
// import SubscriptionPopup from "./components/SubscriptionPopup";
import SmoothScroll from "./components/SmoothScroll";

export const metadata = {
  title: "The Design Theory",
  description: "Intellectual Luxury meets Editorial Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <SessionWrapper>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow" >
                {children}
              </div>
              <Footer />
            </div>
          </SmoothScroll>
        </SessionWrapper>
        {/* <SubscriptionPopup /> */}
      </body>
    </html>
  );
}

import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Design Theory | Bespoke Architecture & Interior Design Studio",
  description: "Intellectual Luxury meets Editorial Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <header style={styles.header}>
          {/* Left Navigation */}
          <nav style={styles.navLeft}>
            <Link href="/" style={styles.list}>Home</Link>
            <Link href="/work" style={styles.list}>Work</Link>
            <Link href="/studio" style={styles.list}>The Studio</Link>
          </nav>

          {/* Center Logo */}
          <div style={styles.logoContainer}>
            <Image
              src="/assets/logo/logo_purple.png"
              alt="Design Theory Logo"
              width={100}
              height={60}
              className="logo-img"
            />
          </div>

          {/* Right Navigation */}
          <nav style={styles.navRight}>
            <Link href="/journal" style={styles.list}>Journal</Link>
            <Link href="/collaborate" style={styles.list}>Collaborate</Link>
            <Link href="/inquiry" style={styles.list}>Inquiry</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={styles.footer}>
          <p>&copy; 2026 Design Theory. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    borderBottom: "1px solid #E5E2DE",
    backgroundColor: "#33285b",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    flex: "0 0 auto",
  },
  navLeft: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "40px",
    fontSize: "12px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    flex: "1",
  },
  navRight: {
    display: "flex",
    gap: "40px",
    fontSize: "12px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    flex: "1",
    justifyContent: "flex-start",
  },
  list: {
    color: "#fff",
  },
  footer: {
    textAlign: "center",
    padding: "40px",
    fontSize: "12px",
    borderTop: "1px solid #E5E2DE",
    backgroundColor: "#F9F8F6",
  },
};

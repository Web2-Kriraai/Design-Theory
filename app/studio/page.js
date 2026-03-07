import Image from "next/image";

export default function Studio() {
  const team = [
    { id: 1, name: "Jane Architect", role: "Founder & Lead Designer", image: "/assets/testimonial/avatar1.jpg" },
    { id: 2, name: "Marcus Interior", role: "Senior Interior Architect", image: "/assets/testimonial/avatar2.jpg" },
    { id: 5, name: "Sofia Materials", role: "Material Specialist", image: "/assets/testimonial/avatar3.webp" },
  ];

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>The Studio</h1>

      {/* Intro */}
      <div style={styles.introSection}>
        <p style={styles.intro}>
          Design Theory is a collective of passionate creatives dedicated to the philosophy that exceptional design
          emerges from the marriage of intellectual rigor and aesthetic intuition. We believe that every material tells
          a story, every space breathes with intentionality, and every detail matters.
        </p>
        <p style={styles.intro}>
          Our studio is a gathering place for those who possess a rigorous eye for detail, a deep respect for
          materiality, and a passion for creating spaces with soul.
        </p>
      </div>

      {/* Team Section */}
      <div style={styles.teamSection}>
        <h2 style={styles.subtitle}>Our Team</h2>
        <div style={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.id} style={styles.teamCard}>
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={400}
                style={styles.teamImage}
              />
              <h3 style={styles.teamName}>{member.name}</h3>
              <p style={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "120px 60px",
    backgroundColor: "#F9F8F6",
  },
  title: {
    marginBottom: "80px",
    fontSize: "4rem",
    textAlign:"center",
  },
  introSection: {
    maxWidth: "650px",
    margin: "0 auto 120px",
  },
  intro: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
    lineHeight: 1.8,
    marginBottom: "30px",
    textTransform: "none",
    letterSpacing: "0.05em",
    color: "#333333",
  },
  teamSection: {
    marginTop: "120px",
  },
  subtitle: {
    marginBottom: "60px",
    fontSize: "2.5rem",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "60px",
  },
  teamCard: {
    textAlign: "center",
  },
  teamImage: {
    width: "100%",
    height: "auto",
    marginBottom: "30px",
  },
  teamName: {
    fontSize: "1.3rem",
    marginBottom: "10px",
  },
  teamRole: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
};

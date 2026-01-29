import Image from "next/image";

export default function Work() {
  const projects = [
    { id: 1, title: "Marble Residence", width: 2, height: 2, image: "/assets/services/appliances.jpg" },
    { id: 2, title: "Oak Interiors", width: 1, height: 1, image: "/assets/services/decor.jpg" },
    { id: 3, title: "Limestone Court", width: 1, height: 2, image: "/assets/services/furniture-carte.jpg" },
    { id: 4, title: "Granite Expansion", width: 1, height: 1, image: "/assets/services/home-automation.webp" },
    { id: 5, title: "Travertine Suites", width: 2, height: 1, image: "/assets/services/service-works.jpg" },
    { id: 6, title: "Slate Foundation", width: 1, height: 1, image: "/assets/services/appliances.jpg" },
  ];

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>Work</h1>
      <p style={styles.subtitle}>Broken Grid / Masonry Layout</p>
      <div style={styles.grid}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            style={{ ...styles.item, ...getItemSize(project) }}
            className="project-item"
          >
            <div style={styles.projectContent}>
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={400}
                style={styles.projectImage}
                className="project-image"
              />
              <div style={styles.overlay} className="project-overlay">
                <p style={styles.projectTitle}>{project.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const getItemSize = (project) => {
  return {
    gridColumn: `span ${Math.min(project.width, 4)}`,
    gridRow: `span ${project.height}`,
  };
};

const styles = {
  container: {
    padding: "120px 60px",
    backgroundColor: "#F9F8F6",
  },
  title: {
    marginBottom: "20px",
    fontSize: "4rem",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: "300",
    fontStyle: "italic",
    color: "#333333",
  },
  subtitle: {
    marginBottom: "60px",
    fontSize: "14px",
    color: "#999",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "300px",
    gap: "20px",
    gridAutoFlow: "dense",
  },
  item: {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#E5E2DE",
    transition: "box-shadow 0.3s ease",
    gridColumn: "span 1",
    gridRow: "span 1",
  },
  projectContent: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  projectImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.8s ease-in-out",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
    color: "white",
    padding: "40px 20px 20px",
    transform: "translateY(0)",
    transition: "transform 0.8s ease-in-out",
    height: "auto",
    minHeight: "80px",
    display: "flex",
    alignItems: "flex-end",
  },
  projectTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: "300",
    fontStyle: "italic",
    margin: 0,
    textTransform: "none",
    color: "#ffffff",
    letterSpacing: "0.05em",
  },
};

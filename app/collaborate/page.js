'use client';

import { useState } from "react";

export default function Collaborate() {
  const [expanded, setExpanded] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Senior Interior Architect",
      description:
        "Lead interior design projects from concept to completion. Collaborate with architects and clients to create spaces that embody our design philosophy. 8+ years experience required.",
    },
    {
      id: 2,
      title: "Material Sourcing Specialist",
      description:
        "Identify, source, and evaluate materials for our projects. Build relationships with suppliers and conduct material research. 5+ years in material sourcing.",
    },
    {
      id: 3,
      title: "Junior Designer",
      description:
        "Support design team on conceptual drawings and presentations. Assist in client meetings and project documentation. Fresh graduates welcome.",
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>Collaborate</h1>

      {/* Intro Copy */}
      <div style={styles.introSection}>
        <p style={styles.intro}>
          At Design Theory, we believe that exceptional design is a collaborative dialogue. Our studio is a gathering
          place for those who possess a rigorous eye for detail, a deep respect for materiality, and a passion for
          creating spaces with soul.
        </p>
      </div>

      {/* Job Listings */}
      <div style={styles.jobsContainer}>
        <h2 style={styles.subtitle}>Open Positions</h2>
        <div style={styles.jobsList}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.jobItem}>
              <div
                onClick={() => toggleExpand(job.id)}
                style={{
                  ...styles.jobHeader,
                  cursor: "pointer",
                  borderBottom: expanded === job.id ? "1px solid #D4AF37" : "1px solid #E5E2DE",
                }}
              >
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <span style={styles.expandIcon}>{expanded === job.id ? "−" : "+"}</span>
              </div>
              {expanded === job.id && (
                <div style={styles.jobContent}>
                  <p style={styles.jobDescription}>{job.description}</p>
                  <button style={styles.applyBtn}>Apply Now</button>
                </div>
              )}
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
    fontSize: "14px",
    lineHeight: 1.8,
    textTransform: "none",
    letterSpacing: "0.05em",
    color: "#333333",
  },
  jobsContainer: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  subtitle: {
    fontSize: "2.5rem",
    marginBottom: "60px",
  },
  jobsList: {
    borderTop: "1px solid #E5E2DE",
  },
  jobItem: {
    borderBottom: "1px solid #E5E2DE",
  },
  jobHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 0",
    transition: "all 0.3s ease",
  },
  jobTitle: {
    fontSize: "1.3rem",
    margin: 0,
    flex: 1,
  },
  expandIcon: {
    fontSize: "24px",
    color: "#D4AF37",
    fontWeight: "bold",
  },
  jobContent: {
    padding: "30px 0",
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    paddingLeft: "20px",
  },
  jobDescription: {
    fontSize: "14px",
    lineHeight: 1.8,
    marginBottom: "20px",
    textTransform: "none",
    letterSpacing: "normal",
  },
  applyBtn: {
    background: "none",
    border: "1px solid #333",
    padding: "10px 30px",
    cursor: "pointer",
    fontSize: "12px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    transition: "all 0.8s ease-in-out",
  },
};

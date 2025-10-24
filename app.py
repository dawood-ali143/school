import streamlit as st

# Secret access code for KHIT students
ACCESS_CODE = "KHIT2025"

# Roadmap data
roadmap = {
    "1st Year": {
        "Subjects": ["C Programming", "Mathematics", "Digital Logic"],
        "Skills": ["Basic Python", "HTML/CSS"],
        "Certifications": ["NPTEL C Programming", "IBM Python Basics"],
        "Projects": ["Simple Calculator", "Portfolio Website"]
    },
    "2nd Year": {
        "Subjects": ["DSA", "OOPs", "DBMS", "OS"],
        "Skills": ["Java", "SQL", "Git"],
        "Certifications": ["NPTEL Java", "Coursera DBMS"],
        "Projects": ["Library Management System", "Resume Builder"]
    },
    "3rd Year": {
        "Subjects": ["Computer Networks", "Web Tech", "AI"],
        "Skills": ["React", "Flask", "MongoDB", "ML Basics"],
        "Certifications": ["Google AI Essentials", "Full Stack IBM"],
        "Projects": ["Hackathon Dashboard", "QR Code Attendance System"]
    },
    "4th Year": {
        "Subjects": ["Cloud Computing", "Cybersecurity", "Electives"],
        "Skills": ["Docker", "MuleSoft", "Deployment"],
        "Certifications": ["AWS Cloud", "Cybersecurity Basics"],
        "Projects": ["Final Year Project", "Open Source Contributions"]
    }
}

# UI
st.title("🎓 KHIT CSE Career Path AI")
code = st.text_input("Enter KHIT Access Code")

if code == ACCESS_CODE:
    year = st.selectbox("Select your year", list(roadmap.keys()))
    st.subheader(f"📘 Roadmap for {year}")
    data = roadmap[year]
    st.markdown("**Subjects:** " + ", ".join(data["Subjects"]))
    st.markdown("**Skills to Learn:** " + ", ".join(data["Skills"]))
    st.markdown("**Certifications:** " + ", ".join(data["Certifications"]))
    st.markdown("**Project Ideas:** " + ", ".join(data["Projects"]))
else:
    st.warning("🔒 Access restricted to KHIT students. Ask Dawood for the code.")

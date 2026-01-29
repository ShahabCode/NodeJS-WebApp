# Vulnerable Node.js Web Application (Pentesting Portfolio)

A deliberately **vulnerable backend-focused web application** built with **Node.js, Express.js, and EJS**, using a **MySQL database managed by Sequelize**.

This project is designed as a **Web Application Pentesting portfolio project**, demonstrating real-world vulnerability discovery, exploitation, and security analysis alongside backend development skills.

⚠️ **Warning:** This application intentionally contains security vulnerabilities and must be used **for educational purposes only**.

---

## 📌 Project Overview
The primary goal of this project is to showcase:

- Backend development fundamentals with Node.js & Express.js
- Realistic implementation of authentication and CRUD functionality
- Identification and exploitation of common web vulnerabilities
- Writing professional **security writeups** suitable for pentesting portfolios

> This repository serves as a **dual-purpose project**: backend development + web application security practice.

---

## 🔥 Security Vulnerabilities (Intentionally Present)

The application intentionally contains the following vulnerabilities:

- [Cross-Site Scripting (XSS)](vulnerabilities/XSS.md)
- [Cross-Site Request Forgery (CSRF)](vulnerabilities/CSRF.md)
- [Mass Assignment – Privilege Escalation](vulnerabilities/mass-assignment.md)
- [File Upload – Insecure File Handling](vulnerabilities/file-upload.md)
- [JSON Web Token (JWT) – Weak Signing Secret](vulnerabilities/JWT.md)


📂 Detailed exploitation writeups with PoC requests, impact analysis, and remediation guidance are available in the `/vulnerabilities` directory.

---

## 🛠️ Application Features

| Feature | Description |
|-------|-------------|
| **Authentication** | User registration, login, JWT-based session handling |
| **CRUD Operations** | Create, read, update, and delete resources |
| **RESTful APIs** | Well-structured backend endpoints |
| **Database Integration** | MySQL database managed via Sequelize ORM |
| **File Upload** | Basic file upload functionality |
| **Security Focus** | Intentional vulnerable logic for pentesting practice |

---

## 💻 Technologies Used

| Technology | Purpose |
|----------|---------|
| Node.js | Backend runtime |
| Express.js | Routing & middleware |
| EJS | Server-side templating |
| MySQL | Relational database |
| Sequelize | ORM for database interaction |
| Burp Suite | Intercepting & exploiting requests |

---

## 🚀 Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/ShahabCode/NodeJS-WebApp.git
cd NodeJS-WebApp
```

2. Install dependencies:
```bash
npm install
```

3. Configure database:
- Create a MySQL database
- Configure credentials via `.env` or `config/config.json`

4. Run migrations (if applicable):
```bash
npx sequelize db:migrate
```

5. Start the application:
```bash
npm start
```

6. Access the application:
```
http://localhost:3000
```

---

## 🎯 Learning Outcomes
This project demonstrates:

- Practical understanding of **OWASP Top 10** vulnerabilities
- Hands-on exploitation using **Burp Suite**
- Writing clear and structured **pentesting writeups**
- Understanding root causes and secure design principles
- Ability to explain vulnerabilities and mitigations professionally

---

## 🧪 Intended Audience
- Junior Web Application Pentesters
- Security students and self-learners
- Recruiters reviewing pentesting portfolios

---

## 🤝 Contribution & Notes
This repository is primarily part of a **personal pentesting portfolio**.

If you are reviewing this project:
- Vulnerabilities are **intentional**
- Exploits are documented responsibly
- Fixes and secure versions may be added in future iterations

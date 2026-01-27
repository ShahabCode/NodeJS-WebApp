# JWT Weak Secret – Authentication Bypass & Account Takeover

## 📌 Summary
A **JSON Web Token (JWT)** vulnerability was identified due to the use of a **weak and guessable secret key** (`secret`) for signing tokens using **HS256`.
This allows an attacker to forge valid JWTs and impersonate arbitrary users.

---

## 🎯 Impact
- Authentication bypass
- Account takeover
- Access to sensitive user data
- Potential privilege escalation (if roles are trusted from JWT)

**Severity:** High  
**OWASP Top 10:** A2 – Broken Authentication / Cryptographic Failures

---

## 🧩 Affected Endpoint
GET /user/profile

---

## 🔍 Vulnerability Details
The application uses an HS256-signed JWT stored inside a cookie (`token`) to authenticate users.
The signing secret is weak and easily guessable, which allows an attacker to recover the secret key
and generate valid JWTs.

Once the secret is known, an attacker can arbitrarily modify token claims such as:
- `email`
- `role`
- `userId`

and re-sign the token to gain unauthorized access.

---

## 📥 Captured Request (via Burp Suite)

```http
GET /user/profile HTTP/1.1
Host: 172.22.228.255:3000
Cookie: token=<JWT_TOKEN>
```

---

## 💥 Exploitation

The JWT was extracted from the intercepted request and analyzed offline.
Using a JWT analysis tool with a common wordlist, the signing key was successfully recovered.

JWT Secret Key Discovery (CookieMonster):
```bash
cookiemonster -cookie eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoQGcuY29tIiwiaWF0IjoxNzY5NTMw
```
Discovered Secret:
```bash
secret
```

With access to the signing key, an attacker can forge valid JWTs that are fully trusted by the backend,
leading to complete authentication bypass.


---

## 🚨 Proof of Exploitation
### Before Exploitation
- Attacker cannot access other users’ data
- Access is limited to the attacker’s own account

### After Exploitation
- Attacker forges a JWT using the recovered secret
- Server accepts the forged token as valid

Unauthorized access to protected endpoints is granted.

---

## ⚠️ Security Risk Explanation

Using a weak JWT secret completely undermines the security of token-based authentication.
### This vulnerability enables:
- Silent account takeover
- Persistent unauthorized access
- Token forgery at scale
- Easy chaining with other vulnerabilities such as CSRF and XSS

If authorization decisions (e.g., admin access) rely on JWT claims, this can directly result in
privilege escalation.

---

## 🛡️ Root Cause

- Weak and predictable JWT signing secret
- Symmetric signing (HS256) without sufficient entropy
- Lack of secret rotation and monitoring

---

## ✅ Recommended Fix

- Use a strong, randomly generated secret (minimum 32–64 bytes)
- Store secrets securely using environment variables
- Rotate JWT secrets periodically
- Prefer asymmetric signing (RS256)
- Never trust sensitive authorization data directly from JWT claims

---

## 📚 Learning Outcome

This vulnerability highlights how weak cryptographic practices in JWT implementations
can lead to full authentication compromise and large-scale account takeover.
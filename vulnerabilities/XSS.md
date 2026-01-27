# Stored XSS Vulnerability – Blog Posts

## 📌 Summary
A **Stored Cross-Site Scripting (XSS)** vulnerability was identified in the blog post creation functionality.  
An attacker can inject malicious JavaScript code into blog posts, which is later executed in the browsers of other users when they view the post.

This issue affects multiple input fields in the post creation form and results in persistent client-side code execution.

---

## 🎯 Impact
- Stored (Persistent) XSS
- Execution of arbitrary JavaScript in victims’ browsers
- Session hijacking, phishing, or malicious redirection
- Affects all users who view the malicious post

**Severity:** High  
**OWASP Top 10:** A3 – Injection (XSS)

---

## 🧩 Affected Endpoint
POST /user/posts/create
POST /user/posts/{id}

---

## 🔍 Vulnerability Details
The application allows authenticated users to create new blog posts with the following fields:
- Post Title
- Upload Cover (covered separately as an [upload vulnerability](file-upload.md))
- Post Content

User-supplied input is rendered in HTML responses without proper output encoding or sanitization.  
As a result, injected HTML and JavaScript code is stored in the database and executed when other users view the post.

---

## 📥 Normal Behavior
An authenticated user can create a blog post via:
http://localhost:3000/user/posts/create

After clicking **Publish Post**, the blog post appears on the homepage:
http://localhost:3000/

Users can then click the **Read More** button to view the full content of the post.

---

## 💥 Exploitation

### Payload Injection – Post Title
The following payload was injected into the **Post Title** field:

```html
</h1><script>alert(origin)</script>//
```
After submitting the form, the post was successfully created and stored.

---

## 🚨 Proof of Exploitation
### Triggering the XSS

1. Navigate to the blog homepage:
http://localhost:3000/
2. Locate the malicious blog post.
3. Click the Read More button.

💥 Result:
The injected JavaScript payload executes and displays an alert.

This is not a self-XSS, as any user visiting the blog and clicking Read More will trigger the payload.

---

## 🔁 Alternative Injection Point – Post Content

Instead of the Post Title, the following payload can be injected into the Post Content field:
```html
</p><script>alert(origin)</script>//
```
By repeating the same steps (publishing the post and clicking Read More), the XSS payload is executed again.

---

## 🛡️ Root Cause

- Missing output encoding when rendering user-controlled input
- No server-side sanitization of HTML content
- Trusting raw user input in templates

---

## ✅ Recommended Fix

- Apply context-aware output encoding
- Sanitize or strip HTML tags from user input
- Use a strict allowlist for permitted HTML (if rich text is required)
- Implement a strong Content Security Policy (CSP)

---

## 📚 Learning Outcome

This vulnerability demonstrates how improper handling of user input can lead to stored XSS, allowing attackers to execute arbitrary JavaScript in the browsers of other users.
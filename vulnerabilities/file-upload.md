# File Upload Vulnerability – Stored XSS via Malicious File

## 📌 Summary
A **File Upload** vulnerability was identified in the blog post creation functionality.  
By uploading a crafted file containing malicious JavaScript code, an attacker can achieve **Stored Cross-Site Scripting (XSS)** when the uploaded file is accessed by users.

This issue occurs due to improper validation of uploaded files, including missing content-type checks and unsafe handling of user-controlled filenames.

---

## 🎯 Impact
- Stored XSS via uploaded files
- Execution of arbitrary JavaScript in victims’ browsers
- Potential session hijacking or account compromise
- Affects any user who accesses the uploaded file

**Severity:** High  
**OWASP Top 10:** A3 – Injection (XSS) / A5 – Security Misconfiguration  
**OWASP Category:** Unrestricted File Upload

---

## 🧩 Affected Endpoint
POST /user/posts/create  
POST /user/posts/{id}

---

## 🔍 Vulnerability Details
The application allows authenticated users to create new blog posts with the following fields:
- Post Title
- Upload Cover
- Post Content

While **Post Title** and **Post Content** were already confirmed vulnerable to  
[Stored XSS](XSS.md), the **Upload Cover** functionality introduces an additional risk.

Uploaded files are:
- Not properly validated on the server side
- Served directly to users
- Accessible via a public directory without sanitization or security headers

---

## 📥 Normal Upload Process
A user creates a blog post via:

http://localhost:3000/user/posts/create

During this process, a normal image file is selected as the post cover and uploaded to the server.

---

## 💥 Exploitation

### Step 1: Injecting XSS Payload into an Image File
A valid image file was selected and the following command was used on Linux to append a JavaScript payload to the end of the file:

```bash
echo '<script>alert(origin)</script>' >> Test.png
```
This preserves the image header while embedding malicious script content.


### Step 2: Uploading the File

The modified image was uploaded as the post cover.
The upload request was intercepted using Burp Suite and sent to Repeater.

### Step 3: Manipulating the Upload Request

The intercepted request was modified to change the uploaded file name and extension to HTML:

```http
POST /user/posts/2 HTTP/1.1
Host: 172.22.228.255:3000
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary5988Q8o26XMWhDly

------WebKitFormBoundary5988Q8o26XMWhDly
Content-Disposition: form-data; name="title"

Test
------WebKitFormBoundary5988Q8o26XMWhDly
Content-Disposition: form-data; name="cover"; filename="Test.html"
Content-Type: image/png

PNG

```
The server accepted the request without validating the file extension or MIME type consistency.

---

## 🚨 Proof of Exploitation

After a successful upload, the file became publicly accessible.
By navigating to the following URL:
http://localhost:3000/user_files/Test.html

💥 Result:
The embedded JavaScript payload executed successfully, triggering the XSS alert.
This confirms a Stored XSS via File Upload, exploitable by any user who accesses the uploaded file.

---

## 🛡️ Root Cause

- No validation of file extension on upload
- No verification of MIME type against file content
- User-uploaded files served directly from a public directory
- Absence of security headers such as Content-Disposition

---

## ✅ Recommended Fix

- Restrict allowed file extensions using a strict allowlist
- Validate MIME type and file signature (magic bytes)
- Store uploaded files outside the web root
- Rename uploaded files using server-generated names
- Serve files with Content-Disposition: attachment
- Disable execution of uploaded content

---

## 📚 Learning Outcome

This vulnerability demonstrates how improper file upload handling can lead to stored XSS, allowing attackers to execute malicious JavaScript through uploaded files and compromise other users.


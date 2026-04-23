---
title: CTF 训练记录：从萌新到入门
date: "2024-05-10"
excerpt: 记录我参与 CTF 竞赛的经历，包括解题思路、学到的知识点和踩过的坑。
category: CTF
tags: ["CTF", "Web安全", "Writeup"]
published: true
---

## 写在前面

CTF（Capture The Flag）是网络安全领域非常流行的竞赛形式。通过解决各种安全挑战来获取 flag。我从今年开始系统性地参与 CTF 训练，这篇文章记录了我的成长历程。

## 什么是 CTF

CTF 主要分为以下几种类型：

- **Web**：Web 安全相关的漏洞利用
- **Crypto**：密码学挑战
- **Reverse**：逆向工程
- **Pwn**：二进制漏洞利用
- **Misc**：杂项，包括隐写、取证等

我的主攻方向是 **Web**，偶尔也会尝试 Misc 和简单的 Crypto。

## 我的 CTF 学习路线

### 第一阶段：基础知识（1-2 个月）

这个阶段主要是打基础，推荐的资源：

- **PicoCTF**：非常适合入门的平台，难度循序渐进
- **CTF Wiki**：系统学习 CTF 知识的 wiki
- **PortSwigger Web Security Academy**：Web 安全的系统化学习

**重点学习内容**：
- HTTP 协议基础
- 常见 Web 漏洞原理（SQL注入、XSS、CSRF等）
- Linux 基础命令
- Python 脚本编写

### 第二阶段：专项练习（2-3 个月）

基础打好后，开始针对性练习：

- **BUUCTF**：大量的真题复现
- **攻防世界**：国内的练习平台
- **VulnHub**：靶机渗透练习

### 第三阶段：参加比赛（持续）

- **校内赛/新生赛**：难度较低，适合积累经验
- **公开赛**：如 XCTF、强网杯等
- **国际赛**：如 PicoCTF、HSCTF 等

## 典型题目分析

### Web 题：简单的 SQL 注入

**题目描述**：
登录页面，需要获取 admin 的密码。

**解题过程**：

1. 首先尝试正常登录，观察报错信息：

```
Username: admin
Password: test
```

报错：`SQL Error: You have an error in your SQL syntax`

2. 确认存在 SQL 注入，尝试万能密码：

```
Username: admin' or '1'='1'--
Password: 任意
```

成功登录，获得 flag。

**学到的东西**：
- 报错信息是 SQL 注入的重要线索
- 万能密码的原理是构造永真条件
- `--` 是 MySQL 的注释符

### Web 题：文件包含漏洞

**题目描述**：
页面有个 `page` 参数，可以加载不同页面。

```
http://target.com/index.php?page=about.php
```

**解题过程**：

1. 尝试本地文件包含：

```
http://target.com/index.php?page=/etc/passwd
```

成功读取了 passwd 文件。

2. 尝试读取 flag：

```
http://target.com/index.php?page=../../../../flag.txt
```

获得 flag。

**学到的东西**：
- 文件包含漏洞的危害很大
- `../` 可以目录遍历
- 一些绕过技巧：
  - 双写绕过：`..././..././`
  - URL 编码：`%2e%2e%2f`
  - 空字节截断（PHP 5.3.4 以下）

### Misc 题：图片隐写

**题目描述**：
给了一张图片，需要找出隐藏的信息。

**解题过程**：

1. 首先用 `file` 和 `binwalk` 分析：

```bash
file challenge.jpg
binwalk challenge.jpg
```

发现图片中嵌入了 ZIP 文件。

2. 提取嵌入的文件：

```bash
binwalk -e challenge.jpg
```

3. 发现 ZIP 有密码，尝试弱口令破解：

```bash
fcrackzip -b -c1 -l 1-6 -u extracted.zip
```

密码是 `123456`，解压后获得 flag。

**学到的东西**：
- 图片隐写的常见手法
- binwalk 的使用方法
- 压缩包密码爆破

## 常用工具清单

### Web 工具

| 工具 | 用途 |
|------|------|
| Burp Suite | 抓包、改包、爆破 |
| SQLMap | SQL 注入自动化检测 |
| Postman | API 测试 |
| HackBar | 浏览器插件，快速测试 |

### 杂项工具

| 工具 | 用途 |
|------|------|
| StegSolve | 图片隐写分析 |
| Binwalk | 文件提取 |
| foremost | 文件恢复 |
| wireshark | 流量分析 |

### 编码/解码

| 工具 | 用途 |
|------|------|
| CyberChef | 万能编码工具 |
| Burp Decoder | 解码编码 |
| 在线工具 | Base64、URL 编码等 |

## 踩过的坑

### 1. 不要过度依赖工具

刚开始学习时，我太依赖 SQLMap 等自动化工具。虽然能快速解题，但对原理理解不深。建议先手工注入，理解原理后再用工具提升效率。

### 2. 注意题目提示

有时候题目描述或页面源码中会有重要提示，一定要仔细阅读。有次比赛我找了好久切入点，后来发现题目描述里直接告诉了我漏洞类型。

### 3. 团队协作很重要

CTF 比赛通常是团队赛，要学会分工协作。擅长 Web 的做 Web，擅长 Crypto 的做 Crypto，互相讨论能更快找到思路。

## 我的 Flag

经过几个月的学习，我已经能够：

- 独立解决基础的 Web 题目
- 理解常见漏洞的原理和利用方法
- 编写简单的 Python 脚本辅助解题
- 在队内赛中获得名次

## 下一步计划

1. **深入学习**：研究更复杂的漏洞，如 SSRF、XXE、反序列化等
2. **代码审计**：学习 PHP/Java 代码审计，从源头找漏洞
3. **内网渗透**：学习渗透测试的后渗透阶段
4. **漏洞挖掘**：尝试在合法授权的情况下挖掘真实漏洞

## 推荐资源

- **书籍**：
  - 《CTF 竞赛权威指南（Pwn篇）》
  - 《Web 安全深度剖析》
  - 《白帽子讲 Web 安全》

- **在线平台**：
  - [CTFtime](https://ctftime.org/) - CTF 赛事日历
  - [PicoCTF](https://picoctf.org/) - 入门练习
  - [CTF Wiki](https://ctf-wiki.org/) - 知识库

- **社区**：
  - 看雪论坛
  - T00ls
  - 先知社区

## 结语

CTF 是一条漫长但有趣的成长之路。每解决一道题目，都会有新的收获。希望这篇文章能帮助到同样想学习 CTF 的朋友。

记住：**CTF 的目的是学习，而不只是获取 flag。**

如果你也对 CTF 感兴趣，欢迎一起交流讨论！

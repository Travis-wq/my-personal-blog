---
title: Linux 学习笔记：从入门到熟练
excerpt: 记录我的 Linux 学习历程，包括常用命令、系统管理和安全基础，适合初学者参考。
date: "2024-03-15"
category: 学习笔记
tags: ["Linux", "运维", "系统管理"]
published: true
---

## 前言

作为一名网络安全学习者，Linux 是必不可少的基础技能。无论是进行渗透测试、搭建实验环境，还是编写自动化脚本，Linux 都扮演着核心角色。这篇文章记录了我学习 Linux 的一些心得和常用知识。

## 为什么要学 Linux

在网络安全领域，Linux 的重要性不言而喻：

- **开源免费**：无需担心授权问题，可以自由学习和修改
- **服务器主流**：绝大多数 Web 服务器运行在 Linux 上
- **安全工具丰富**：Kali Linux 等发行版集成了大量安全工具
- **自动化能力**：Shell 脚本让重复工作变得简单

## 基础命令速查

### 文件操作

```bash
# 查看当前目录
pwd

# 列出文件
ls -la

# 切换目录
cd /path/to/directory

# 创建目录
mkdir -p /path/to/new/dir

# 复制文件
cp source.txt dest.txt

# 移动/重命名
mv oldname.txt newname.txt

# 删除文件（谨慎使用！）
rm -i filename.txt

# 删除目录
rm -rf directory/
```

### 权限管理

```bash
# 查看文件权限
ls -la file.txt

# 修改权限
chmod 755 script.sh
chmod u+x script.sh

# 修改所有者
chown user:group file.txt

# 切换到 root 用户
sudo -i
sudo su -
```

### 进程管理

```bash
# 查看运行中的进程
ps aux

# 实时查看进程
top
htop  # 需要安装

# 查找特定进程
ps aux | grep python

# 结束进程
kill -9 PID
killall process_name
```

## 网络相关命令

```bash
# 查看网络配置
ip addr
ifconfig  # 传统命令

# 测试网络连通性
ping google.com

# 查看端口占用
netstat -tuln
ss -tuln  # 现代替代命令

# 追踪路由
traceroute google.com

# 下载文件
wget http://example.com/file.zip
curl -O http://example.com/file.zip
```

## 文本处理三剑客

### grep - 文本搜索

```bash
# 基本搜索
grep "pattern" file.txt

# 递归搜索
grep -r "pattern" /path/

# 显示行号
grep -n "pattern" file.txt

# 忽略大小写
grep -i "pattern" file.txt

# 反向匹配
grep -v "pattern" file.txt
```

### sed - 流编辑器

```bash
# 替换文本
sed 's/old/new/g' file.txt

# 直接修改文件
sed -i 's/old/new/g' file.txt

# 删除行
sed '5d' file.txt  # 删除第5行
sed '/pattern/d' file.txt  # 删除匹配行
```

### awk - 文本分析

```bash
# 打印指定列
awk '{print $1}' file.txt

# 使用分隔符
awk -F: '{print $1}' /etc/passwd

# 条件过滤
awk '$3 > 100 {print $1}' file.txt
```

## Shell 脚本基础

### 第一个脚本

```bash
#!/bin/bash

# 这是一个简单的备份脚本
SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/home/user/backup"
DATE=$(date +%Y%m%d)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 执行备份
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $SOURCE_DIR

echo "备份完成: $BACKUP_DIR/backup_$DATE.tar.gz"
```

### 变量与条件判断

```bash
#!/bin/bash

# 定义变量
NAME="Travis"
AGE=25

# 条件判断
if [ $AGE -ge 18 ]; then
    echo "$NAME 已成年"
else
    echo "$NAME 未成年"
fi

# 循环
for i in {1..5}; do
    echo "第 $i 次循环"
done

# 函数
greet() {
    echo "Hello, $1!"
}

greet "World"
```

## 系统安全基础

### 用户和组管理

```bash
# 添加用户
sudo useradd -m -s /bin/bash username

# 设置密码
sudo passwd username

# 添加到 sudo 组
sudo usermod -aG sudo username

# 删除用户
sudo userdel -r username
```

### 日志查看

```bash
# 系统日志
sudo journalctl

# SSH 登录日志
sudo cat /var/log/auth.log

# 实时查看日志
sudo tail -f /var/log/syslog
```

### 文件完整性检查

```bash
# 计算文件哈希
md5sum file.txt
sha256sum file.txt

# 对比文件
diff file1.txt file2.txt
```

## 学习建议

1. **多动手实践**：搭建一个 Linux 虚拟机，每天使用
2. **阅读 man 文档**：遇到不懂的命令先看官方文档
3. **写脚本解决问题**：把重复的操作写成脚本
4. **参与社区**：Linux 社区非常活跃，有问题多搜索
5. **循序渐进**：不要急于学习高级内容，打好基础

## 总结

Linux 的学习是一个持续的过程。作为安全从业者，我将继续深入学习：

- 内核和系统调用
- 网络安全配置（iptables、nftables）
- 容器和虚拟化（Docker、KVM）
- 安全审计和加固

希望这篇文章对你有所帮助。如有问题，欢迎交流讨论。

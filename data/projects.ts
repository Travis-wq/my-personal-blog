import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "vuln-lab",
    name: "Web 漏洞练习环境",
    description:
      "基于 Docker 的 Web 安全漏洞练习平台，集成了 SQL 注入、XSS、CSRF、文件上传等常见漏洞场景。包含详细的 writeup 和修复建议，适合初学者系统学习 Web 安全。",
    techStack: ["Docker", "PHP", "MySQL", "Nginx", "Python"],
    githubUrl: "https://github.com/travis/vuln-lab",
    demoUrl: "",
    featured: true,
  },
  {
    id: "sec-tools",
    name: "Python 安全工具集",
    description:
      "用 Python 编写的网络安全小工具集合，包括端口扫描器、子域名爆破、目录爆破、弱密码检测等实用工具。代码结构清晰，注释详细，适合学习和二次开发。",
    techStack: ["Python", "AsyncIO", "Requests", "Click"],
    githubUrl: "https://github.com/travis/sec-tools",
    demoUrl: "",
    featured: true,
  },
  {
    id: "linux-scripts",
    name: "Linux 自动化脚本",
    description:
      "日常 Linux 系统管理和安全审计的自动化脚本合集。包含系统信息收集、日志分析、安全基线检查、备份脚本等，帮助提升运维效率和系统安全性。",
    techStack: ["Bash", "Python", "Linux", "Cron"],
    githubUrl: "https://github.com/travis/linux-scripts",
    demoUrl: "",
    featured: true,
  },
];

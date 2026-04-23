import { Skill } from "@/types";

export const skills: Skill[] = [
  // 安全技能
  { name: "Web 安全", level: 75, category: "security" },
  { name: "渗透测试", level: 70, category: "security" },
  { name: "漏洞挖掘", level: 65, category: "security" },
  { name: "CTF 竞赛", level: 70, category: "security" },
  { name: "安全工具使用", level: 75, category: "security" },

  // 编程技能
  { name: "Python", level: 80, category: "programming" },
  { name: "JavaScript/TypeScript", level: 75, category: "programming" },
  { name: "Bash/Shell", level: 70, category: "programming" },
  { name: "SQL", level: 65, category: "programming" },

  // 系统技能
  { name: "Linux", level: 85, category: "system" },
  { name: "Docker", level: 70, category: "system" },
  { name: "Kali Linux", level: 80, category: "system" },
  { name: "网络基础", level: 75, category: "system" },

  // 其他
  { name: "Git", level: 80, category: "other" },
  { name: "VS Code", level: 85, category: "other" },
];

export const skillCategories = [
  { key: "security", label: "安全" },
  { key: "programming", label: "编程" },
  { key: "system", label: "系统" },
  { key: "other", label: "工具" },
];

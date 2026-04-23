"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ?? "";
const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
const web3FormsEndpoint = "https://api.web3forms.com/submit";
const MIN_FILL_TIME_MS = 3000;
const RESUBMIT_COOLDOWN_MS = 30000;
const COOLDOWN_STORAGE_KEY = "contact-form-cooldown-until";
const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [mountedAt, setMountedAt] = useState<number | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const currentTime = Date.now();
    setMountedAt(currentTime);

    if (typeof window === "undefined") {
      return;
    }

    const storedCooldown = window.localStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (storedCooldown) {
      const parsedCooldown = Number(storedCooldown);
      if (!Number.isNaN(parsedCooldown) && parsedCooldown > currentTime) {
        setCooldownUntil(parsedCooldown);
      } else {
        window.localStorage.removeItem(COOLDOWN_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownUntil <= now) {
      if (cooldownUntil !== 0) {
        setCooldownUntil(0);
      }
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(COOLDOWN_STORAGE_KEY);
      }
      return;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [cooldownUntil, now]);

  const cooldownSecondsLeft = useMemo(() => {
    if (cooldownUntil <= now) {
      return 0;
    }

    return Math.ceil((cooldownUntil - now) / 1000);
  }, [cooldownUntil, now]);

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
    setHoneypot("");
    setFormData(initialFormData);
    setMountedAt(Date.now());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formspreeEndpoint && !web3FormsAccessKey) {
      setStatus("error");
      setErrorMessage(
        "表单服务尚未配置。请在部署环境中设置 NEXT_PUBLIC_FORMSPREE_ENDPOINT 或 NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY。"
      );
      return;
    }

    if (honeypot.trim()) {
      setStatus("error");
      setErrorMessage("提交失败，请刷新页面后重试。");
      return;
    }

    if (cooldownSecondsLeft > 0) {
      setStatus("error");
      setErrorMessage(`提交过于频繁，请在 ${cooldownSecondsLeft} 秒后再试。`);
      return;
    }

    if (!mountedAt || Date.now() - mountedAt < MIN_FILL_TIME_MS) {
      setStatus("error");
      setErrorMessage("提交速度过快，请稍等几秒后再发送。");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const isUsingFormspree = Boolean(formspreeEndpoint);
      const endpoint = isUsingFormspree ? formspreeEndpoint : web3FormsEndpoint;
      const payload = isUsingFormspree
        ? {
            ...formData,
            _subject: formData.subject,
            source: "GitHub Pages Contact Form",
          }
        : {
            access_key: web3FormsAccessKey,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            from_name: "Travis Blog",
            botcheck: false,
            source: "GitHub Pages Contact Form",
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as
          | { errors?: Array<{ message?: string }>; message?: string }
          | null;
        const message =
          errorPayload?.errors?.[0]?.message ??
          errorPayload?.message ??
          "提交失败，请稍后重试或直接通过邮箱联系我。";
        throw new Error(message);
      }

      const nextCooldown = Date.now() + RESUBMIT_COOLDOWN_MS;
      setCooldownUntil(nextCooldown);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(nextCooldown));
      }

      setStatus("success");
      setFormData(initialFormData);
      setHoneypot("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "提交失败，请稍后重试或直接通过邮箱联系我。"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-muted/30 py-16 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="text-xl font-semibold">消息已发送</h3>
        <p className="max-w-sm text-muted-foreground">
          感谢你的留言，我会尽快回复。你也可以继续补充信息，或者直接通过邮箱联系我。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={resetForm}>
            再发一条
          </Button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-transparent px-4 text-sm font-medium transition-all duration-200 hover:bg-muted"
          >
            直接发邮件
          </a>
        </div>
        {cooldownSecondsLeft > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            为减少垃圾消息，下一次提交可在 {cooldownSecondsLeft} 秒后进行。
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {cooldownSecondsLeft > 0 && (
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          为减少垃圾消息，表单每 {Math.floor(RESUBMIT_COOLDOWN_MS / 1000)} 秒允许提交一次。
          当前还需等待 {cooldownSecondsLeft} 秒。
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            姓名
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            placeholder="您的姓名"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            邮箱
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          主题
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          placeholder="留言主题"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          消息内容
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          placeholder="请输入您的消息..."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting" || cooldownSecondsLeft > 0}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            发送中...
          </>
        ) : cooldownSecondsLeft > 0 ? (
          <>请稍后再试</>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            发送消息
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {formspreeEndpoint
          ? "消息会通过 Formspree 转发到你的邮箱，并启用基础防垃圾保护。"
          : web3FormsAccessKey
            ? "消息会通过 Web3Forms 转发到你的邮箱，并启用基础防垃圾保护。"
            : "部署前请配置 NEXT_PUBLIC_FORMSPREE_ENDPOINT 或 NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY，表单才能真实发送。"}
      </p>
    </form>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { heroConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, FolderGit2, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 text-center lg:flex-row lg:text-left">
          {/* Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {heroConfig.role}
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {heroConfig.name}
            </h1>

            <p className="mb-2 text-xl font-medium text-muted-foreground sm:text-2xl">
              {heroConfig.tagline}
            </p>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {heroConfig.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/blog">
                <Button size="lg" className="group w-full sm:w-auto">
                  <FileText className="mr-2 h-4 w-4" />
                  {heroConfig.cta.blog}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <FolderGit2 className="mr-2 h-4 w-4" />
                  {heroConfig.cta.projects}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  {heroConfig.cta.contact}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-64 w-64 sm:h-80 sm:w-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted to-muted/50" />
              <div className="absolute inset-2 rounded-full bg-background" />
              <div className="absolute inset-4 flex items-center justify-center rounded-full bg-muted">
                <span className="font-mono text-6xl font-bold sm:text-8xl">
                  T
                </span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full border-2 border-foreground" />
              <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-foreground" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

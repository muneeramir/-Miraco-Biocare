"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { newsArticles } from "@/data/news";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { cn } from "@/lib/utils";

export function NewsSection() {
  const articles = newsArticles.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <SectionHeading
            label="News & Events"
            title="Latest Updates"
            description="Stay informed about our partnerships, product launches, and industry events."
          />
          <Link
            href="/news"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <MobileCarousel className="md:grid-cols-3 md:gap-6" breakpoint="md">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/news/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-40 overflow-hidden md:h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Badge className="absolute left-3 top-3 bg-brand-primary">
                    {article.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-brand-text group-hover:text-brand-primary md:text-lg">
                    {article.title}
                  </h3>
                  <p className="flex-1 text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-brand-primary">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}

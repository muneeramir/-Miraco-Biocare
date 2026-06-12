"use client";

import Link from "next/link";
import { Globe, Mail, Share2, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { footerLinks } from "@/data/navigation";
import { company } from "@/data/company";

const socialIcons = [
  { icon: Share2, href: company.social.linkedin, label: "LinkedIn" },
  { icon: Globe, href: company.social.twitter, label: "Twitter" },
  { icon: Mail, href: company.social.facebook, label: "Facebook" },
  { icon: Video, href: company.social.youtube, label: "YouTube" },
];

const footerSections = [
  { title: "Company", links: footerLinks.company },
  { title: "Divisions", links: footerLinks.divisions },
  { title: "Solutions", links: footerLinks.products },
  { title: "Services", links: footerLinks.services },
  { title: "Downloads", links: footerLinks.downloads },
  { title: "Contact", links: footerLinks.contact },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-light">
      <div className="container-custom py-8 md:py-12">
        <div className="mb-8 grid gap-8 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Miraco Biocare Logo"
                className="h-10 w-auto md:h-15 md:w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{company.tagline}</p>
            <div className="mt-4 flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border bg-white text-muted-foreground transition-colors hover:border-brand-primary hover:text-brand-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden gap-6 md:grid md:grid-cols-2 lg:col-span-4 lg:grid-cols-5">
            {footerSections.slice(0, 5).map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-sm font-semibold text-brand-text">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <Accordion type="multiple" className="w-full">
              {footerSections.map((section) => (
                <AccordionItem key={section.title} value={section.title}>
                  <AccordionTrigger className="text-sm font-semibold">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pb-2">
                      {section.links.map((link) => (
                        <li key={link.title}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-brand-primary"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
  <img src="https://nextgenlife.com/wp-content/uploads/2023/11/msme.png" alt="" className="w-[100px] h-[46px] object-contain" />
  <img src="https://nextgenlife.com/wp-content/uploads/2023/11/gem.png" alt="" className="w-[100px] h-[46px] object-contain" />
  <img src="https://nextgenlife.com/wp-content/uploads/2023/11/ISO.png" alt="" className="w-[100px] h-[46px] object-contain" />
  <img src="https://nextgenlife.com/wp-content/uploads/2023/11/makeinindia.png" alt="" className="w-[100px] h-[46px] object-contain" />
</div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © 2026 Miraco Biocare Private Limited. All Rights Reserved.
            <br></br>
Crafted & Developed by Towseef Ahmad Lone
          </p>
         
        </div>
      </div>
    </footer>
  );
}

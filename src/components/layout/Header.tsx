"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/data/navigation";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { TopBar } from "./TopBar";
import { NavDropdown } from "./NavDropdown";
import { MobileNavGroup } from "./MobileNavGroup";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ title: string; url: string; category: string }>>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isNavItemActive = (item: (typeof mainNav)[number]) => {
    if (item.children) {
      return (
        isActive(item.href) ||
        item.children.some((child) => isActive(child.href))
      );
    }
    return isActive(item.href);
  };

  const closeMobile = () => setMobileOpen(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results: Array<{ title: string; url: string; category: string }> = [];

    // Search in main navigation
    mainNav.forEach((item) => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        results.push({ title: item.title, url: item.href, category: "Navigation" });
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.title.toLowerCase().includes(lowerQuery)) {
            results.push({ title: child.title, url: child.href, category: item.title });
          }
        });
      }
    });

    setSearchResults(results.slice(0, 10));
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <TopBar />
      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "glass-header shadow-sm" : "bg-white"
        )}
      >
        <div className="container-custom flex h-16 items-center justify-between md:h-20">
       <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Miraco Biocare Logo"
            className="h-10 w-auto md:h-15 md:w-auto object-contain"
          />

 
</Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  items={item.children}
                  isActive={isNavItemActive(item)}
                  isChildActive={isActive}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-light hover:text-brand-primary",
                    isActive(item.href) && "text-brand-primary"
                  )}
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "hidden md:flex"
                )}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <div className="mx-auto max-w-2xl space-y-4 py-4">
                  <input
                    type="text"
                    placeholder="Search pages, divisions, services..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  {searchResults.length > 0 && (
                    <div className="space-y-2">
                      {searchResults.map((result, idx) => (
                        <Link
                          key={idx}
                          href={result.url}
                          onClick={() => setSearchOpen(false)}
                          className="block rounded-lg border border-border p-3 hover:bg-muted"
                        >
                          <p className="font-medium text-foreground">{result.title}</p>
                          <p className="text-xs text-muted-foreground">{result.category}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.trim().length > 0 && searchResults.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">No results found</p>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Link
              href="/request-quotation"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "hidden sm:inline-flex"
              )}
            >
              Request Quote
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={(triggerProps) => (
                  <motion.button
                    {...triggerProps}
                    type="button"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    className="relative xl:hidden flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white/95 text-brand-text shadow-lg shadow-slate-900/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.03 }}
                    animate={{ scale: mobileOpen ? 1.02 : 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  >
                    <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
                    <motion.span
                      className="absolute h-0.5 w-5 rounded-full bg-current"
                      animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      style={{ transformOrigin: "center" }}
                    />
                    <motion.span
                      className="absolute h-0.5 w-5 rounded-full bg-current"
                      animate={mobileOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute h-0.5 w-5 rounded-full bg-current"
                      animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      style={{ transformOrigin: "center" }}
                    />
                  </motion.button>
                )}
              />
              <SheetContent
                side="right"
                className="w-full max-w-sm overflow-hidden bg-white/90 text-brand-text backdrop-blur-2xl border-l border-white/30 shadow-2xl shadow-slate-950/20"
                showCloseButton={false}
              >
                <motion.div
                  initial={{ opacity: 0, x: 28, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 28, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6"
                >
                  <div className="mb-6 flex items-center justify-between border-b border-white/20 pb-4">
                    <Link
                      href="/"
                      onClick={closeMobile}
                      className="font-bold text-brand-primary"
                    >
                      {company.shortName}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={closeMobile}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <motion.nav
                    initial="hidden"
                    animate={mobileOpen ? "visible" : "hidden"}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="flex flex-col gap-2"
                  >
                    {mainNav.map((item) => (
                      <motion.div
                        key={item.title}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className="overflow-hidden rounded-3xl bg-white/80 transition-all duration-300"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {item.children ? (
                          <MobileNavGroup
                            title={item.title}
                            href={item.href}
                            items={item.children}
                            isActive={isActive}
                            onNavigate={closeMobile}
                          />
                        ) : (
                          <Link
                            href={item.href}
                            onClick={closeMobile}
                            className={cn(
                              "flex w-full items-center rounded-3xl px-4 py-4 text-sm font-medium transition-colors duration-200 hover:bg-brand-primary/10 hover:text-brand-primary",
                              isActive(item.href) ? "text-brand-primary" : "text-brand-text"
                            )}
                          >
                            {item.title}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </motion.nav>

                  <div className="mt-6 space-y-3 border-t border-white/20 pt-5">
                    <Link
                      href="/request-quotation"
                      onClick={closeMobile}
                      className={cn(
                        buttonVariants({ variant: "default", size: "default" }),
                        "inline-flex w-full justify-center"
                      )}
                    >
                      Request Quote
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "default" }),
                        "inline-flex w-full justify-center"
                      )}
                    >
                      Contact
                    </Link>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

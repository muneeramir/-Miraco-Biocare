export interface NavChild {
  title: string;
  href: string;
  description?: string;
}

export interface NavItem {
  title: string;
  href: string;
  children?: NavChild[];
}

export const divisions: NavChild[] = [
  {
    title: "Pharmaceuticals",
    href: "/pharmaceuticals",
    description:
      "Quality pharmaceutical products and healthcare solutions meeting the highest standards of safety and efficacy.",
  },
  {
    title: "Clinical Diagnostics",
    href: "/clinical-diagnostics",
    description:
      "Advanced diagnostic technologies for accurate disease detection, monitoring, and patient management.",
  },
  {
    title: "Life Sciences",
    href: "/life-sciences",
    description:
      "World-class instruments, reagents, consumables, and laboratory solutions for scientific innovation.",
  },
  {
    title: "Genomics",
    href: "/genomics",
    description:
      "High-performance genomic workflows for research and clinical laboratories.",
  },
  {
    title: "Biotechnology",
    href: "/biotechnology",
    description:
      "Solutions for genomics, molecular biology, cell biology, and translational research.",
  },
];

export const aboutSubmenu: NavChild[] = [
  {
    title: "Leadership",
    href: "/leadership",
    description: "Meet our leadership team and industry experts.",
  },
  {
    title: "Partners",
    href: "/partners",
    description: "Global technology partners and manufacturers we collaborate with.",
  },
  {
    title: "Industries We Serve",
    href: "/industries-we-serve",
    description: "Empowering scientific innovation and healthcare excellence across diverse industries.",
  },
];

export const contactSubmenu: NavChild[] = [
  {
    title: "Careers",
    href: "/careers",
    description: "Explore career opportunities and join our growing team.",
  },
];

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: aboutSubmenu,
  },
  {
    title: "Divisions",
    href: "#",
    children: divisions,
  },
  { title: "Product Portfolio", href: "/products" },
  { title: "Services", href: "/services" },
  { title: "News & Events", href: "/news" },
  {
    title: "Contact Us",
    href: "/contact",
    children: contactSubmenu,
  },
];

export const footerLinks = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Leadership", href: "/leadership" },
    { title: "Industries We Serve", href: "/industries-we-serve" },
    { title: "Gallery", href: "/gallery" },
    { title: "Careers", href: "/careers" },
    { title: "News & Events", href: "/news" },
  ],
  divisions: divisions.map((d) => ({ title: d.title, href: d.href })),
  products: [
    { title: "Diagnostics", href: "/clinical-diagnostics" },
    { title: "Life Sciences", href: "/life-sciences" },
    { title: "Genomics", href: "/genomics" },
    { title: "Pharmaceuticals", href: "/pharmaceuticals" },
    { title: "Biotechnology", href: "/biotechnology" },
  ],
  services: [
    { title: "All Services", href: "/services" },
    { title: "Installation", href: "/services/installation-support" },
    { title: "Training", href: "/services/training-programs" },
    { title: "Maintenance", href: "/services/maintenance-services" },
    { title: "Consulting", href: "/services/laboratory-consulting" },
  ],
  downloads: [
    { title: "Product Catalogs", href: "/downloads" },
    { title: "Brochures", href: "/downloads" },
    { title: "Technical Documents", href: "/downloads" },
    { title: "Request Quotation", href: "/request-quotation" },
  ],
  contact: [
    { title: "Contact Us", href: "/contact" },
    { title: "Request Quote", href: "/request-quotation" },
    { title: "Partners", href: "/partners" },
  ],
};

import { Mail, Phone, Clock } from "lucide-react";
import { company } from "@/data/company";

export function TopBar() {
  const phones = company.phone.split(",").map((p) => p.trim());
  const emails = company.email.split(";").map((e) => e.trim());

  return (
    <div className="hidden border-b border-brand-border bg-brand-light lg:block">
      <div className="container-custom flex items-center justify-between py-2 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-brand-primary"
            >
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </a>
          ))}
          {emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-brand-primary"
            >
              <Mail className="h-3.5 w-3.5" />
              {email}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {company.businessHours}
        </div>
      </div>
    </div>
  );
}

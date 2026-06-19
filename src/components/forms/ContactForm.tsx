"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  organization: z.string().min(2, "Organization is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    register("subject");
  }, [register]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to send message. Please try again."
        );
      }

      setShowSuccess(true);
      reset();
    } catch (err: any) {
      console.error("Contact Form submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" {...register("name")} className="mt-1.5" />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" {...register("email")} className="mt-1.5" />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" {...register("phone")} className="mt-1.5" />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="organization">Organization *</Label>
            <Input id="organization" {...register("organization")} className="mt-1.5" />
            {errors.organization && (
              <p className="mt-1 text-xs text-destructive">
                {errors.organization.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label>Subject *</Label>
          <Select onValueChange={(v) => setValue("subject", v as string)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="products">Product Information</SelectItem>
              <SelectItem value="quotation">Request Quotation</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
            </SelectContent>
          </Select>
          {errors.subject && (
            <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" rows={5} {...register("message")} className="mt-1.5" />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>
        {submitError && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium border border-destructive/20">
            {submitError}
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent Successfully</DialogTitle>
            <DialogDescription>
              Thank you for reaching out to Miraco Biocare. We have received your message
              and our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

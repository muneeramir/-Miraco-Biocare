"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { products } from "@/data/products";

const productRowSchema = z.object({
  product: z.string().min(1, "Select a product"),
  quantity: z.string().or(z.number()).transform((val) => Number(val)).pipe(z.number().int().min(1, "Min quantity is 1")),
});

const quotationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone is required"),
  organization: z.string().min(2, "Organization is required"),
  designation: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  products: z.array(productRowSchema).min(1, "Add at least one product"),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine((v) => v === true, "You must accept the terms"),
  accurateInfo: z.boolean().refine((v) => v === true, "Please confirm information accuracy"),
});

type QuotationFormData = z.input<typeof quotationSchema>;

export function QuotationForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      products: [{ product: "", quantity: 1 }],
      termsAccepted: false,
      accurateInfo: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");

  const onSubmit = async (data: QuotationFormData) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to submit quote request. Please try again."
        );
      }

      setShowSuccess(true);
      reset({
        name: "",
        email: "",
        phone: "",
        organization: "",
        designation: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        products: [{ product: "", quantity: 1 }],
        notes: "",
        termsAccepted: false,
        accurateInfo: false,
      });
    } catch (err: any) {
      console.error("Quote Form submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-lg border border-brand-border bg-white p-4 md:p-6">
          <h3 className="mb-4 text-lg font-semibold text-brand-text">
            Customer Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" {...register("name")} className="mt-1.5" />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} className="mt-1.5" />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
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
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" {...register("designation")} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input id="address" {...register("address")} className="mt-1.5" />
              {errors.address && (
                <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input id="city" {...register("city")} className="mt-1.5" />
              {errors.city && (
                <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input id="state" {...register("state")} className="mt-1.5" />
              {errors.state && (
                <p className="mt-1 text-xs text-destructive">{errors.state.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input id="pincode" {...register("pincode")} className="mt-1.5" />
              {errors.pincode && (
                <p className="mt-1 text-xs text-destructive">{errors.pincode.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-brand-border bg-white p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-brand-text">Product Selection</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ product: "", quantity: 1 })}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border text-left">
                  <th className="pb-3 pr-4 font-semibold">Product</th>
                  <th className="pb-3 pr-4 font-semibold w-32">Quantity</th>
                  <th className="pb-3 w-16 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className="border-b border-brand-border">
                    <td className="py-3 pr-4">
                      <Select
                        value={watchedProducts[index]?.product || ""}
                        onValueChange={(v) =>
                          setValue(`products.${index}.product`, v ?? "")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((p) => (
                            <SelectItem key={p.slug} value={p.slug}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 pr-4">
                      <Input
                        type="number"
                        min={1}
                        {...register(`products.${index}.quantity`)}
                      />
                    </td>
                    <td className="py-3">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 md:hidden">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg border border-brand-border p-4"
              >
                <Select
                  value={watchedProducts[index]?.product || ""}
                  onValueChange={(v) => setValue(`products.${index}.product`, v ?? "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.slug} value={p.slug}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min={1}
                      {...register(`products.${index}.quantity`)}
                      className="mt-1"
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-6"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {errors.products && (
            <p className="mt-2 text-xs text-destructive">
              {errors.products.message || errors.products.root?.message}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-brand-border bg-white p-4 md:p-6">
          <h3 className="mb-4 text-lg font-semibold text-brand-text">
            Additional Notes
          </h3>
          <Textarea
            rows={4}
            placeholder="Any specific requirements, delivery preferences, or additional information..."
            {...register("notes")}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              onCheckedChange={(c) => setValue("termsAccepted", c === true)}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the terms and conditions and privacy policy of Miraco Biocare
              Private Limited. *
            </Label>
          </div>
          {errors.termsAccepted && (
            <p className="text-xs text-destructive">{errors.termsAccepted.message}</p>
          )}
          <div className="flex items-start gap-2">
            <Checkbox
              id="accurate"
              onCheckedChange={(c) => setValue("accurateInfo", c === true)}
            />
            <Label htmlFor="accurate" className="text-sm leading-relaxed">
              I confirm that all information provided is accurate and complete. *
            </Label>
          </div>
          {errors.accurateInfo && (
            <p className="text-xs text-destructive">{errors.accurateInfo.message}</p>
          )}
        </div>

        {submitError && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium border border-destructive/20">
            {submitError}
          </div>
        )}
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request Quote"}
        </Button>
      </form>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quotation Request Submitted</DialogTitle>
            <DialogDescription>
              Thank you for your quotation request. Our team will review your requirements
              and contact you within 1-2 business days with a detailed proposal.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

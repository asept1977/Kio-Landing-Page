import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

interface ContactFormProps {
  lang: Lang;
}

export function ContactForm({ lang }: ContactFormProps) {
  const t = translations[lang].form;

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      email: "",
      company: "",
      interest: "",
      message: "",
    },
  });

  const { mutate, isPending, isSuccess } = useCreateLead();

  const onSubmit = (data: InsertLead) => {
    trackEvent("contact_form_submitted", { location: "homepage" });
    mutate(data, {
      onSuccess: () => {
        trackEvent("contact_form_success", { location: "homepage" });
        form.reset();
      },
    });
  };

  return (
    <div className="w-full" data-testid="contact-form">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card rounded-md p-10 text-center"
            data-testid="form-success"
          >
            <div className="w-16 h-16 bg-[#ff6a00]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff6a00]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t.successTitle}</h3>
            <p className="text-foreground/60">{t.successDesc}</p>
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="mt-6 text-[#ff6a00]"
              data-testid="button-another-request"
            >
              {t.another}
            </Button>
          </motion.div>
        ) : (
          <Form {...form}>
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/50">{t.email} *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="name@company.com"
                          className="bg-background border-border text-foreground placeholder:text-foreground/30 focus:border-[#ff6a00]/50 focus:ring-[#ff6a00]/20"
                          disabled={isPending}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/50">{t.company}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="ACME GmbH"
                          className="bg-background border-border text-foreground placeholder:text-foreground/30 focus:border-[#ff6a00]/50 focus:ring-[#ff6a00]/20"
                          disabled={isPending}
                          data-testid="input-company"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/50">{t.interest}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground" data-testid="select-interest">
                          <SelectValue placeholder={t.interestPlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="Public Affairs" data-testid="option-public-affairs">{t.interestOptions.publicAffairs}</SelectItem>
                        <SelectItem value="Associations" data-testid="option-associations">{t.interestOptions.associations}</SelectItem>
                        <SelectItem value="Industry" data-testid="option-industry">{t.interestOptions.industry}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/50">{t.message}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        rows={3}
                        className="bg-background border-border text-foreground placeholder:text-foreground/30 focus:border-[#ff6a00]/50 focus:ring-[#ff6a00]/20 resize-none"
                        disabled={isPending}
                        data-testid="input-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-submit"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t.submit
                )}
              </Button>
            </motion.form>
          </Form>
        )}
      </AnimatePresence>
    </div>
  );
}

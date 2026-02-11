import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertLead } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const validated = api.leads.create.input.parse(data);
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("This email is already registered.");
        }
        if (res.status === 400) {
          throw new Error("Please check your email address.");
        }
        throw new Error("Something went wrong. Please try again.");
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome to KIO",
        description: "We will be in touch shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Unable to register",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

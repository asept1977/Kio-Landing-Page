import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WaitlistForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
  });

  const { mutate, isPending, isSuccess } = useCreateLead();

  const onSubmit = (data: InsertLead) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">You're on the list!</h3>
            <p className="text-green-700">Thanks for joining the KIO ecosystem. We'll be in touch soon.</p>
            <Button 
              variant="ghost" 
              onClick={() => window.location.reload()} 
              className="mt-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            >
              Register another email
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Input
                  {...register("email")}
                  placeholder="enter@email.com"
                  className="h-14 pl-6 pr-4 rounded-full border-2 border-gray-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-lg transition-all"
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="absolute -bottom-6 left-6 text-sm text-red-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Join Waitlist <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

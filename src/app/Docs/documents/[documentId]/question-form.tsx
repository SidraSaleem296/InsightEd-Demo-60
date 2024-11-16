// "use client";

// import { Input } from "@/components/ui/input";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAction } from "convex/react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { LoadingButton } from "@/components/loading-button";

// const formSchema = z.object({
//   text: z.string().min(1).max(250),
// });

// export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
//   const askQuestion = useAction(api.documents.askQuestion);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       text: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     await askQuestion({ question: values.text, documentId });
//     form.reset();
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-1 gap-2"
//       >
//         <FormField
//           control={form.control}
//           name="text"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   placeholder="Ask any question over this document"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <LoadingButton
//           isLoading={form.formState.isSubmitting}
//           loadingText="Submitting..."
//         >
//           Submit
//         </LoadingButton>
//       </form>
//     </Form>
//   );
// }


// "use client";

// import { Input } from "@/components/ui/input";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAction } from "convex/react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { LoadingButton } from "@/components/loading-button";

// const formSchema = z.object({
//   text: z.string().min(1).max(250),
// });

// export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
//   const askQuestion = useAction(api.documents.askQuestion);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       text: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       // Debugging logs to verify data being sent
//       console.log("Submitting question:", values.text);
//       console.log("Document ID:", documentId);

//       await askQuestion({ question: values.text, documentId });
//       form.reset();
//     } catch (error) {
//       console.error("Error in onSubmit:", error);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-1 gap-2"
//       >
//         <FormField
//           control={form.control}
//           name="text"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   placeholder="Ask any question about this document"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <LoadingButton
//           isLoading={form.formState.isSubmitting}
//           loadingText="Submitting..."
//         >
//           Submit
//         </LoadingButton>
//       </form>
//     </Form>
//   );
// }

// "use client";

// import { Input } from "@/components/ui/input";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAction } from "convex/react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { LoadingButton } from "@/components/loading-button";

// const formSchema = z.object({
//   text: z.string().min(1).max(250),
// });

// export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
//   const askQuestion = useAction(api.documents.askQuestion);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { text: "" },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       console.log("Submitting question:", values.text);
//       console.log("Document ID:", documentId);

//       const response = await askQuestion({ question: values.text, documentId });
//       console.log("Response received from askQuestion:", response);

//       form.reset();
//     } catch (error) {
//       console.error("Error in onSubmit:", error);
//       alert("Failed to submit question. Please check your input or try again later.");
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 gap-2">
//         <FormField
//           control={form.control}
//           name="text"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   placeholder="Ask any question about this document"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <LoadingButton
//           isLoading={form.formState.isSubmitting}
//           loadingText="Submitting..."
//         >
//           Submit
//         </LoadingButton>
//       </form>
//     </Form>
//   );
// }



"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/loading-button";

const formSchema = z.object({
  text: z.string().min(1, "Question cannot be empty").max(250, "Question is too long"),
});

export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
  const askQuestion = useAction(api.documents.askQuestion);
  const [error, setError] = useState<string | null>(null); // State to track errors

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null); // Clear any previous errors
    try {
      const response = await askQuestion({ question: values.text, documentId });
      console.log("Response received:", response);
      form.reset(); // Clear form on success
    } catch (error) {
      console.error("Error in onSubmit:", error);

      // Handle specific errors based on the error message
      if (error instanceof Error) {
        setError("Failed to submit question. Please check your input or try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Ask any question about this document"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<LoadingButton
  isLoading={form.formState.isSubmitting}
  loadingText="Submitting..."
>
  <button type="submit">Submit</button>
</LoadingButton>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
    </Form>
  );
}

// "use client";

// import { Input } from "@/components/ui/input";
// import { api } from "@/convex/_generated/api";
// import { Doc, Id } from "@/convex/_generated/dataModel";
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
// // import { useOrganization } from "@clerk/nextjs";

// const formSchema = z.object({
//   search: z.string().min(1).max(250),
// });

// export function SearchForm({
//   setResults,
// }: {
//   setResults: (notes: typeof api.search.searchAction._returnType) => void;
// }) {
//   // const organization = useOrganization();
//   const searchAction = useAction(api.search.searchAction);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       search: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     await searchAction({
//       search: values.search,
//       // orgId: organization.organization?.id,
//     }).then(setResults);
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
//           name="search"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   placeholder="Search over all your notes and documents using vector searching"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <LoadingButton
//           isLoading={form.formState.isSubmitting}
//           loadingText="Searching..."
//         >
//           Search
//         </LoadingButton>
//       </form>
//     </Form>
//   );
// }



"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
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
  search: z.string().min(1).max(250),
});

export function SearchForm({
  setResults,
}: {
  setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
  const searchAction = useAction(api.search.searchAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const results = await searchAction({ search: values.search });
      console.log("Search Results:", results); // Debug log
      setResults(results);
    } catch (error) {
      console.error("Search Error:", error); // Error handling
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Search over all your notes and documents using vector searching"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Searching..."
        >
          Search
        </LoadingButton>
      </form>
    </Form>
  );
}

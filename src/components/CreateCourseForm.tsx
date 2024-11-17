'use client';
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import SubscriptionAction from "./SubscriptionAction";
import * as XLSX from 'xlsx'; // Import the xlsx library

type Props = { isPro: boolean };

type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = ({ isPro }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    // Check if the title is empty
    if (!data.title.trim()) {
      toast({
        title: "Error",
        description: "Enter the Title of the course else the course will not be generated.",
        variant: "destructive",
      });
      return;
    }

    // Check if there are at least two valid units
    const validUnits = data.units.filter((unit) => unit.trim() !== "");
    if (validUnits.length < 2) {
      toast({
        title: "Error",
        description: "Please add at least two units.",
        variant: "destructive",
      });
      return;
    }

    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData: { topic?: string; unit?: string }[] = XLSX.utils.sheet_to_json(sheet);

          // Check if the file has the required columns 'topic' and 'unit'
          if (!jsonData.length || !jsonData[0].hasOwnProperty('topic') || !jsonData[0].hasOwnProperty('unit')) {
            toast({
              title: "Error",
              description: "The uploaded file does not match the required schema. Please ensure the file contains 'topic' and 'unit' columns.",
              variant: "destructive",
            });
            return;
          }

          // Extract the topic
          const topic = jsonData[0].topic || "";
          
          // Validate and extract units
          const units = jsonData
            .map((item) => item.unit)
            .filter((unit): unit is string => typeof unit === 'string' && unit.trim() !== "");

          // Check if at least two valid units are found
          if (units.length < 2) {
            toast({
              title: "Error",
              description: "Please ensure the uploaded file contains at least two valid units.",
              variant: "destructive",
            });
            return;
          }

          // Update the form with validated units
          form.setValue("title", topic);
          form.setValue("units", units);
        } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "An error occurred while processing the file. Please try again.",
            variant: "destructive",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                <FormControl className="flex-[6]">
                  <Input placeholder="Enter the main topic of the course" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  opacity: { duration: 0.2 },
                  height: { duration: 0.2 },
                }}
              >
                <FormField
                  key={index}
                  control={form.control}
                  name={`units.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                      <FormLabel className="flex-[1] text-xl">Unit {index + 1}</FormLabel>
                      <FormControl className="flex-[6]">
                        <Input placeholder="Enter subtopic of the course" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="font-semibold"
                  onClick={() => form.setValue("units", [...form.watch("units"), ""])}
                >
                  Add Unit
                  <Plus className="w-4 h-4 ml-2 text-green-500" />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="font-semibold"
                  onClick={() => form.setValue("units", form.watch("units").slice(0, -1))}
                >
                  Remove Unit
                  <Trash className="w-4 h-4 ml-2 text-red-500" />
                </Button>
              </div>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                Upload Excel
                <Upload className="w-4 h-4 ml-2 text-blue-500" />
              </Button>
              <input
                type="file"
                id="fileInput"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            <Separator className="flex-[1]" />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            Lets Go!
          </Button>
        </form>
      </Form>
      {!isPro && <SubscriptionAction />}
    </div>
  );
};

export default CreateCourseForm;



//This one works fine
// 'use client';
// import React from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
// import { z } from "zod";
// import { createChaptersSchema } from "@/validators/course";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./ui/input";
// import { Separator } from "./ui/separator";
// import { Button } from "./ui/button";
// import { Plus, Trash, Upload } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useToast } from "./ui/use-toast";
// import { useRouter } from "next/navigation";
// import SubscriptionAction from "./SubscriptionAction";
// import * as XLSX from 'xlsx'; // Import the xlsx library

// type Props = { isPro: boolean };

// type Input = z.infer<typeof createChaptersSchema>;

// const CreateCourseForm = ({ isPro }: Props) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { mutate: createChapters, isLoading } = useMutation({
//     mutationFn: async ({ title, units }: Input) => {
//       const response = await axios.post("/api/course/createChapters", {
//         title,
//         units,
//       });
//       return response.data;
//     },
//   });

//   const form = useForm<Input>({
//     resolver: zodResolver(createChaptersSchema),
//     defaultValues: {
//       title: "",
//       units: ["", "", ""],
//     },
//   });

//   function onSubmit(data: Input) {
//     // Check if the title is empty
//     if (!data.title.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter a title for the course.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Check if there are at least two units
//     const validUnits = data.units.filter((unit) => unit.trim() !== "");
//     if (validUnits.length < 2) {
//       toast({
//         title: "Error",
//         description: "Please add at least two units.",
//         variant: "destructive",
//       });
//       return;
//     }

//     createChapters(data, {
//       onSuccess: ({ course_id }) => {
//         toast({
//           title: "Success",
//           description: "Course created successfully",
//         });
//         router.push(`/create/${course_id}`);
//       },
//       onError: (error) => {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           variant: "destructive",
//         });
//       },
//     });
//   }

//   function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const data = new Uint8Array(e.target!.result as ArrayBuffer);
//           const workbook = XLSX.read(data, { type: 'array' });
//           const sheetName = workbook.SheetNames[0];
//           const sheet = workbook.Sheets[sheetName];
//           const jsonData: { topic?: string; unit?: string }[] = XLSX.utils.sheet_to_json(sheet);

//           // Check if the file has the required columns 'topic' and 'unit'
//           if (!jsonData.length || !jsonData[0].hasOwnProperty('topic') || !jsonData[0].hasOwnProperty('unit')) {
//             toast({
//               title: "Error",
//               description: "The uploaded file does not match the required schema. Please ensure the file contains 'topic' and 'unit' columns.",
//               variant: "destructive",
//             });
//             return;
//           }

//           // Extract the topic
//           const topic = jsonData[0].topic || "";
          
//           // Validate and extract units
//           const units = jsonData
//             .map((item) => item.unit)
//             .filter((unit): unit is string => typeof unit === 'string' && unit.trim() !== "");

//           // Check if at least two units are found
//           if (units.length < 2) {
//             toast({
//               title: "Error",
//               description: "Please ensure the uploaded file contains at least two valid units.",
//               variant: "destructive",
//             });
//             return;
//           }

//           // Update the form with validated units
//           form.setValue("title", topic);
//           form.setValue("units", units);
//         } catch (error) {
//           console.error(error);
//           toast({
//             title: "Error",
//             description: "An error occurred while processing the file. Please try again.",
//             variant: "destructive",
//           });
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   }

//   return (
//     <div className="w-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                 <FormLabel className="flex-[1] text-xl">Title</FormLabel>
//                 <FormControl className="flex-[6]">
//                   <Input placeholder="Enter the main topic of the course" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <AnimatePresence>
//             {form.watch("units").map((_, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{
//                   opacity: { duration: 0.2 },
//                   height: { duration: 0.2 },
//                 }}
//               >
//                 <FormField
//                   key={index}
//                   control={form.control}
//                   name={`units.${index}`}
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                       <FormLabel className="flex-[1] text-xl">Unit {index + 1}</FormLabel>
//                       <FormControl className="flex-[6]">
//                         <Input placeholder="Enter subtopic of the course" {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           <div className="flex items-center justify-center mt-4">
//             <Separator className="flex-[1]" />
//             <div className="mx-4 flex flex-col gap-2">
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="font-semibold"
//                   onClick={() => form.setValue("units", [...form.watch("units"), ""])}
//                 >
//                   Add Unit
//                   <Plus className="w-4 h-4 ml-2 text-green-500" />
//                 </Button>

//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="font-semibold"
//                   onClick={() => form.setValue("units", form.watch("units").slice(0, -1))}
//                 >
//                   Remove Unit
//                   <Trash className="w-4 h-4 ml-2 text-red-500" />
//                 </Button>
//               </div>

//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="font-semibold"
//                 onClick={() => document.getElementById('fileInput')?.click()}
//               >
//                 Upload Excel
//                 <Upload className="w-4 h-4 ml-2 text-blue-500" />
//               </Button>
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept=".xlsx, .xls"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//             </div>
//             <Separator className="flex-[1]" />
//           </div>

//           <Button
//             disabled={isLoading}
//             type="submit"
//             className="w-full mt-6"
//             size="lg"
//           >
//             Lets Go!
//           </Button>
//         </form>
//       </Form>
//       {!isPro && <SubscriptionAction />}
//     </div>
//   );
// };

// export default CreateCourseForm;


// 'use client';
// import React from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
// import { z } from "zod";
// import { createChaptersSchema } from "@/validators/course";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./ui/input";
// import { Separator } from "./ui/separator";
// import { Button } from "./ui/button";
// import { Plus, Trash, Upload } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useToast } from "./ui/use-toast";
// import { useRouter } from "next/navigation";
// import SubscriptionAction from "./SubscriptionAction";
// import * as XLSX from 'xlsx'; // Import the xlsx library

// type Props = { isPro: boolean };
// type Input = z.infer<typeof createChaptersSchema>;

// const CreateCourseForm = ({ isPro }: Props) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { mutate: createChapters, isLoading } = useMutation({
//     mutationFn: async ({ title, units }: Input) => {
//       const response = await axios.post("/api/course/createChapters", {
//         title,
//         units,
//       });
//       return response.data;
//     },
//   });

//   const form = useForm<Input>({
//     resolver: zodResolver(createChaptersSchema),
//     defaultValues: {
//       title: "",
//       units: ["", "", ""],
//     },
//   });

//   function onSubmit(data: Input) {
//     // Check if the title is empty
//     if (!data.title.trim()) {
//       toast({
//         title: "Error",
//         description: "Course title cannot be empty",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Check if at least two units are added
//     const validUnits = data.units.filter((unit) => unit.trim() !== "");
//     if (validUnits.length < 2) {
//       toast({
//         title: "Error",
//         description: "At least two units must be added to create the course",
//         variant: "destructive",
//       });
//       return;
//     }

//     createChapters(data, {
//       onSuccess: ({ course_id }) => {
//         toast({
//           title: "Success",
//           description: "Course created successfully",
//         });
//         router.push(`/create/${course_id}`);
//       },
//       onError: (error) => {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           variant: "destructive",
//         });
//       },
//     });
//   }

//   function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const data = new Uint8Array(e.target!.result as ArrayBuffer);
//           const workbook = XLSX.read(data, { type: 'array' });
//           const sheetName = workbook.SheetNames[0];
//           const sheet = workbook.Sheets[sheetName];
//           const jsonData: { topic?: string; unit?: string }[] = XLSX.utils.sheet_to_json(sheet);

//           // Check if the file has the required columns 'topic' and 'unit'
//           if (!jsonData.length || !jsonData[0].hasOwnProperty('topic') || !jsonData[0].hasOwnProperty('unit')) {
//             toast({
//               title: "Error",
//               description: "The uploaded file does not match the required schema. Please ensure the file contains 'topic' and 'unit' columns.",
//               variant: "destructive",
//             });
//             return;
//           }

//           // Extract the topic
//           const topic = jsonData[0].topic || "";
          
//           // Validate and extract units
//           const units = jsonData
//             .map((item) => item.unit)
//             .filter((unit): unit is string => typeof unit === 'string' && unit.trim() !== "");

//           // Check if units are empty
//           if (units.length === 0) {
//             toast({
//               title: "Error",
//               description: "No valid units found in the uploaded file.",
//               variant: "destructive",
//             });
//             return;
//           }

//           // Update the form with validated units
//           form.setValue("title", topic);
//           form.setValue("units", units);
//         } catch (error) {
//           console.error(error);
//           toast({
//             title: "Error",
//             description: "An error occurred while processing the file. Please try again.",
//             variant: "destructive",
//           });
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   }

//   return (
//     <div className="w-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                 <FormLabel className="flex-[1] text-xl">Title</FormLabel>
//                 <FormControl className="flex-[6]">
//                   <Input placeholder="Enter the main topic of the course" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <AnimatePresence>
//             {form.watch("units").map((_, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{
//                   opacity: { duration: 0.2 },
//                   height: { duration: 0.2 },
//                 }}
//               >
//                 <FormField
//                   control={form.control}
//                   name={`units.${index}`}
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                       <FormLabel className="flex-[1] text-xl">Unit {index + 1}</FormLabel>
//                       <FormControl className="flex-[6]">
//                         <Input placeholder="Enter subtopic of the course" {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           <div className="flex items-center justify-center mt-4">
//             <Separator className="flex-[1]" />
//             <div className="mx-4 flex flex-col gap-2">
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="font-semibold"
//                   onClick={() => form.setValue("units", [...form.watch("units"), ""])}
//                 >
//                   Add Unit
//                   <Plus className="w-4 h-4 ml-2 text-green-500" />
//                 </Button>

//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="font-semibold"
//                   onClick={() => form.setValue("units", form.watch("units").slice(0, -1))}
//                 >
//                   Remove Unit
//                   <Trash className="w-4 h-4 ml-2 text-red-500" />
//                 </Button>
//               </div>

//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="font-semibold"
//                 onClick={() => document.getElementById('fileInput')?.click()}
//               >
//                 Upload Excel
//                 <Upload className="w-4 h-4 ml-2 text-blue-500" />
//               </Button>
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept=".xlsx, .xls"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//             </div>
//             <Separator className="flex-[1]" />
//           </div>

//           <Button
//             disabled={isLoading}
//             type="submit"
//             className="w-full mt-6"
//             size="lg"
//           >
//             Lets Go!
//           </Button>
//         </form>
//       </Form>
//       {!isPro && <SubscriptionAction />}
//     </div>
//   );
// };

// export default CreateCourseForm;

//20th oct above is for checks UI better units checks 

// 'use client';
// import React from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
// import { z } from "zod";
// import { createChaptersSchema } from "@/validators/course";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./ui/input";
// import { Separator } from "./ui/separator";
// import { Button } from "./ui/button";
// import { Plus, Trash, Upload } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useToast } from "./ui/use-toast";
// import { useRouter } from "next/navigation";
// import SubscriptionAction from "./SubscriptionAction";
// import * as XLSX from 'xlsx'; // Import the xlsx library

// type Props = { isPro: boolean };

// type Input = z.infer<typeof createChaptersSchema>;

// const CreateCourseForm = ({ isPro }: Props) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { mutate: createChapters, isLoading } = useMutation({
//     mutationFn: async ({ title, units }: Input) => {
//       const response = await axios.post("/api/course/createChapters", {
//         title,
//         units,
//       });
//       return response.data;
//     },
//   });

//   const form = useForm<Input>({
//     resolver: zodResolver(createChaptersSchema),
//     defaultValues: {
//       title: "",
//       units: ["", "", ""],
//     },
//   });

//   function onSubmit(data: Input) {
//     if (data.units.some((unit) => unit === "")) {
//       toast({
//         title: "Error",
//         description: "Please fill all the units",
//         variant: "destructive",
//       });
//       return;
//     }
//     createChapters(data, {
//       onSuccess: ({ course_id }) => {
//         toast({
//           title: "Success",
//           description: "Course created successfully",
//         });
//         router.push(`/create/${course_id}`);
//       },
//       onError: (error) => {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           variant: "destructive",
//         });
//       },
//     });
//   }

//   function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const data = new Uint8Array(e.target!.result as ArrayBuffer);
//           const workbook = XLSX.read(data, { type: 'array' });
//           const sheetName = workbook.SheetNames[0];
//           const sheet = workbook.Sheets[sheetName];
//           const jsonData: { topic?: string; unit?: string }[] = XLSX.utils.sheet_to_json(sheet);

//           // Check if the file has the required columns 'topic' and 'unit'
//           if (!jsonData.length || !jsonData[0].hasOwnProperty('topic') || !jsonData[0].hasOwnProperty('unit')) {
//             toast({
//               title: "Error",
//               description: "The uploaded file does not match the required schema. Please ensure the file contains 'topic' and 'unit' columns.",
//               variant: "destructive",
//             });
//             return;
//           }

//           // Extract the topic
//           const topic = jsonData[0].topic || "";
          
//           // Validate and extract units
//           const units = jsonData
//             .map((item) => item.unit)
//             .filter((unit): unit is string => typeof unit === 'string' && unit.trim() !== "");

//           // Check if units are empty
//           if (units.length === 0) {
//             toast({
//               title: "Error",
//               description: "No valid units found in the uploaded file.",
//               variant: "destructive",
//             });
//             return;
//           }

//           // Update the form with validated units
//           form.setValue("title", topic);
//           form.setValue("units", units);
//         } catch (error) {
//           console.error(error);
//           toast({
//             title: "Error",
//             description: "An error occurred while processing the file. Please try again.",
//             variant: "destructive",
//           });
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   }

//   return (
//     <div className="w-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                 <FormLabel className="flex-[1] text-xl">Title</FormLabel>
//                 <FormControl className="flex-[6]">
//                   <Input placeholder="Enter the main topic of the course" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <AnimatePresence>
//             {form.watch("units").map((_, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{
//                   opacity: { duration: 0.2 },
//                   height: { duration: 0.2 },
//                 }}
//               >
//                 <FormField
//                   key={index}
//                   control={form.control}
//                   name={`units.${index}`}
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                       <FormLabel className="flex-[1] text-xl">Unit {index + 1}</FormLabel>
//                       <FormControl className="flex-[6]">
//                         <Input placeholder="Enter subtopic of the course" {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           <div className="flex items-center justify-center mt-4">
//             <Separator className="flex-[1]" />
//             <div className="mx-4 flex flex-col gap-2">
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="font-semibold"
//                   onClick={() => form.setValue("units", [...form.watch("units"), ""])}
//                 >
//                   Add Unit
//                   <Plus className="w-4 h-4 ml-2 text-green-500" />
//                 </Button>

//                 <Button
//                   type="button"
//                   variant="secondary"
//                   className="font-semibold"
//                   onClick={() => form.setValue("units", form.watch("units").slice(0, -1))}
//                 >
//                   Remove Unit
//                   <Trash className="w-4 h-4 ml-2 text-red-500" />
//                 </Button>
//               </div>

//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="font-semibold"
//                 onClick={() => document.getElementById('fileInput')?.click()}
//               >
//                 Upload Excel
//                 <Upload className="w-4 h-4 ml-2 text-blue-500" />
//               </Button>
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept=".xlsx, .xls"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//             </div>
//             <Separator className="flex-[1]" />
//           </div>

//           <Button
//             disabled={isLoading}
//             type="submit"
//             className="w-full mt-6"
//             size="lg"
//           >
//             Lets Go!
//           </Button>
//         </form>
//       </Form>
//       {!isPro && <SubscriptionAction />}
//     </div>
//   );
// };

// export default CreateCourseForm;

// above one is for excel upload


// "use client";
// import React from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
// import { z } from "zod";
// import { createChaptersSchema } from "@/validators/course";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./ui/input";
// import { Separator } from "./ui/separator";
// import { Button } from "./ui/button";
// import { Plus, Trash } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useToast } from "./ui/use-toast";
// import { useRouter } from "next/navigation";
// import SubscriptionAction from "./SubscriptionAction";

// type Props = { isPro: boolean };

// type Input = z.infer<typeof createChaptersSchema>;

// const CreateCourseForm = ({ isPro }: Props) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { mutate: createChapters, isLoading } = useMutation({
//     mutationFn: async ({ title, units }: Input) => {
//       const response = await axios.post("/api/course/createChapters", {
//         title,
//         units,
//       });
//       return response.data;
//     },
//   });
//   const form = useForm<Input>({
//     resolver: zodResolver(createChaptersSchema),
//     defaultValues: {
//       title: "",
//       units: ["", "", ""],
//     },
//   });

//   function onSubmit(data: Input) {
//     if (data.units.some((unit) => unit === "")) {
//       toast({
//         title: "Error",
//         description: "Please fill all the units",
//         variant: "destructive",
//       });
//       return;
//     }
//     createChapters(data, {
//       onSuccess: ({ course_id }) => {
//         toast({
//           title: "Success",
//           description: "Course created successfully",
//         });
//         router.push(`/create/${course_id}`);
//       },
//       onError: (error) => {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Something went wrong",
//           variant: "destructive",
//         });
//       },
//     });
//   }

//   form.watch();

//   return (
//     <div className="w-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => {
//               return (
//                 <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                   <FormLabel className="flex-[1] text-xl">Title</FormLabel>
//                   <FormControl className="flex-[6]">
//                     <Input
//                       placeholder="Enter the main topic of the course"
//                       {...field}
//                     />
//                   </FormControl>
//                 </FormItem>
//               );
//             }}
//           />

//           <AnimatePresence>
//             {form.watch("units").map((_, index) => {
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{
//                     opacity: { duration: 0.2 },
//                     height: { duration: 0.2 },
//                   }}
//                 >
//                   <FormField
//                     key={index}
//                     control={form.control}
//                     name={`units.${index}`}
//                     render={({ field }) => {
//                       return (
//                         <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
//                           <FormLabel className="flex-[1] text-xl">
//                             Unit {index + 1}
//                           </FormLabel>
//                           <FormControl className="flex-[6]">
//                             <Input
//                               placeholder="Enter subtopic of the course"
//                               {...field}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       );
//                     }}
//                   />
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>

//           <div className="flex items-center justify-center mt-4">
//             <Separator className="flex-[1]" />
//             <div className="mx-4">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="font-semibold"
//                 onClick={() => {
//                   form.setValue("units", [...form.watch("units"), ""]);
//                 }}
//               >
//                 Add Unit
//                 <Plus className="w-4 h-4 ml-2 text-green-500" />
//               </Button>

//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="font-semibold ml-2"
//                 onClick={() => {
//                   form.setValue("units", form.watch("units").slice(0, -1));
//                 }}
//               >
//                 Remove Unit
//                 <Trash className="w-4 h-4 ml-2 text-red-500" />
//               </Button>
//             </div>
//             <Separator className="flex-[1]" />
//           </div>
//           <Button
//             disabled={isLoading}
//             type="submit"
//             className="w-full mt-6"
//             size="lg"
//           >
//             Lets Go!
//           </Button>
//         </form>
//       </Form>
//       {!isPro && <SubscriptionAction />}
//     </div>
//   );
// };

// export default CreateCourseForm;
//Editable 20th oct 
import { cn } from "@/lib/utils";
import type { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
    const { toast } = useToast();
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedName, setEditedName] = React.useState(chapter.name);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });

    const { mutate: editChapter, isLoading: isEditingLoading } = useMutation({
      mutationFn: async (newName: string) => {
        const response = await axios.post("/api/course/createChapters", {
          chapterId: chapter.id,
          newName,
        });
        return response.data;
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Chapter updated successfully",
          // variant: "success",
        });
        setSuccess(true);
        setIsEditing(false); // Exit editing mode after successful update
      },
      onError: (error) => {
        console.error(error);
        setSuccess(false);
        toast({
          title: "Error",
          description: "There was an error updating your chapter",
          variant: "destructive",
        });
      },
    });

    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: (error) => {
            console.error(error);
            setSuccess(false);
            toast({
              title: "Error",
              description: "There was an error loading your chapter",
              variant: "destructive",
            });
            addChapterIdToSet();
          },
        });
      },
    }));

    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editedName.trim() === "") {
        toast({
          title: "Error",
          description: "Chapter name cannot be empty",
          variant: "destructive",
        });
        return;
      }
      editChapter(editedName);
    };

    return (
      <div
        key={chapter.id}
        className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
          "bg-secondary": success === null,
          "bg-red-500": success === false,
          "bg-green-500": success === true,
        })}
      >
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex space-x-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-2"
              required
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white rounded px-2"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h5>{chapter.name}</h5>
            {isLoading && <Loader2 className="animate-spin" />}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white rounded px-2 ml-2"
            >
              Edit
            </button>
          </>
        )}
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;




// "use client";
// import { cn } from "@/lib/utils";
// // Import the correct exported member from the "@prisma/client" module
// import type { Chapter } from "@prisma/client";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import { useToast } from "./ui/use-toast";
// import { Loader2 } from "lucide-react";

// type Props = {
//   chapter: Chapter;
//   chapterIndex: number;
//   completedChapters: Set<String>;
//   setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
// };

// export type ChapterCardHandler = {
//   triggerLoad: () => void;
// };

// const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
//   ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
//     const { toast } = useToast();
//     const [success, setSuccess] = React.useState<boolean | null>(null);
//     const { mutate: getChapterInfo, isLoading } = useMutation({
//       mutationFn: async () => {
//         const response = await axios.post("/api/chapter/getInfo", {
//           chapterId: chapter.id,
//         });
//         return response.data;
//       },
//     });

//     const addChapterIdToSet = React.useCallback(() => {
//       setCompletedChapters((prev) => {
//         const newSet = new Set(prev);
//         newSet.add(chapter.id);
//         return newSet;
//       });
//     }, [chapter.id, setCompletedChapters]);

//     React.useEffect(() => {
//       if (chapter.videoId) {
//         setSuccess(true);
//         addChapterIdToSet;
//       }
//     }, [chapter, addChapterIdToSet]);

//     React.useImperativeHandle(ref, () => ({
//       async triggerLoad() {
//         if (chapter.videoId) {
//           addChapterIdToSet();
//           return;
//         }
//         getChapterInfo(undefined, {
//           onSuccess: () => {
//             setSuccess(true);
//             addChapterIdToSet();
//           },
//           onError: (error) => {
//             console.error(error);
//             setSuccess(false);
//             toast({
//               title: "Error",
//               description: "There was an error loading your chapter",
//               variant: "destructive",
//             });
//             addChapterIdToSet();
//           },
//         });
//       },
//     }));
//     return (
//       <div
//         key={chapter.id}
//         className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
//           "bg-secondary": success === null,
//           "bg-red-500": success === false,
//           "bg-green-500": success === true,
//         })}
//       >
//         <h5>{chapter.name}</h5>
//         {isLoading && <Loader2 className="animate-spin" />}
//       </div>
//     );
//   }
// );

// ChapterCard.displayName = "ChapterCard";

// export default ChapterCard;

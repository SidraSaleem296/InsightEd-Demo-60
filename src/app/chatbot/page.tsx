// // 'use client';

// // import { useState, useEffect } from 'react';

// // interface Chapter {
// //   id: string;
// //   name: string;
// // }

// // interface Unit {
// //   id: string;
// //   name: string;
// //   chapters: Chapter[];
// // }

// // interface Course {
// //   id: string;
// //   name: string;
// //   image: string;
// //   units: Unit[];
// // }

// // const ChatbotPage = () => {
// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
// //   const [userPrompt, setUserPrompt] = useState<string>('');
// //   const [chatResponse, setChatResponse] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);

// //   // Fetch courses on component mount
// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await fetch('/api/get-courses');
// //         if (response.ok) {
// //           const data: Course[] = await response.json();
// //           setCourses(data);
// //         } else {
// //           console.error('Failed to fetch courses');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching courses:', error);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   const handleSubmit = async () => {
// //     if (!selectedCourseId || !userPrompt.trim()) return;

// //     setLoading(true);
// //     setChatResponse(null); // Clear any previous response before making a new request
// //     try {
// //       const response = await fetch('/api/chatbots', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           courseId: selectedCourseId,
// //           userPrompt,
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setChatResponse(data.answer || 'No response received.');
// //       } else {
// //         const error = await response.json();
// //         setChatResponse(error.error || 'An error occurred.');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //       setChatResponse('Something went wrong.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen items-center justify-center">
// //       <div className="chatbot-content bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
// //         <h1 className="text-xl font-bold text-center mb-4">Course Chatbot</h1>

// //         <div className="form-group mb-4">
// //           <h2 className="text-lg font-semibold mb-2">Select a Course</h2>
// //           <select
// //             className="w-full border border-gray-300 rounded p-2"
// //             onChange={(e) => setSelectedCourseId(e.target.value)}
// //             value={selectedCourseId || ''}
// //           >
// //             <option value="">-- Select a Course --</option>
// //             {courses.map((course) => (
// //               <option key={course.id} value={course.id}>
// //                 {course.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="form-group mb-4">
// //           <h2 className="text-lg font-semibold mb-2">Ask a Question</h2>
// //           <textarea
// //             className="w-full border border-gray-300 rounded p-2"
// //             value={userPrompt}
// //             onChange={(e) => setUserPrompt(e.target.value)}
// //             placeholder="Ask a question related to the course..."
// //           />
// //         </div>

// //         <div className="form-group mb-4">
// //           <button
// //             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //           >
// //             {loading ? 'Loading...' : 'Ask'}
// //           </button>
// //         </div>

// //         {chatResponse && (
// //           <div className="response bg-white p-4 rounded shadow">
// //             <h2 className="text-lg font-bold">Response:</h2>
// //             <p>{chatResponse}</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatbotPage;



// // 'use client';

// // import { useState, useEffect } from 'react';
// // import ReactMarkdown from 'react-markdown'; // Import react-markdown

// // interface Chapter {
// //   id: string;
// //   name: string;
// // }

// // interface Unit {
// //   id: string;
// //   name: string;
// //   chapters: Chapter[];
// // }

// // interface Course {
// //   id: string;
// //   name: string;
// //   image: string;
// //   units: Unit[];
// // }

// // const ChatbotPage = () => {
// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
// //   const [userPrompt, setUserPrompt] = useState<string>('');
// //   const [chatResponse, setChatResponse] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);

// //   // Fetch courses on component mount
// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await fetch('/api/get-courses');
// //         if (response.ok) {
// //           const data: Course[] = await response.json();
// //           setCourses(data);
// //         } else {
// //           console.error('Failed to fetch courses');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching courses:', error);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   const handleSubmit = async () => {
// //     if (!selectedCourseId || !userPrompt.trim()) return;

// //     setLoading(true);
// //     setChatResponse(null); // Clear any previous response before making a new request
// //     try {
// //       const response = await fetch('/api/chatbots', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           courseId: selectedCourseId,
// //           userPrompt,
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setChatResponse(data.answer || 'No response received.');
// //       } else {
// //         const error = await response.json();
// //         setChatResponse(error.error || 'An error occurred.');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //       setChatResponse('Something went wrong.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
// //       <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
// //         <h1 className="text-3xl font-semibold text-center mb-6">Course Chatbot</h1>

// //         <div className="mb-6">
// //           <h2 className="text-2xl font-medium mb-3">Select a Course</h2>
// //           <select
// //             className="w-full p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
// //             onChange={(e) => setSelectedCourseId(e.target.value)}
// //             value={selectedCourseId || ''}
// //           >
// //             <option value="">-- Select a Course --</option>
// //             {courses.map((course) => (
// //               <option key={course.id} value={course.id}>
// //                 {course.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="mb-6">
// //           <h2 className="text-2xl font-medium mb-3">Ask a Question</h2>
// //           <textarea
// //             className="w-full p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
// //             value={userPrompt}
// //             onChange={(e) => setUserPrompt(e.target.value)}
// //             placeholder="Ask a question related to the course..."
// //             rows={6}
// //           />
// //         </div>

// //         <div className="mb-6">
// //           <button
// //             className="w-full py-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-700"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //           >
// //             {loading ? 'Loading...' : 'Ask'}
// //           </button>
// //         </div>

// //         {chatResponse && (
// //           <div className="mt-6 bg-white dark:bg-gray-700 p-6 rounded-md shadow-md">
// //             <h2 className="text-2xl font-semibold mb-4">Response:</h2>
// //             <div className="markdown-output">
// //               <ReactMarkdown>{chatResponse}</ReactMarkdown>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatbotPage;
// // // 

// 'use client';

// import { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown'; // Import react-markdown

// interface Chapter {
//   id: string;
//   name: string;
// }

// interface Unit {
//   id: string;
//   name: string;
//   chapters: Chapter[];
// }

// interface Course {
//   id: string;
//   name: string;
//   image: string;
//   units: Unit[];
// }

// const ChatbotPage = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
//   const [userPrompt, setUserPrompt] = useState<string>('');
//   const [chatResponse, setChatResponse] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch courses on component mount
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch('/api/get-courses');
//         if (response.ok) {
//           const data: Course[] = await response.json();
//           setCourses(data);
//         } else {
//           console.error('Failed to fetch courses');
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleSubmit = async () => {
//     if (!selectedCourseId || !userPrompt.trim()) return;

//     setLoading(true);
//     setChatResponse(null); // Clear any previous response before making a new request
//     try {
//       const response = await fetch('/api/chatbots', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId: selectedCourseId,
//           userPrompt,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setChatResponse(data.answer || 'No response received.');
//       } else {
//         const error = await response.json();
//         setChatResponse(error.error || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setChatResponse('Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//       <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
//         <h1 className="text-3xl font-semibold text-center mb-6">Course Chatbot</h1>

//         <div className="mb-6">
//           <h2 className="text-2xl font-medium mb-3">Select a Course</h2>
//           <select
//             className="w-full p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
//             onChange={(e) => setSelectedCourseId(e.target.value)}
//             value={selectedCourseId || ''}
//           >
//             <option value="">-- Select a Course --</option>
//             {courses.map((course) => (
//               <option key={course.id} value={course.id}>
//                 {course.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-2xl font-medium mb-3">Ask a Question</h2>
//           <textarea
//             className="w-full p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
//             value={userPrompt}
//             onChange={(e) => setUserPrompt(e.target.value)}
//             placeholder="Ask a question related to the course..."
//             rows={6}
//           />
//         </div>

//         <div className="mb-6">
//           <button
//             className="w-full py-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-700"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? 'Loading...' : 'Ask'}
//           </button>
//         </div>

//         {chatResponse && (
//           <div className="mt-6 bg-white dark:bg-gray-700 p-6 rounded-md shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Response:</h2>
//             <div className="markdown-output">
//               <ReactMarkdown>{chatResponse}</ReactMarkdown>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatbotPage;
// // 



'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown

interface Chapter {
  id: string;
  name: string;
}

interface Unit {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface Course {
  id: string;
  name: string;
  image: string;
  units: Unit[];
}

const ChatbotPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/get-courses');
        if (response.ok) {
          const data: Course[] = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCourseId || !userPrompt.trim()) return;

    setLoading(true);
    setChatResponse(null); // Clear any previous response before making a new request
    try {
      const response = await fetch('/api/chatbots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourseId,
          userPrompt,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatResponse(data.answer || 'No response received.');
      } else {
        const error = await response.json();
        setChatResponse(error.error || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setChatResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Course Chatbot</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-3">Select a Course</h2>
          <select
            className="w-full p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            onChange={(e) => setSelectedCourseId(e.target.value)}
            value={selectedCourseId || ''}
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-3">Ask a Question</h2>
          <textarea
            className="w-full p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            rows={4}
            placeholder="Ask a question about the course..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white text-xl font-medium rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit Question'}
          </button>
        </div>

        {chatResponse && (
          <div className="mt-6 bg-white dark:bg-gray-700 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Response:</h2>
            <div className="markdown-output">
              <ReactMarkdown>{chatResponse}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;

// "use client";
// import { useTheme } from "next-themes";
// import { useRouter } from "next/navigation";
// import React from "react";
// import D3WordCloud from "react-d3-cloud";

// type Props = {
//   formattedTopics: { text: string; value: number }[];
// };

// const fontSizeMapper = (word: { value: number }) =>
//   Math.log2(word.value) * 5 + 16;

// const WordCloud = ({ formattedTopics }: Props) => {
//   const theme = useTheme();
//   const router = useRouter();
//   return (
//     <>
//       <D3WordCloud
//         data={formattedTopics}
//         height={550}
//         font="Times"
//         fontSize={fontSizeMapper}
//         rotate={0}
//         padding={10}
//         fill={theme.theme === "dark" ? "white" : "black"}
//         onWordClick={(_e, d) => {
//           router.push("/quiz?topic=" + d.text);
//         }
//       }
//       />
//     </>
//   );
// };

// export default WordCloud;


"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import D3WordCloud from "react-d3-cloud";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

type WordData = {
  text: string;
  // Add any additional properties you expect to receive here
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud: React.FC<Props> = ({ formattedTopics }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleWordClick = (event: React.MouseEvent, data: WordData) => {
    router.push(`/quiz?topic=${data.text}`);
  };

  return (
    <>
      <D3WordCloud
        data={formattedTopics}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "white" : "black"}
        onWordClick={handleWordClick}
      />
    </>
  );
};
export default WordCloud;

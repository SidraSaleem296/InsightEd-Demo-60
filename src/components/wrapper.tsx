import { FC, ReactNode } from "react";

export const Wrapper: FC<{
  title: ReactNode;
  content: ReactNode;
}> = ({ title, content }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2 text-black-500">{title}</div>
      {content}
    </div>
  );
};

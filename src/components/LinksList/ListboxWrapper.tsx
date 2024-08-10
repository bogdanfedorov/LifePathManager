import { FC, ReactNode } from "react";

interface ListboxWrapperProps {
  children: ReactNode;
}

export const ListboxWrapper: FC<ListboxWrapperProps> = ({ children }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

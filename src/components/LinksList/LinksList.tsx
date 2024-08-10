import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { ListboxWrapper } from "./ListboxWrapper";
import { FC } from "react";
import { Link } from "@nextui-org/link";

interface LinksObject {
  [key: string]: {
    title?: string;
    url: string;
  };
}

interface LinksList {
  links: LinksObject;
}

export const LinksList: FC<LinksList> = ({ links }) => {
  const extractDomen = (url: string) => new URL(url).host;

  return (
    <ListboxWrapper>
      <Listbox>
        {Object.entries(links).map(([key, value]) => (
          <ListboxItem key={key}>
            <Link isExternal href={value.url}>
              {value.title ? value.title : extractDomen(value.url)}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};

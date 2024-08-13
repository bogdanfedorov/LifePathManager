"use client";
import { MetaLinks, pmlToMetaLinks } from "@/feature/MetaLinks";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Link } from "@nextui-org/link";
import { FC } from "react";
import { devPml } from "./dev";
import { Button } from "@nextui-org/button";

const LinksList: FC<{ config: MetaLinks }> = ({ config }) => {
  return (
    <Accordion className="border-l border-white">
      <AccordionItem title={config.title} key={config.key}>
        {config.items &&
          config.items.map((item) => (
            <LinksList key={item.key} config={item} />
          ))}
        {config.links && (
          <div className="flex flex-col gap-2">
            {config.links.map((link) => {
              console.log(link);
              return (
                <Button
                  as={Link}
                  href={link.url}
                  key={link.key}
                  isExternal
                  showAnchorIcon
                  color="primary"
                >
                  {link.title}
                </Button>
              );
            })}
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default function LinksPage() {
  const config = pmlToMetaLinks(devPml);

  return <LinksList config={config}></LinksList>;
}

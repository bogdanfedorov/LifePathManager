import { LinksList } from "@/components/LinksList";
import { siteConfig } from "@/config/site";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function LinksPage() {
  return (
    <Accordion>
      <AccordionItem key="about_me" title="About me">
        <LinksList links={siteConfig.links} />
      </AccordionItem>
      <AccordionItem key="code_style" title="Code Style">
        <Accordion>
          <AccordionItem key="code_style_biome" title="Biome">
            <LinksList
              links={{
                getting: {
                  title: "Get started",
                  url: "https://biomejs.dev/guides/getting-started/",
                },
              }}
            />
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem key="typescript" title="Typescript">
        <LinksList
          links={{
            playground: {
              title: "Playground",
              url: "https://www.typescriptlang.org/play/?#code/Q",
            },
            constructorAssigment: {
              title:
                "TypeScript Constructor Assignment: public and private Keywords",
              url: "https://kendaleiv.com/typescript-constructor-assignment-public-and-private-keywords/",
            },
          }}
        />
      </AccordionItem>
      <AccordionItem key="front-end" title="Fron-end">
        <Accordion>
          <AccordionItem key="components_libs" title="Components libs">
            <Accordion>
              <AccordionItem title="NextUI">
                <LinksList
                  links={{
                    mainPage: {
                      title: "Next UI",
                      url: "https://nextui.org/",
                    },
                    docs: {
                      title: "Docs",
                      url: "https://nextui.org/docs/guide/introduction",
                    },
                    input: {
                      title: "Input",
                      url: "https://nextui.org/docs/components/input",
                    },
                  }}
                />
              </AccordionItem>
            </Accordion>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
    </Accordion>
  );
}

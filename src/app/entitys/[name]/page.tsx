import { Accordion, AccordionItem } from "@nextui-org/accordion";

import CreateEntity from "./create/page";
import TableEntity from "./table/page";

export interface EntityPageProps {
  params: {
    name: string;
  };
}

export default function EntityPage(entity: EntityPageProps) {
  return (
    <div className="flex flex-col gap-2">
      <Accordion>
        <AccordionItem key="1" title="Create vacancy">
          <CreateEntity {...entity} />
        </AccordionItem>

        <AccordionItem key="2" aria-label="Find" title="Find">
          todo make filters
        </AccordionItem>
      </Accordion>

      <TableEntity {...entity} />
    </div>
  );
}

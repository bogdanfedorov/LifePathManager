"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import VacancyTable from "./table/page";
import CreateVacancy from "./create/page";

export default function Vacancy() {
  return (
    <div className="flex flex-col gap-2">
      <Accordion>
        <AccordionItem key="1" title="Create vacancy">
          <CreateVacancy />
        </AccordionItem>

        <AccordionItem key="2" aria-label="Find" title="Find">
          todo make filters
        </AccordionItem>
      </Accordion>

      <VacancyTable />
    </div>
  );
}

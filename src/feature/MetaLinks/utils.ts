import { MetaLinks, ProtoMetaLinks } from "./types";

export const pmlToMetaLinks = (
  pml: ProtoMetaLinks,
  usedKeys = new Set<string>(),
): MetaLinks => {
  const metaLinks: MetaLinks = {
    key: keyGenerator(pml.title, usedKeys),
    title: pml.title,
  };

  if (pml.links) {
    metaLinks.links = pml.links.map((link) => pmlToMetaLinks(link, usedKeys));
  }

  if (pml.items) {
    metaLinks.items = pml.items.map((item) => pmlToMetaLinks(item, usedKeys));
  }

  if (pml.url) {
    metaLinks.url = pml.url;
  }

  return metaLinks;
};

export const keyGenerator = (title: string, usedKeys: Set<string>): string => {
  const newKey = title.toLowerCase().replace(/ /g, "_");

  let repeatId = 0;
  let uniqueKey = newKey;

  while (usedKeys.has(uniqueKey)) {
    repeatId++;
    uniqueKey = `${newKey}_${repeatId}`;
  }

  return uniqueKey;
};

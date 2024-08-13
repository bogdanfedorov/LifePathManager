export interface ProtoMetaLinks {
  title: string;
  items?: Array<ProtoMetaLinks>;
  links?: Array<ProtoMetaLinks>;
  url?: string;
}

export interface MetaLinks {
  key: string;
  title: string;
  items?: Array<MetaLinks>;
  links?: Array<MetaLinks>;
  url?: string;
}

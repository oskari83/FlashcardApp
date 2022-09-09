export interface ItemEntry {
    qside: string,
    aside: string,
    correct: number,
    key: number
}

export interface CollectionEntry {
    id: number;
    name: string;
    creator: string;
    itemCount: number;
    saved?: boolean;
    items: ItemEntry[];
}

export type NewCollectionEntry = Omit<CollectionEntry, 'id'>;
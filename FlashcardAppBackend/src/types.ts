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

export interface UpdatedCollectionEntry {
    itemCount: number;
    items: ItemEntry[];
}

export interface MongooseCollectionEntry {
    _id?: object | undefined,
    id: string;
    name: string;
    creator: string;
    itemCount: number;
    saved?: boolean;
    items: ItemEntry[];
    __v?: object;
}
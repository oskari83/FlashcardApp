export interface ItemEntry {
    qside: string,
    aside: string,
    correct?: number,
    key?: number
}

export interface CollectionEntry {
    id: number;
    name: string;
    creator: string;
    itemCount?: number;
    items: ItemEntry[];
}

export type NewCollectionEntry2 = Omit<CollectionEntry, 'id'>;

export interface UpdatedCollectionEntry2 {
    name?: string;
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
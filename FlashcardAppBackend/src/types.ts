export interface ItemEntry {
    qside: string,
    aside: string,
    correct?: number,
    key?: number,
	attempts?: number,
	uniqueId?: string,
}

export interface ItemEntryData {
    correct?: number,
    key?: number,
	attempts?: number,
	uniqueId?: string,
}

export interface CollectionEntry {
    id: number;
    name: string;
    creator: string;
    itemCount?: number;
    items: ItemEntry[];
}

export interface DataEntry {
	data: ItemEntryData[],
	id: string
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

export interface UserRaw {
    id: string;
    username: string;
    createdCollections: MongooseCollectionEntry[];
	savedCollections: MongooseCollectionEntry[];
    createdData: MongooseCollectionEntry[];
	savedData: MongooseCollectionEntry[];
}
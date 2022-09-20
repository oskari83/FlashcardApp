export interface CollectionItem {
    qside: string,
    aside: string,
    key: number,
    correct: number,
	attempts: number,
	uniqueId?: string
}

export interface DataEntry {
	key: number,
    correct: number,
	attempts: number,
	uniqueId?: string
}

export interface CollectionData {
    id: string,
    name: string,
    creator: string,
	saved?: boolean,
    itemCount: number,
    items: Array<CollectionItem>
}

export interface PossiblyEmptyCollectionData {
    id?: string,
    name?: string,
    creator?: string,
	saved?: boolean,
    itemCount?: number,
    items?: Array<CollectionItem>
}

export interface PossiblyEmptyData {
    id?: string,
    data?: DataEntry[]
}

export interface NewCollectionData {
    name: string,
    creator: string,
    itemCount: number,
    items: Array<CollectionItem>
}

export interface UpdateCollectionData {
    name?: string,
    items?: Array<CollectionItem>
}

export interface SingleItem {
    aside: string,
    qside: string, 
    key: number,
}
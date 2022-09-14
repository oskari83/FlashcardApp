export interface CollectionItem {
    qside: string,
    aside: string,
    key?: number,
    correct?: number,
}

export interface CollectionData {
    id: string,
    name: string,
    creator: string,
	saved?: boolean,
    itemCount: number,
    items: Array<CollectionItem>
}

export interface NewCollectionData {
    name: string,
    creator: string,
    itemCount: number,
    items: Array<CollectionItem>
}
export interface CollectionItem {
    qside: string,
    aside: string,
    key?: number,
    correct?: number,
}

export interface CollectionData {
    id: number,
    name: string,
    creator: string,
    itemCount: number,
    saved?: boolean,
    items: Array<CollectionItem>
}
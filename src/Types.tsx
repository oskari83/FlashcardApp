export interface CollectionItem {
    qside: string,
    aside: string,
    correct: number,
}

export interface CollectionData {
    id: number,
    name: string,
    creator: string,
    itemCount: number,
    items: Array<CollectionItem>
}
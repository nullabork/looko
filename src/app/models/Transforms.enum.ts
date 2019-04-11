export enum TransformActions
{
    None,
    DeleteAll,
    DeleteSpecificResults,
    DeleteByQueryText,

    CopyAllTo,
    CopySpecificTo,
    CopyByQueryText,

    MoveAllTo,
    MoveSpecificTo,
    MoveByQueryText,

    TagAll,
    TagSpecificResults,
    TagByQueryText,

    UntagAll,
    UntagSpecificResults,
    UntagByQueryText
}

export enum QueryActions
{
    None = "None",
    DeleteByQueryText = "DeleteByQueryText",
    CopyByQueryText = "CopyByQueryText",
    MoveByQueryText = "MoveByQueryText",
    TagByQueryText = "TagByQueryText",
    UntagByQueryText = "UntagByQueryText"
}
export enum EType {
    link= "link",
    collapsable="collapsable"
}

export const MenuItems = [
    {
        type: EType.link,
        name: "main",
        href: "/",
    },
    {
        type: EType.link,
        name: "pictures",
        href: "/pictures",
    },
    {
        type: EType.link,
        name: "list",
        href: "/list",
    },
];
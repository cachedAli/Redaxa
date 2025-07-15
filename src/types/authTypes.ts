export type FormField = {
    name: string;
    label: string;
    type: "text" | "password";
    placeholder?: string;
    colSpan?: 1 | 2;
    smColSpan?: boolean
}
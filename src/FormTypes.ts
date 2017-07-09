export type FormModel = NoErrors | WithErrors | Submitting;

export type NoErrors = {
    kind: 'NoErrors',
    fields: Field[]
};
export type WithErrors = {
    kind: 'WithErrors',
    fields: Field[],
    errorSummary?: string[]
};
export type Submitting = {
    kind: 'Submitting',
    fields: Field[],
    errorSummary?: string[]
};


export type Field = TextField | ParagraphField | CheckboxField;
export type TextField = {
    kind: 'Text',
    label: string,
    value: string,
    error?: null
};
export type ParagraphField = {
    kind: 'Paragraph',
    label: string,
    value: string,
    error?: null
};
export type CheckboxField = {
    kind: 'Checkbox',
    label: string,
    options: CheckboxOption[],
    error?: null
};

export type CheckboxOption = {
    label: string,
    isChecked: boolean
};
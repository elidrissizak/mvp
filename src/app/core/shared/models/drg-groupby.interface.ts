/**
 * A DrgGroupBy is represented in the Bim Assistant through the GroupbyBar.  
 * They are hard coded in bim-assistant.constant.ts
 */
export interface DrgGroupby {
    name: string;
    label: string;
    api: string;
    selectionPropName: string;
    icon: string;
    sectionName?: string;
}

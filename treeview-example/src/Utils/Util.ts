import * as vscode from 'vscode';

function isBasicType(obj: any): boolean {
    return ['string', 'number', 'boolean'].includes(typeof obj) || obj === null;
}

export function jsonToTreeElement<T extends vscode.TreeItem>(
    json: any,
    itemClass: new(label: string, level: number, tooltip?: string, children?: T[], contextValue?: string) => T,
    level: number = 0
) : T[] {
    const items: T[] = [];

    if(Array.isArray(json)) {
        json.forEach((element, index) => {
            if(isBasicType(element)) {
                items.push(new itemClass(element.toString(), level, `level_${level}`));
            }
            else {
                items.push(new itemClass(
                    `obj_${index}`,
                    level,
                    `level_${level}`,
                    jsonToTreeElement(element, itemClass, level+1)
                ));
            }
        });
    }
    else if(typeof json === 'object' && json !== null) {
        Object.entries(json).forEach(([key, value]) => {
            if(isBasicType(value)) {
                items.push(new itemClass(`${key.toString()} : ${value?.toString()}`, level, `level_${level}`));
            }
            else {
                items.push(new itemClass(
                    key,
                    level,
                    `level_${level}`,
                    jsonToTreeElement(value, itemClass, level+1)
                ));
            }
        });
    }

    return items;
}
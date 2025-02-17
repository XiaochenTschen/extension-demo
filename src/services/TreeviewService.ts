import { MyTreeViewItem } from "../views/MyTreeview/myTreeviewItem";
export class TreeviewService {
    private isBasicType(value: any): boolean {
        return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
    }

    jsonToTreeitems(json: any, isTopLevel: boolean = true): MyTreeViewItem[] {
        let items: MyTreeViewItem[] = [];
        if(Array.isArray(json)) {
            json.forEach((element, index) => {
                if(this.isBasicType(element)) {
                    items.push(new MyTreeViewItem(element.toString(), index.toString()));
                } else {
                    const contextValue = isTopLevel ? 'parentItem' : undefined;
                    items.push(new MyTreeViewItem(
                        index.toString(), 
                        undefined, 
                        this.jsonToTreeitems(element, false),
                        contextValue
                    ));
                }
            });
        } else if(typeof json === 'object' && json !== null) {
            Object.entries(json).forEach(([key, value]) => {
                if(this.isBasicType(value)) {
                    items.push(new MyTreeViewItem(key.toString(), String(value)));
                } else {
                    items.push(new MyTreeViewItem(
                        key.toString(), 
                        undefined, 
                        this.jsonToTreeitems(value, false)
                    ));
                }
            });
        }
        return items;
    }
}
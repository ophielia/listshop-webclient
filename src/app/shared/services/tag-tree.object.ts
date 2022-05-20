import TagType from "../../model/tag-type";
import {ITag, Tag} from "../../model/tag";


export class TagTree {
    public static BASE_GROUP = "0";
    private _lookupDisplay = new Map<string, ITag>();
    private _lookupRelations = new Map<string, TagTreeNode>();

    constructor(tags: ITag[]) {

        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            // put display in _lookupDisplay (just tag info)
            this._lookupDisplay.set(tag.tag_id, tag);
            // fill in relations (nodes) in _lookupRelations
            const existingRelation = this._lookupRelations.get(tag.tag_id);
            if (existingRelation) {
                existingRelation.tag_type = tag.tag_type;
                existingRelation.tag_id = tag.tag_id;
                existingRelation.is_group = tag.is_group;
            } else {
                const node = new TagTreeNode(tag.tag_id, tag.tag_type, tag.is_group);
                this._lookupRelations.set(tag.tag_id, node);
            }
            // add to parent
            this.addTagToParentNode(tag);
        }

        // fill in base tag display
        let baseDisplay = this._lookupDisplay.get(TagTree.BASE_GROUP);
        if (!baseDisplay) {
            baseDisplay = new Tag();
        }
        baseDisplay.name = "All";
    }

    private addTagToParentNode(tag: ITag) {
        let parentId = tag.parent_id ? tag.parent_id : TagTree.BASE_GROUP;
        // pull parent node
        let parent = this._lookupRelations.get(parentId);

        if (!parent) {
            // doesn't exist - make node with dummy values
            parent = new TagTreeNode("", "", false);
        }
        // add child tag
        parent.children.push(tag.tag_id);
        // set node in dictionary
        this._lookupRelations.set(parentId, parent);

    }


    navigationList(tagId: string): ITag[] {
        // navigation list
        const returnList: ITag[] = [];

        const navDisplay = this._lookupDisplay.get(tagId);
        if (!navDisplay) {
            return returnList;
        }

        if (tagId == TagTree.BASE_GROUP) {
            returnList.push(navDisplay);
            return returnList;
        }

        let parentId = navDisplay.tag_id ? navDisplay.parent_id : "0";
        let safety = 0;
        do {
            // get the node of parent id
            let parentDisplay = this._lookupDisplay.get(parentId);
            if (parentDisplay) {
                returnList.unshift(parentDisplay);// add the display at the beginning of the array

                // set the parent id
                parentId = parentDisplay.tag_id ? parentDisplay.parent_id : TagTree.BASE_GROUP;

            }
            safety++;

        }
        while (safety < 50 && parentId != "0");

        // add all display at the beginning
        const allDisplay = new Tag();
        allDisplay.tag_id = TagTree.BASE_GROUP;
        allDisplay.name = "All";
        returnList.unshift(allDisplay);

        returnList.push(navDisplay);
        return returnList;
    }


    contentList(id: string, contentType: ContentType, isAbbreviated: boolean, groupType: GroupType, tagTypes: TagType[]): ITag[] {
        let requestedNode = this._lookupRelations.get(id);
        if (!requestedNode) {
            return [];
        }

        if (id == TagTree.BASE_GROUP && ContentType.All == contentType) {
            return this.contentListSkipRelations(groupType, tagTypes);
        } else if (id == TagTree.BASE_GROUP && ContentType.Direct == contentType) {
            return this.baseContentList( contentType, groupType, tagTypes);

        }

        // gather all tags belonging to id
        let allChildrenTags;
        if (contentType == ContentType.All) {
            allChildrenTags = this.allTags(requestedNode, groupType);
        } else {
            allChildrenTags = this.directTags(requestedNode, groupType);
        }

        return this.nodesToDisplays(allChildrenTags, groupType);
    }

    private allTags(node: TagTreeNode, groupType: GroupType): TagTreeNode[] {
        let allOfThem: TagTreeNode[] = [];
        for (let i = 0; i < node.children.length; i++) {
            const childNodeId = node.children[i];
            const childNode = this._lookupRelations.get(childNodeId);

            if (childNode.isGroup()) {
                allOfThem = allOfThem.concat(this.allTags(childNode, groupType));
                if (groupType != GroupType.ExcludeGroups) {
                    allOfThem.push(childNode);
                }
            } else if (groupType != GroupType.GroupsOnly) {
                allOfThem.push(childNode);
            }

        }
        return allOfThem;
    }

    private directTags(node: TagTreeNode, groupType: GroupType): TagTreeNode[] {
        const allOfThem: TagTreeNode[] = [];
        for (let i = 0; i < node.children.length; i++) {
            const childNodeId = node.children[i];
            const childNode = this._lookupRelations.get(childNodeId);

            if (childNode.isGroup() && groupType != GroupType.ExcludeGroups) {
                allOfThem.push(childNode);
            } else if (groupType != GroupType.GroupsOnly) {
                allOfThem.push(childNode);
            }

        }
        return allOfThem;
    }

    private baseContentList( contentType: ContentType, groupType: GroupType, tagTypes: TagType[]): ITag[] {
        const baseNode = this._lookupRelations.get(TagTree.BASE_GROUP);
        if (!baseNode) {
            return [];
        }


        let filteredChildren: TagTreeNode[] = [];
        for (let i = 0; i < baseNode.children.length; i++) {
            const childId = baseNode.children[i];
            const childNode = this._lookupRelations.get(childId);
            if (!childNode) {
                continue;
            }
            const childNodeMatch = tagTypes.indexOf(childNode.tag_type) >= 0;

            if (!childNodeMatch) {
                continue;
            }

            if (childNode.isGroup() && contentType == ContentType.All) {
                    filteredChildren = filteredChildren.concat(this.allTags(childNode, groupType));
                } else {
                    filteredChildren.push(childNode);
                }


    }

        return this.nodesToDisplays(filteredChildren, groupType);
    }

    private nodesToDisplays(nodes: TagTreeNode[], groupType: GroupType) {
        // put into set
        const allTagSet = new Set<TagTreeNode>();
        nodes.forEach(tagNode => {
                allTagSet.add(tagNode);
            });

        // separate into childTags and childGroups (displays)
        const childTags: ITag[] = [];
        const childGroups: ITag[] = [];
        allTagSet.forEach((node: TagTreeNode) => {
            const nodeId = node.tag_id;
            const display = this._lookupDisplay.get(nodeId);
            if (display) {

                if (node.isGroup() && groupType != GroupType.ExcludeGroups) {
                    display.is_group = true;
                    childGroups.push(display);
                } else if (!node.isGroup() && groupType != GroupType.GroupsOnly) {
                    childTags.push(display);
                }
            }
        });

        // append both arrays together
        childTags.sort((a, b) => {
            return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
        });
        childGroups.sort((a, b) => {
            return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
        });

        return childGroups.concat(childTags);

    }

    private contentListSkipRelations(groupType: GroupType, tagTypes: TagType[]) {
            let tagsToReturn: ITag[] = [];
            this._lookupDisplay.forEach(entry => {
                if (tagTypes.indexOf(entry.tag_type) >= 0) {
                    const isGroup = entry.is_group;
                    const isRatingsGroup = isGroup && entry.tag_type == 'Rating';
                    if (groupType == GroupType.All && !isRatingsGroup) {
                        tagsToReturn.push(entry);
                    } else if (groupType == GroupType.GroupsOnly && !isRatingsGroup) {
                        tagsToReturn.push(entry);
                    } else if (groupType == GroupType.ExcludeGroups && !isGroup) {
                        tagsToReturn.push(entry);
                    }
                }
            })
            return tagsToReturn;
        }

    retrieveTag(tagId: string) {
        return this._lookupDisplay.get(tagId);
    }
}

export class TagTreeNode {
    tag_id: string;
    tag_type: TagType;
    is_group: boolean;
    children: string[] = [];

    constructor(tag_id: string,
                tag_type: string,
                is_group: boolean) {
        this.tag_id = tag_id;
        this.tag_type = tag_type;
        this.is_group = is_group;
    }

    isGroup(): boolean {
        return this.is_group;
    }
}

export enum ContentType {
    All,
    Direct
}

export enum GroupType {
    GroupsOnly = 1,
    ExcludeGroups = 2,
    All = 3
}

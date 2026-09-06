import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {NGXLogger} from "ngx-logger";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import TagType from "../../model/tag-type";
import {ITag, ITagList} from "../../model/tag";
import MappingUtils from "../../model/mapping-utils";
import {EnvironmentLoaderService} from "./environment-loader.service";
import ListShopUtils from "../utils/ListShopUtils";

@Injectable()
export class TagService {

    private tagUrl;

    constructor(
        private httpClient: HttpClient,
        private envLoader: EnvironmentLoaderService,
        private logger: NGXLogger
    ) {
        this.tagUrl = envLoader.getEnvConfig().apiUrl + "v2/tag";
    }

    getTagsForTagTree(): Observable<ITagList> {
        this.logger.debug("Retrieving all tags");
        var url = `${this.tagUrl}`;

        return this.httpClient
            .get<ITagList>(url);

    }

    addTagToParent(newTagName: string, parentId: string, tagType: TagType): Observable<HttpResponse<Object>> {
        var newTag: ITag = <ITag>({
            name: ListShopUtils.cleanInputForServer(newTagName),
            tag_type: tagType
        });
        let url = `${this.tagUrl}/${parentId}/child`;
        return this
            .httpClient
            .post(url,
                JSON.stringify(newTag), {observe: 'response'});

    }

}



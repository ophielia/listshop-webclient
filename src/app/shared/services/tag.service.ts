import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {NGXLogger} from "ngx-logger";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import TagType from "../../model/tag-type";
import {ILegacyTag} from "../../model/tag";
import MappingUtils from "../../model/mapping-utils";
import {EnvironmentLoaderService} from "./environment-loader.service";
import ListShopUtils from "../utils/ListShopUtils";

@Injectable()
export class TagService {

    private legacyTagUrl;
    private tagagUrl;

    constructor(
        private httpClient: HttpClient,
        private envLoader: EnvironmentLoaderService,
        private logger: NGXLogger
    ) {
        this.legacyTagUrl = envLoader.getEnvConfig().apiUrl + "tag";
        this.tagagUrl = envLoader.getEnvConfig().apiUrl + "v2/tag";
    }

    getTagsForTagTree(): Promise<ILegacyTag[]> {
        this.logger.debug("Retrieving all tags");
        var url = `${this.legacyTagUrl}/user`;


        return this.httpClient
            .get(url)
            .pipe(map((response: HttpResponse<any>) => {
                    return TagService.mapTagsClient(response);
                }),
                catchError(TagService.handleError))
            .toPromise();

    }

    addTagToParent(newTagName: string, parentId: string, tagType: TagType): Observable<HttpResponse<Object>> {
        var newTag: ILegacyTag = <ILegacyTag>({
            name: ListShopUtils.cleanInputForServer(newTagName),
            tag_type: tagType
        });
        let url = `${this.legacyTagUrl}/${parentId}/child`;
        return this
            .httpClient
            .post(url,
                JSON.stringify(newTag), {observe: 'response'});

    }

    static mapTagsClient(object: Object): ILegacyTag[] {
        let embeddedObj = object["_embedded"];
        return embeddedObj["tagResourceList"].map(MappingUtils.toTag);
    }

    static handleError(error: any) {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return throwError(error);
    }

}



import {User} from "./user";


export default class MappingUtils {

    static showConsoleLogs: boolean = false;


    static toUser(r: any): User {
        let user = <User>({
            email: r.email,
            creation_date: r.creation_date,
            user_name: r.user_name,
            roles: r.roles,
            token: r.token

        });
        return user;
    }




}
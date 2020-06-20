import {User} from "./user";


export default class MappingUtils {

    static showConsoleLogs: boolean = false;


    static toUser(r: any): User {
        let user = <User>({
            email: r.user.email,
            creation_date: r.user.creation_date,
            user_name: r.user.user_name,
            roles: r.user.roles,
            token: r.user.token

        });
        return user;
    }




}
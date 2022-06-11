import {UserDeviceInfo} from "./user-device-info";
import {UserProperty} from "./userproperty";

export interface IUserPropertiesPost {
  user_properties: UserProperty[];

}

export class UserPropertiesPost implements IUserPropertiesPost {
  constructor() {
  }

  user_properties: UserProperty[];
}


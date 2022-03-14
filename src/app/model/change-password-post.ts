import {UserDeviceInfo} from "./user-device-info";
import {User} from "./user";

export interface IChangePasswordPost  {
  new_password: string;
  original_password: string;

}

export class ChangePasswordPost implements IChangePasswordPost {
  new_password: string;
  original_password: string;

  constructor() {
  }
}



import { UserFormData } from "@interfaces";
export const USER_0_DATA: UserFormData = {
firstname: "standard_user",
lastname: "secret_sauce",
zipcode: "22222"
};

export const USERS_LIST: UserFormData[] = [
  USER_0_DATA,
  {
    firstname: "firstname_1",
    lastname: "lastname_1",
    zipcode: "00000"
  },
  {
    firstname: "firstname_2",
    lastname: "lastname_2",
    zipcode: "11111"
  },
]

interface UserModel {
  id: number;
  email: string;
  isActivatet: boolean;
}

export class UserDto {
  id;
  email;
  isActivatet;

  constructor(model: UserModel) {
    this.id = model.id;
    this.email = model.email;
    this.isActivatet = model.isActivatet;
  }
}

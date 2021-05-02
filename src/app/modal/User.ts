export class User {
  id?: any;
  uid: string;
  name: string;
  numberofreviews: number;
  favorites: string[]; //array of dormids

  constructor(uid : string, name : string) {
    this.uid = uid;
    this.name = name;
  }
}

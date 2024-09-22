export class User {
    constructor(
      private email:string,
      private idToken:string,
      private localId:string,
      private expirationDate:Date
    ) {}

    get eDate(){
      return this.expirationDate;
    }

    get userToken(){
      return this.idToken;
    }
}

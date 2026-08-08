export interface Patient{
id:string,
species:string,
breed:string,
age:number,
PetName:string
owner:Owner
}

export interface Owner{
     name:string
 }


///{":[{"id":4,"species":"feline","breed":"DSH tabbyco","age":10,"ownerId":1,"createdAt":"2026-06-18T01:53:24.157Z","updatedAt":"2026-06-18T01:53:24.157Z","PetName":"luma"}]}

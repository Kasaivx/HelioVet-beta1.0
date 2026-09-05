export interface Patient{
id:number,
species:string,
breed:string,
age:number,
PetName:string
owner:Owner
}

export type Owner ={

isGuest: boolean;
  nid?: string;

  name?: string;
  phone?: string;
  address?: string;
};
    
 

export interface Crtpatient {
  petName: string;
  species: string;
  breed: string;
  age: number;
  owner: Owner;
}
export interface Edtpatient {
  species?: string;
  address?:string;
  breed?: string;
  age?: number;
  petName?: string;
  owner?: Owner;
}

export interface EdtPatientVars{
    id:number
    data:Edtpatient
}


export type Prorps = {
  patient?: Patient | null;
};

///{":[{"id":4,"species":"feline","breed":"DSH tabbyco","age":10,"ownerId":1,"createdAt":"2026-06-18T01:53:24.157Z","updatedAt":"2026-06-18T01:53:24.157Z","PetName":"luma"}]}

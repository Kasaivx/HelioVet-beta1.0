export interface Stock{
id:number,
name:string,
qr:string,
quantity:string,
expiryDate:string,
stockStatus:Status
}

export type Status = 

|"OUT_OF_STOCK"
|"CRITICAL_STOCK"
|'LOW_STOCK'
|'IN_STOCK'

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CardService  {

  constructor(private http: HttpClient) {}


  // getUsers():Observable<User[]> {
  //  return this.http.get<User[]>("http://localhost:3000")
  // }

  register(data: User):Observable<unknown> {
    return this.http.post<unknown>("http://localhost:3000/users",data)
  }

  login(user: User) {
    return this.http.post<unknown>("http://localhost:3000/login", {
      name: user.name,
      password:user.password
    })
  }

  addProduct(prod: any):Observable<any[]> {
   return this.http.post<any[]>("http://localhost:3000/products", prod)
  }

  getProducts():Observable<Product[]> {
   return this.http.get<Product[]>("http://localhost:3000/products")
  }

deleteProduct(id: number) {
 return this.http.delete(`http://localhost:3000/products/${id}`)
}

updateProduct(id: number, updateData: any) {
  return this.http.put(`http://localhost:3000/products/${id}`, updateData)
}


// كده  عايز اشغل زر التعديل لل put method-----------------------------------------


  // TODO: link register api
  // Handel error if exists
  // If success redirect to login page
  // TODO: login after register
  // Handel error if exists
  // If success redirect to /prod page


}

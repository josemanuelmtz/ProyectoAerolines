import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/agrega-empresa'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  empresa: Empresa | undefined

  private url = 'http://localhost:3003/empresa/'

  constructor(private http: HttpClient) { }

  public getIdEmp(id:any): Observable <number>{
    return this.http.get<number>(`${this.url}idu/${id}`)
  }
  
  public getEmpresa(id:any): Observable <any>{
    return this.http.get<any>(`${this.url}${id}`)  
  }

  public createEmpresa(empresa: Empresa): Observable <any>{
    return this.http.post(`${this.url}new`,empresa)
  }

  public updateEmpresa(id:any, empresa: Empresa): Observable <any>{
    return this.http.put(`${this.url}update/${id}`, empresa)
  }

  public bajaEmpresa(id:any, estatus:any): Observable <any>{
    return this.http.put(`${this.url}baja/${id}`,estatus)
  }

  public deleteEmpresa(id:any): Observable <any>{
    return this.http.delete(`${this.url}delete/${id}`)
  }
}

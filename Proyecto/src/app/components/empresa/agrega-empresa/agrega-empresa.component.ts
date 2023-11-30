import { Empresa } from './../../../models/agrega-empresa';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaService } from './../../../service/empresa.service';
import { IdUsuarioService  } from './../../../service/id-usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agrega-empresa',
  templateUrl: './agrega-empresa.component.html',
  styleUrls: ['./agrega-empresa.component.css']
})
export class AgregaEmpresaComponent implements OnInit{
  empresa: any[] = [];
  empresaForm: FormGroup; 
  id : number | null;
  id_us: number | null
  constructor(private empresaService : EmpresaService,
    private efb: FormBuilder, 
    private aRoute: ActivatedRoute,
    private router: Router,
    private idUsuarioService: IdUsuarioService
    ) {
      this.empresaForm = this.efb.group({
        nombre: ['', Validators.required],
        correo: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        poli_condi: ['', Validators.required],
        estatus: [1]
      })
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
      this.id_us = 1;
  }

  ngOnInit(): void {
    this.idUsuarioService.obtenerIdUsuario().subscribe((data: any) => {
      if (data.idUsuario) {
        this.id_us = data.idUsuario;
        console.log('ID de usuario disponible:', this.id_us);
        this.updateEmpresa(); // Llama a la función que necesita el id_us
      } else {
        console.log('ID de usuario no disponible');
      }
    });
  }

  getIdEmp(){
    this.empresaService.getIdEmp(this.id_us).subscribe(id_emp =>{
      return id_emp;
    })
  }

  getEmpresa(){
    try{
      this.empresaService.getIdEmp(this.id_us).subscribe(id_emp =>{
        this.id = id_emp;
      
      console.log('el id en getmresa es:',this.id)
      this.empresaService.getEmpresa(this.id).subscribe(empresa => {
        this.empresa = empresa;
        console.log('los valores son',empresa)
      },
      error => {
        console.error('Error al obtener datos de empresa:', error);
      } )
    })
    }catch{
      this.id = 0
    }
    
  }

  createEmpresa() {
    const empresaData = this.empresaForm.value;
    empresaData.id_usuario = this.id_us;
    console.log('create',this.id)
    if(this.id !== null && this.id !== 0){
      const empresaData=this.empresaForm.value
      this.empresaService.updateEmpresa(this.id, empresaData).subscribe( empresa => {
          console.log('Empresa actualizada:');
        },
        (error) => {
          console.error('Error al actualizar la empresa:', error);
        }
      
    );
    }else{
      if (this.empresaForm.valid){
        this.empresaService.createEmpresa(empresaData).subscribe(
          (response) => {
            console.log('Solicitud POST exitosa', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error en la solicitud POST', error);
          }
        );
      }
      
    }
    
  }

  updateEmpresa() {
    this.empresaService.getIdEmp(this.id_us).subscribe(id_emp =>{
      this.id = id_emp;
    if (this.id !== 0 || this.id !== null){
      console.log('id del metodo update',this.id)
      this.empresaService.getEmpresa(this.id).subscribe(data =>{
        console.log(data)
        this.empresaForm.patchValue({
          nombre: data.nombre,
          correo: data.correo,
          direccion: data.direccion,
          telefono: data.telefono,
          poli_condi: data.poli_condi,
          estatus: data.estatus
        })
      })
    }
  })
  }

  /*bajaEmpresa(id: any) {
    const estatus = this.empresaForm.get('estatus')
    if(estatus != null){
      this.empresaService.bajaEmpresa(id, estatus.value).subscribe(
        (response) => {
          console.log('Empresa dada de baja:', response);
        },
        (error) => {
          console.error('Error al dar de baja la empresa:', error);
        }
      );
    }
    
  }*/

  deleteEmpresa(id: any) {
    this.empresaService.deleteEmpresa(id).subscribe(
      (response) => {
        console.log('Empresa eliminada:', response);
      },
      (error) => {
        console.error('Error al eliminar la empresa:', error);
      }
    );
  }

}

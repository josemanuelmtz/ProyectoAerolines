import { VuelosService } from './../../../service/vuelos.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Vuelos } from 'src/app/models/vuelos';
import { CiudadService } from './../../../service/ciudad.service';
import { Ciudad } from 'src/app/models/ciudades';
import { ServicioService } from './../../../service/servicio.service';
import { Servicio } from 'src/app/models/servicios';
import { IdUsuarioService  } from './../../../service/id-usuario.service';
import {EmpresaService } from './../../../service/empresa.service';

@Component({
  selector: 'app-agrega-vuelos',
  templateUrl: './agrega-vuelos.component.html',
  styleUrls: ['./agrega-vuelos.component.css']
})
export class AgregaVuelosComponent implements OnInit {
  vuelos: Vuelos[] = [];
  vuelod: any;
  origenOptions: Ciudad[] = [];
  servicioOptions: Servicio[] = [];
  id : number | null | string; 
  id_us: number | null;
  id_emp: number | null;
  vuelosForm: FormGroup

  constructor(private vueloService: VuelosService,
    private ciudadService: CiudadService,
    private servicioService: ServicioService,
    private empresaService: EmpresaService,
    private vfb: FormBuilder, 
    private aRoute: ActivatedRoute,
    private router: Router,
    private idUsuarioService: IdUsuarioService,) {
      this.vuelosForm = this.vfb.group({
        id_empresa: [null],
        id_servicio: [null, Validators.required],
        origen: ['', Validators.required],
        destino: ['',Validators.required],
        hora_salida: ['',Validators.required],
        asientos_dis: ['',Validators.required],
        fecha_vuelos: ['', [Validators.required, this.fechaValidaValidator()]],
        tipo_avion: ['',Validators.required],
        costo: [null,Validators.required]
      })
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
      /*if (this.aRoute && this.aRoute.snapshot) {
        this.id = +this.aRoute.snapshot.paramMap.get('id');
      }*/

      this.id_us = 1;
      this.id_emp = 0
    }

  ngOnInit(): void {
    this.idUsuarioService.obtenerIdUsuario().subscribe((data: any) => {
      if (data.idUsuario) {
        this.id_us = data.idUsuario;
        console.log('ID de usuario disponible:', this.id_us);
        this.getVuelos()
        this.getCiudades()
        this.getServicios()
        //this.updateVuelo()
      } else {
        console.log('ID de usuario no disponible');
      }
    });

  }

  fechaValidaValidator() {
    return (control: { value: string | number | Date; }) => {
      const fechaIngresada = new Date(control.value);
      const fechaActual = new Date();
  
      if (fechaIngresada < fechaActual) {
        return { fechaInvalida: true };
      }
  
      return null; // La fecha es válida
    };
  }

  getVuelos(){
    this.empresaService.getIdEmp(this.id_us).subscribe(id_emp =>{
      this.id_emp = id_emp
      if(this.id_emp !== 0 && this.id_emp !== null){
        this.vueloService.getVuelos(this.id_emp).subscribe(
          (data) => {
            this.vuelos = data
          },(error) =>{
            console.error('Error al obtener datos del vuelo:', error);
          }
        )
      }
    })
    
  }

  getCiudades(){
    this.ciudadService.getCiudad().subscribe((options: Ciudad[]) => {
      this.origenOptions = options;
    })
  }

  getServicios(){
    this.servicioService.getServicio().subscribe((options: Servicio[])=> {
      this.servicioOptions = options;
    })
  }

  createVuelo() {
    console.log(this.id)
    if(this.id !== 0 && this.id !== null && !Number.isNaN(this.id)){
      const vueloData = this.vuelosForm.value;
      this.empresaService.getIdEmp(this.id_us).subscribe(id_emp =>{
        vueloData.id_empresa = id_emp

        this.vueloService.updateVuelo(this.id, vueloData).subscribe(vuelo=>{
          console.log('Vuelo actualizado:');
          //window.location.reload();
          //this.vuelosForm.reset()
          this.getVuelos()
          this.router.navigate(['/vuelos']);
          
        },
        (error) => {
          console.error('Error al actualizar el Vuelo:', error);
        }
        )
        
      })
       
    }else {
      this.empresaService.getIdEmp(this.id_us).subscribe(id_emp =>{
        this.id = id_emp
        if(this.vuelosForm.valid){
          const nuevoVuelo = this.vuelosForm.value;
          nuevoVuelo.id_empresa = this.id;
          this.vueloService.createVuelo(nuevoVuelo).subscribe(
          (response) => {
            console.log('Solicitud POST exitosa', response);
            console.log(nuevoVuelo)
            console.log(this.vuelosForm)
            window.location.reload();
          },
          (error) => {
            console.error('Error en la solicitud POST', error);
          }
        );
        }
        
      })
    }
    //window.location.reload();
    //this.vuelosForm.reset()
    
  }

  eliminarVuelo(id: any){
    this.vueloService.deleteVuelo(id).subscribe(
      (response) => {
        console.log('Empresa eliminada:', response);
        this.getVuelos()
      },
      (error) => {
        console.error('Error al eliminar la empresa:', error);
      }
    )    
  }
  openForEdit(vuelo: Vuelos){
    this.vuelod = vuelo
    if (this.id !== 0 && this.id !== null && !Number.isNaN(this.id)){
      const fecha = new Date(vuelo.fecha_vuelos);
        const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
        console.log(this.vuelod)
        this.id = Number(vuelo.id_vuelos)
        console.log(this.id)
        this.vuelosForm.setValue({
          id_empresa: this.vuelod.id_empresa,
          id_servicio: this.vuelod.id_servicio,
          origen: this.vuelod.origen,
          destino: this.vuelod.destino,
          hora_salida: this.vuelod.hora_salida,
          asientos_dis: this.vuelod.asientos_dis,
          fecha_vuelos: fechaFormateada,
          tipo_avion: this.vuelod.tipo_avion,
          costo: this.vuelod.costo
        })
    }
    const fecha = new Date(vuelo.fecha_vuelos);
        const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
        console.log(this.vuelod)
        this.vuelosForm.setValue({
          id_empresa: this.vuelod.id_empresa,
          id_servicio: this.vuelod.id_servicio,
          origen: this.vuelod.origen,
          destino: this.vuelod.destino,
          hora_salida: this.vuelod.hora_salida,
          asientos_dis: this.vuelod.asientos_dis,
          fecha_vuelos: fechaFormateada,
          tipo_avion: this.vuelod.tipo_avion,
          costo: this.vuelod.costo
        })
  }
  /*updateVuelo() {
    //this.id = Number(this.id)
    console.log(this.id)
      if (this.id !== 0 && this.id !== null && !Number.isNaN(this.id)){
      console.log('id del metodo update',this.id)
      this.vueloService.getVuelo(this.id).subscribe(vuelo =>{
        console.log(vuelo)
        this.vuelod = vuelo
        const fecha = new Date(vuelo.fecha_vuelos);
        const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
        console.log(this.vuelod)
        this.vuelosForm.setValue({
          id_empresa: this.vuelod.id_empresa,
          id_servicio: this.vuelod.id_servicio,
          origen: this.vuelod.origen,
          destino: this.vuelod.destino,
          hora_salida: this.vuelod.hora_salida,
          asientos_dis: this.vuelod.asientos_dis,
          fecha_vuelos: fechaFormateada,
          tipo_avion: this.vuelod.tipo_avion,
          costo: this.vuelod.costo
        })
        
      })
      
    }
  }*/
  
  recargarPagina() {
    window.location.reload();
  }

}

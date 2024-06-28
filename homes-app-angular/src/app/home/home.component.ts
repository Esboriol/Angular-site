import { Component } from '@angular/core';
import { Imovel } from '../imovel';
import { ImovelService } from '../imovel.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   imoveisDB: Imovel [] = []

   constructor(private imovelService: ImovelService) {
    this.imoveisDB = this.imovelService.bucarTodosImoveis()
   }

    removerAcentos(str: String) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    listarImoveisComFiltro(texto: String) {

    if (texto == ''){

        this.imoveisDB = this.imovelService.bucarTodosImoveis()
    } else {

        const imoveisFiltrados: Imovel[] = []

        for (let i = 0; i < this.imoveisDB.length; i++) {

         const imovel_jason = this.imoveisDB[i];

            const textoM = this.removerAcentos(texto.toUpperCase())
            const estadoImovelM = this.removerAcentos(imovel_jason.estado.toUpperCase())
            const cidadeImovelM = this.removerAcentos(imovel_jason.cidade.toUpperCase())

            if (cidadeImovelM.search(textoM) == 0 || estadoImovelM.search(textoM) == 0) {

                imoveisFiltrados.push(imovel_jason)
            }

            
            }
            this.imoveisDB = imoveisFiltrados
        }
    }

}


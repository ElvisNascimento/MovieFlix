import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgSelectOption } from '@angular/forms';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Filme } from './filme.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selectedGenreId: any;
  
  constructor(
    private service:MovieApiServiceService,
    private el: ElementRef
  ) {}

  searchResult:any;
  
  searchResultByGenre:any;
  
  selectedGenreIds: number[] = [];

  pageNumber = 1;

  ngOnInit(): void {
    this.focusSearch();
  }
  
  searchForm = new FormGroup({
    'movieName':new FormControl(null),
  });

  submitForm() {
    const searchTerm = this.searchForm.get('movieName')?.value;
    localStorage.setItem('lastSearchTerm', searchTerm+'');

    this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
      console.log(result,'seacheform#');
      this.searchResult = result.results;
    })
  }
  
  focusSearch() {
    this.el.nativeElement.querySelector('#inputSearch').focus();
  }

  // buscarFilmesPorGenero(event: Event) {
  //   const idGenero = (event.target as HTMLSelectElement).value;
  //   if (idGenero) {
  //     this.service.getSearchByGenerMovie({ gener: +idGenero, page: this.pageNumber })
  //       .subscribe(data => {
  //         const filmesFiltrados: Filme[] = data.results.filter((filme: Filme) => filme.genre_ids.includes(+idGenero));
  //         this.searchResultByGenre = filmesFiltrados;
  //       });
  //   }
  // }

  buscarFilmesPorGenero() {
    if (this.selectedGenreId) {
      this.buscarFilmesPaginado(this.selectedGenreId, 1, 50);
    }
  }
  
  buscarFilmesPaginado(idGenero: string, pagina: number, resultadosRestantes: number) {
    if (resultadosRestantes <= 0) return;
  
    this.service.getSearchByGenerMovie({ gener: +idGenero, page: pagina })
      .subscribe(data => {
        const filmesFiltrados: Filme[] = data.results.filter((filme: Filme) => filme.genre_ids.includes(+idGenero));
        this.searchResultByGenre.push(...filmesFiltrados);
  
        const resultadosRecebidos = filmesFiltrados.length;
        const resultadosAindaNecessarios = resultadosRestantes - resultadosRecebidos;
  
        if (resultadosAindaNecessarios > 0) {
          this.buscarFilmesPaginado(idGenero, pagina + 1, resultadosAindaNecessarios);
        }
      });
  }
}


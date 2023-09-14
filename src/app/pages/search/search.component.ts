import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    private service: MovieApiServiceService,
    private el: ElementRef
  ) { }

  searchResult: any;

  searchByGenerID: any = [];

  pageNumber = 1; // Inicializa a página como 1 (ou a página inicial desejada)

  totalPages = 1; // Inicializa o total de páginas como 1 (ou o valor correto)

  ngOnInit(): void {
    this.focusSearch();
  }

  searchForm = new FormGroup({
    'movieName': new FormControl(null),
  });

  submitForm() {
    const searchTerm = this.searchForm.get('movieName')?.value;
    localStorage.setItem('lastSearchTerm', searchTerm + '');
  
    this.pageNumber = 1; // Reinicia a página para a primeira página ao realizar uma nova pesquisa
    this.performSearch();
  }

  focusSearch() {
    this.el.nativeElement.querySelector('#inputSearch').focus();
  }

  resultsByIdGenres(id: number) {
    this.selectedGenreId = id;
    this.service.getSearchByGenerMovie(id, this.pageNumber).subscribe((result) => {
      this.searchByGenerID = result.results;
      this.totalPages = result.total_pages;
    });
  }

  previousPage() {
    
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.performSearch();
    }
  }
  
  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.performSearch();
    }
  }
  
  performSearch() {
    const searchTerm = this.searchForm.get('movieName')?.value;
    localStorage.setItem('lastSearchTerm', searchTerm + '');

    if (this.selectedGenreId) {
      this.resultsByIdGenres(this.selectedGenreId);
    } else {
      this.service.getSearchMovie(this.searchForm.value, this.pageNumber).subscribe((result) => {
        console.log(result, 'searchForm#');
        this.searchResult = result.results;
        this.totalPages = result.total_pages;
      });
    }
  }
}


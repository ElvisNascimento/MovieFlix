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
  
    this.pageNumber = 1;
    this.performSearch();
  }

  focusSearch() {
    this.el.nativeElement.querySelector('#inputSearch').focus();
  }

  resultsByIdGenres(id: number) {
    this.service.getSearchByGenerMovie(id).subscribe((result) => {
      this.searchByGenerID = result.results;

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
    this.service.getSearchMovie(this.searchForm.value, this.pageNumber).subscribe((result) => {
      console.log(result, 'searchForm#');
      this.searchResult = result.results;
      this.totalPages = result.total_pages;
      console.log(this.totalPages);
      
    })
  }

  resetPage() {
    this.pageNumber = 1;
    this.performSearch();
  }
}


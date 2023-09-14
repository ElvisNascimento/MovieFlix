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

  searchResultByGenre: any[] = [];

  selectedGenreId: any;

  selectedGenreIds: number[] = [];

  pageNumber = 1;

  ngOnInit(): void {
    this.focusSearch();
  }

  searchForm = new FormGroup({
    'movieName': new FormControl(null),
  });

  submitForm() {
    const searchTerm = this.searchForm.get('movieName')?.value;
    localStorage.setItem('lastSearchTerm', searchTerm + '');

    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      console.log(result, 'seacheform#');
      this.searchResult = result.results;
    })
  }

  focusSearch() {
    this.el.nativeElement.querySelector('#inputSearch').focus();
  }

  resultsByIdGenres() {
    if (this.selectedGenreId) {
      this.service.getSearchByGenerMovie({ gener: +this.selectedGenreId, page: 1 }).subscribe((result) => {
        console.log(result, 'resultByGenerSearch');
        // Faça o que precisar com os resultados aqui
      });
    }
  }
  setSelectedGenre(generId: any){
    this.selectedGenreId = generId;
    this.resultsByIdGenres();
  }

}


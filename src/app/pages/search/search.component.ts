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

  //pagination
  pageNumber = 1;
  totalPages = 1;
  visiblePages: number = 3;
  selectedPage: number = 0;

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
    this.selectedGenreId = id;
    this.service.getSearchByGenerMovie(id, this.pageNumber).subscribe((result) => {
      this.searchByGenerID = result.results;
      this.totalPages = result.total_pages;
    });
  }

  goToPage(page: number, event: Event) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages && page !== this.pageNumber) {
      this.pageNumber = page;
      this.performSearch();
    }
  }

  previousPage(event: Event) {
    event.preventDefault();
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.performSearch();
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
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

  getPages(): number[] {
    const startPage = Math.max(1, this.pageNumber - Math.floor(this.visiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.visiblePages - 1);

    return Array(endPage - startPage + 1).fill(0).map((x, i) => startPage + i);
  }
}


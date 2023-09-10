import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  constructor(
    private service:MovieApiServiceService,
    private el: ElementRef
  ) {}

  searchResult:any;

  ngOnInit(): void {
    this.focusSearch();
  }
  
  searchForm = new FormGroup({
    'movieName':new FormControl(null)
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
}


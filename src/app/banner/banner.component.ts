import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../service/movie-api-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  constructor(private service: MovieApiServiceService) { }
  bannerResult: any = [];
  
  ngOnInit ():void {
    this.bannerData();
  }

  //bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    });
  }

}

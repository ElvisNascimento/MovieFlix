import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service: MovieApiServiceService) { }


  bannerResult: any = [];
  popularResult: any = [];
  popularResult2: any = [];
  nowPlayingResult: any = [];
  topRateResult: any = [];

  ngOnInit(): void {
    this.bannerData();
    this.popularData();
    this.popularData2();
    this.nowPlayingData();
    this.topRateData();
  }

  //bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    });
  }
  //populares
  popularData() {
    this.service.popularApiData().subscribe((result) => {
      console.log(result, 'popularresult#');
      this.popularResult = result.results;
    });
  }
   //populares
   popularData2() {
    this.service.popularApiData2().subscribe((result) => {
      console.log(result, 'popularresult#');
      this.popularResult2 = result.results;
    });
  }
  //now playing
  nowPlayingData() {
    this.service.nowPlayingApiData().subscribe((result) => {
      console.log(result, 'nowplayingresult#');
      this.nowPlayingResult = result.results;
    });
  }
  //now playing
  topRateData() {
    this.service.topRateApiData().subscribe((result) => {
      console.log(result, 'toprateresult#');
      this.topRateResult = result.results;
    });
  }
}

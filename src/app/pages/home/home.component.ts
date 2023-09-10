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
  emBreve: any = [];
  nowPlayingResult: any = [];
  topRateResult: any = [];

  ngOnInit(): void {
    this.popularData();
    this.popularData2();
    this.nowPlayingData();
    this.topRateData();
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
      console.log(result, 'emBreveresult#');
      this.emBreve = result.results;
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

import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service:MovieApiServiceService) {}


  bannerResult: any =[];
  popularResult: any =[];

  ngOnInit(): void {
    this.bannerData();
    this.popularData();
  }

  //bannerdata
  bannerData(){
    this.service.bannerApiData().subscribe((result)=>{
      console.log(result,'bannerresult#');
      this.bannerResult =result.results;
    });
  }
  //populares
  popularData(){
    this.service.popularApiData().subscribe((result)=>{
      console.log(result,'popularresult#');
      this.popularResult = result.results;
    });
  }

}

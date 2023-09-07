import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  constructor(private service: MovieApiServiceService, private router: ActivatedRoute) { }

  getMovieDetalResult: any;

  ngOnInit(): void {

    let getMovieId: any = this.router.snapshot.paramMap.get('id');
    this.getMovie(getMovieId);

  }

  getMovie(id: any) {
    this.service.getMovieDetail(id).subscribe((result) => {
      console.log(result, 'getmovieDetail#');
      this.getMovieDetalResult = result;
    });
  }

}

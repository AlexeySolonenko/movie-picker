import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ImagesGridService } from 'src/app/services/images-grid/images-grid.service';
import { MoviePickerThumbAnnexComponent } from '../movie-picker-thumb-annex/movie-picker-thumb-annex.component';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { paths } from 'src/app/mocks/paths/paths';
import { LiveSearchService } from 'src/app/services/live-search/live-search.service';
import { ImagesGridComponent } from 'src/app/comps/grids/images-grid/images-grid/images-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-picker-home',
  templateUrl: './movie-picker-list.component.html',
  styleUrls: ['./movie-picker-list.component.scss']
})
export class MoviePickerListComponent implements OnInit, AfterViewInit {

  /* Ids of the reusable shared components we are going to plug into our movie picker */
  imagesGridId: string= 'movies-images-grid';
  liveSearchid: string = 'movies-live-search';
  imagesHost: string = 'http://apitest.tab4lioz.beget.tech/movies/';

  /* Component's id when accessing some of the service methods */
  @Input() moviesDataId: string = 'movies-picker-1'

  /* References to instances of reusable shared components rendered with this particular instance of a movie-picker */
  @ViewChild(ImagesGridComponent, { static: false }) imagesGridComp: ImagesGridComponent;

  genres = [];
  selectedGenres: string[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private imagesGridService: ImagesGridService,
    private liveSearchService: LiveSearchService,
    private ngLocation:Location,
    private moviesService: MoviesService,
  ) {
    /* Init a unique per component set of shared data  */
    this.moviesService.initMoviesData(this.moviesDataId);

    let detailsUrl = paths.pages.movies.children.detail.path.linkPath;

    /* Initialize config for a grid service */
    this.imagesGridService.addConfig(this.imagesGridId, {
      annexType: MoviePickerThumbAnnexComponent,
      detailsUrl: detailsUrl,
      imgHostUrl: this.imagesHost,
      queryBuilder: this.moviesService,
      queryBuilderClientId: this.moviesDataId,
    });

    /* Initialize config for live search service */
    this.liveSearchService.addConfig(this.liveSearchid, {
      followUpUrl: detailsUrl,
      queryBuilder: this.moviesService,
      queryBuilderClientId: this.moviesDataId,
      updater: this.moviesService,
    });

   
    
  }

  ngOnInit() {
    let queryParams = this.actRoute.snapshot.queryParams;
    if(queryParams.genre){
      this.moviesService.getMoviesData(this.moviesDataId).genresDispatcher.next([queryParams.genre]);
      this.ngLocation.replaceState(window.location.pathname);
    }
  }

  ngAfterViewInit() {
    /* This event somes from manual clicking on genres while on movies list page */
    this.moviesService.getMoviesData(this.moviesDataId).listReloader.subscribe(_ => this.imagesGridComp.getThumbs());
  }

  search(): void {
    if (this.imagesGridComp) {
      this.imagesGridComp.getThumbs();
    }
  }

}

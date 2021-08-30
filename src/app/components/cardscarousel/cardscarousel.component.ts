import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource,NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';



@Component({
  selector: 'app-cardscarousel',
  templateUrl: './cardscarousel.component.html',
  styleUrls: ['./cardscarousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardscarouselComponent implements OnInit {
  popularMovies:any;
 topRatedMovies: any;
   trendingMovies:any;
   popularShows:any;
  topRatedShows: any;
  trendingShows: any;
  isDesktop = true;
  isMobile = false;


  constructor(private homeService: HomeService, public breakpointObserver: BreakpointObserver,
    private config:NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
config.showNavigationArrows=true;

  }


  ngOnInit(): void {
    this.fetchPopularMovies();
    this.fetchPopularShows();
    this.fetchTopRatedMovies();
    this.fetchTopRatedShows();
    this.fetchTrendingMovies();
    this.fetchTrendingShows();

    this.breakpointObserver
      .observe(['(min-width: 822px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isDesktop = true;
          this.isMobile = false;
        } else {
          this.isMobile = true;
          this.isDesktop = false;
        }
      })
      this.breakpointObserver
      .observe(['(min-width: 638px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
     
document.querySelectorAll('.carousel-control-prev').forEach(item=>{
  item?.classList.add('left-arrow')
})
document.querySelectorAll('.carousel-control-next').forEach(item=>{
  item?.classList.add('right-arrow')
})
        } else {
          document.querySelectorAll('.carousel-control-prev').forEach(item=>{
            item?.classList.remove('left-arrow')
          })
          document.querySelectorAll('.carousel-control-next').forEach(item=>{
            item?.classList.remove('right-arrow')
          })
       
        }
      })

  }

  fetchPopularMovies() {
    this.homeService.getPopularMovies().subscribe((res) => {
      console.log(res,'response')
      this.popularMovies = res;

    });
  }

  fetchTopRatedMovies() {
    this.homeService.getTopRatedMovies().subscribe(res => {
      this.topRatedMovies = res;

    });
  }

  fetchTrendingMovies() {
    this.homeService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = res;

    });
  }

  fetchPopularShows() {
    this.homeService.getPopularShows().subscribe(res => {
      this.popularShows = res;
      console.log(this.popularShows,'show' )

    });

  }

  fetchTopRatedShows() {
    this.homeService.getTopRatedShows().subscribe(res => {
      this.topRatedShows = res;

    });
  }

  fetchTrendingShows() {
    this.homeService.getTrendingShows().subscribe(res => {
      this.trendingShows = res;

    });
  }

}

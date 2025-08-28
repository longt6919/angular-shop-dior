import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  // Danh sách URL ảnh banner
  images: string[] = [
    'https://theme.hstatic.net/200000000133/1001205759/14/slide_1_img.jpg?v=2074',
    'https://theme.hstatic.net/200000000133/1001205759/14/slide_2_img.jpg?v=2074',
    'https://theme.hstatic.net/200000000133/1001205759/14/slide_3_img.jpg?v=2074'
  ];

  // Điều khiển next/prev
  goPrevious(): void {
    this.carousel.prev();
  }

  goNext(): void {
    this.carousel.next();
  }

  ngOnInit(): void {
  }

}

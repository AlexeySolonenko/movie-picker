import { Component, OnInit, Input, Type } from '@angular/core';
import { ImagesGridService } from 'src/app/services/images-grid/images-grid.service';
import { ImgThumbModel } from 'src/app/models/app/comps/img.thumb.model';
import { ThumbAnnex } from '../single-thumb/single-thumb/thumb-annex';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss']
})
export class ImagesGridComponent implements OnInit {

  constructor(private imgGridService: ImagesGridService) {

  }

  @Input() compId: string;
  thumbs: ImgThumbModel[];
  annexComponentType: Type<ThumbAnnex>;
  loadingThumbs: boolean = false;

  ngOnInit() {
    this.getThumbs();
  }

  getThumbs(): void {
    this.loadingThumbs = true;
    let conf = this.imgGridService.getConfig(this.compId);
    this.imgGridService.getThumbs(this.compId).subscribe(thumbs => {
      console.log(thumbs);
      this.annexComponentType = conf.annexType;
      this.thumbs = thumbs;
      this.thumbs.forEach((t, idx) => {
        this.thumbs[idx].detailUrl = conf.detailsUrl + '/' + t.id;
      });
      this.thumbs = this.thumbs.sort((a,b) => {
        return (a.name.localeCompare(b.name));
      });
      this.loadingThumbs = false;
    });
  }
}

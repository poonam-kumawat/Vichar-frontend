import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HeaderBlogComponent } from '../header-blog/header-blog.component';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { CreatorSkeletonComponent } from '../skeleton/creator-skeleton/creator-skeleton.component';

@Component({
  selector: 'app-creators',
  standalone: true,
  imports: [CommonModule, HeaderBlogComponent, CreatorSkeletonComponent],
  templateUrl: './creators.component.html',
  styleUrl: './creators.component.css',
})
export class CreatorsComponent implements OnInit {
  constructor(private sharedService: SharedService, private router: Router) {}
  @Input() isBlogdashboard: any;
  ngOnInit(): void {
    this.getUsersData();
  }
  creators: any;
  noCreatorSkeleton=true;
  getUsersData() {
    this.sharedService.getCreatorsApi().subscribe((data) => {
      if (this.isBlogdashboard) {
        this.creators = data.slice(0, 4);

      } else {
        this.creators = data;
      }
      this.noCreatorSkeleton=false;
    },(error)=>{
       this.noCreatorSkeleton = true;
    }
  );
  }
  onCreatorDetails(id: any) {
    this.router.navigate([`/profile`, id]);
  }
}

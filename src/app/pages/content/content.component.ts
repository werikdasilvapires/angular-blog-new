import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { CommentListComponent } from '../../components/comments/comment-list/comment-list.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink, CommonModule, CommentListComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  photoCover:string = ""
  contentTitle:string = ""
  contentDescription:string = ""
  category:string = ""
  private id:string | null = "0"

  constructor(
    private route:ActivatedRoute,
    private blogService:BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = value.get("id");
      this.setValuesToComponent(this.id);
    });
  }

  setValuesToComponent(id:string | null): void {
    if (id) {
      this.blogService.getPostById(id).subscribe(post => {
        if (post) {
          this.contentTitle = post.title;
          this.contentDescription = post.description;
          this.photoCover = post.photoCover;
          this.category = post.category || 'Uncategorized';
        }
      });
    }
  }
  
  // Getter público para acessar a propriedade privada id
  get postId(): string | null {
    return this.id;
  }
}

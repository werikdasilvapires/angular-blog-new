import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, Comment } from '../../../services/blog.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postId: string = '';
  comments: Comment[] = [];
  
  constructor(private blogService: BlogService) {}
  
  ngOnInit(): void {
    this.loadComments();
  }
  
  loadComments(): void {
    this.blogService.getCommentsByPostId(this.postId)
      .subscribe(comments => {
        this.comments = comments.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });
  }
  
  onCommentAdded(): void {
    this.loadComments();
  }
}

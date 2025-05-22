import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() postId: string = '';
  @Output() commentAdded = new EventEmitter<void>();
  
  author: string = '';
  commentText: string = '';
  
  constructor(private blogService: BlogService) {}
  
  addComment(): void {
    if (this.author.trim() && this.commentText.trim()) {
      this.blogService.addComment({
        postId: this.postId,
        author: this.author.trim(),
        text: this.commentText.trim()
      }).subscribe(() => {
        this.author = '';
        this.commentText = '';
        this.commentAdded.emit();
      });
    }
  }
}

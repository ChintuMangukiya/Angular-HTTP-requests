import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isFetching = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {

    this.isFetching = true;
    // Send Http request
    this.http
      .post<{name: string}>(
        'https://first-app-50ba4-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);

        console.log("is posinth");
        this.fetchPosts();
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {}

  private fetchPosts() {

    this.isFetching = true;

    console.log("Fetching");
    this.http
      .get<{ [key:string]:Post }>('https://first-app-50ba4-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];

          for (const key in responseData) {

            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }
}

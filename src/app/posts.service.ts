import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    return this.http.post<{ name: string }>(
      'https://first-app-50ba4-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();

    searchParams = searchParams.append('print', 'pretty');

    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://first-app-50ba4-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        }
      )
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
      );
  }

  clearPost() {
    return this.http.delete(
      'https://first-app-50ba4-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
    ).pipe(tap((event) => {

      if(event.type === HttpEventType.Sent)
      {
        console.log(event);
      }

      if(event.type === HttpEventType.Response)
      {
        console.log(event.body);
      }
    }));
  }
}
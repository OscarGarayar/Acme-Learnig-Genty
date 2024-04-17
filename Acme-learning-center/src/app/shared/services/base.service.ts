import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, count, Observable, retry} from "rxjs";

export class BaseService <T> {

  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/resources'  ;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'applications/json'
    })
  }

  constructor(private http: HttpClient){}

  handleError(error: HttpErrorResponse): void{
    if(error.error instanceof ErrorEvent) {
      console.log(`An error occureed ${error.error.message}`);
    }else {
      console.log(`Backend returned code ${errir.status}, body wqas ${error}`);
    }
    return throwError(() => new Error (message: 'Smth happened with the request, try again.'));
  }
  private resourcePath():string{
    return `${this.basePath}${this.resourceEndpoint}`;
  }
  create(item : any):Observable<T>{
    return this.http.post<T>(this.resourcePath().JSON.stringify(item), this.httpOptions).pipe(retry(count:2), catchError(this.handleError));
  }
  delete(id:any): Observable<Object> {
    return this.http.delete(url: `${this.resourcePath()}/${id}`, this.httpOptions).pipe(retry(count:2), catchError(this.handleError));;
  }
  update(id:any, item : any){
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions).pipe(retry(count: 2), catchError(this.handleError));
  }
  getAll():Observable<T>{
    return this.http.get
  }
}

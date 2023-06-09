import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");


  constructor() { }

    public getRoleFromeStore(){
      return this.role$.asObservable();
    }

    public setRoleForStore(role:string){
      this.role$.next(role);

    }

    public getFullNameForStore(){
      return this.fullName$.asObservable();
    }

    public setFullNameForStore(fullname:string){
      this.fullName$.next(fullname);
    }
}

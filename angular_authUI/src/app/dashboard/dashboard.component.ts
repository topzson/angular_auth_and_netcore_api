import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public users:any = [];
  public fullName: string = "";
  public role!:string;
  
  constructor(private api: ApiService,private auth:AuthService, private userStore:UserStoreService){}

  ngOnInit(): void {
      this.api.getUsers().subscribe(res=>{
        this.users = res;
      });
      
      this.userStore.getFullNameForStore().subscribe(val=>{
        let getFullNameForStore = this.auth.getfullNameFromToken();
        this.fullName = val || getFullNameForStore;

      });

      this.userStore.getRoleFromeStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout(){
    this.auth.signOut();
  }
}

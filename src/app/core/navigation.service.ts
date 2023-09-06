import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  beforePath: string = ''

  constructor(private router:Router) { }

  navigateToUsers(){
    this.beforePath = this.router.url
    this.router.navigate(['/users'])
  }

  navigateToBeforePath(){
    this.router.navigate([`/${this.beforePath}`])
  }
}

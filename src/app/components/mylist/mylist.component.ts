import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {

  constructor() { }
wishListItems:any=[]
  ngOnInit(): void {
this.getWishList()
  }

  getWishList(){
const wishList=localStorage.getItem('wishList')
if(wishList){
 this.wishListItems=JSON.parse(wishList)
}else{
 this.wishListItems=[];
}
  }

}

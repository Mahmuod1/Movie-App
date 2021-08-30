import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute,ParamMap} from '@angular/router'
import { DetailsService } from './../../services/details.service';
import {Cast, Movie} from '../../shared/movie'
import {DomSanitizer} from '@angular/platform-browser'
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert,NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class DetailsComponent implements OnInit {
mediaType:string|null='';
id:string|null='';
runtime:any;
hours:any;
minuets:any;
videoUrl:Movie={
  type:'',
  site:"",
  name:'',
  key:''
};
removeButton:boolean=false;
basicUrl = 'https://www.youtube.com/embed/';
videoInfo:any;
videoId:any;
wishListItems:any=[]
castInfo:Cast[]=[];
castDetails:any;
castExternal:any;
private _success = new Subject<string>();

successMessage = '';
color=''

@ViewChild('alertMessage', {static: false}) selfClosingAlert: NgbAlert|any;


  constructor(
    private activatedRoute:ActivatedRoute,
    private detailsServices:DetailsService,
private _sanitizer:DomSanitizer,
config: NgbModalConfig,
 private modalService: NgbModal

    ) {
      config.backdrop = 'static';
      config.keyboard = false;
      config.backdrop=true;
     }

  ngOnInit(): void {
   this.getParams()
this.isRemoveButton()
this._success.subscribe(message => this.successMessage = message);
this._success.pipe(debounceTime(5000)).subscribe(() => {
  if (this.selfClosingAlert) {
    this.selfClosingAlert.close();
  }
});

  }

  public changeSuccessMessage(message:any) {
    this._success.next(message);

  }

  open(content:any,id:any) {
    this.modalService.open(content);
    this.getCastDetails(id)
    this.getCastExternal(id)

  }

getCastDetails(id:any){
  this.detailsServices.getCastDetails(id).subscribe(castDetails=>{
    console.log(castDetails,'this is the cast Details')
    this.castDetails=castDetails
        })
}
getCastExternal(id:any){
  this.detailsServices.getCastExternal(id).subscribe(castExternal=>{
    console.log(castExternal,'this is the cast External Details ')
    this.castExternal = castExternal
  })
}
getParams(){
this.activatedRoute.paramMap.subscribe((move:ParamMap)=>{
  this.mediaType=move.get('media_type')
  this.id=move.get('id');
  if(this.mediaType=='movie'){
    console.log(this.mediaType)
    this.getMovie()
  }else{
    this.getTvShow()
  }
})
}

getMovie(){
this.detailsServices.getVideo(this.mediaType,this.id).subscribe(video=>{
if(!video.message){
  this.videoUrl=video;

this.videoId=video.key.split('=')[1]
const embed =this.basicUrl+video.key.split('=')[1]+'?enablejsapi=1&origin=http://localhost:4200/#/'
this.videoUrl.safeUrl=this._sanitizer.bypassSecurityTrustResourceUrl(embed)
this.getMovieInfo()
}
else{
  console.log(video.message)
}
  })
}
getMovieInfo(){
  this.detailsServices.getVideoDetails(this.mediaType,this.id).subscribe(videoInfo=>{

    this.videoInfo=videoInfo
    
  if(videoInfo.runtime){
   this.minuets=videoInfo.runtime %60;
    this.hours=Math.floor(videoInfo.runtime /60);

  }

  })
  this.getCastInfo()
}

getCastInfo(){
  this.detailsServices.getCastInfo(this.mediaType,this.id).subscribe((castInfo:Cast[])=>{
this.castInfo=castInfo
console.log(this.castInfo,'this is cast Info')


  })
}
/* here the wish List functionality


*/

isRemoveButton(){
  this.getWithList();
 const isRemove =this.checkIsInWishList(this.id)
if(isRemove){
  this.removeButton=true
}else{
  this.removeButton=false
}
}
/*
here i remove item by filtering them and return the items that doesn't equal that removed item id
 */
removeItem(){
  this.getWithList()
const newWishList=this.wishListItems.filter((item:any)=>{
  return item.id != this.id
})

localStorage.setItem('wishList',JSON.stringify(newWishList))
this.isRemoveButton()
this.changeSuccessMessage('item removed')
this.color='danger'

}

getTvShow(){
  this.detailsServices.getTvShow(this.id).subscribe(tvShow=>{
 if(!tvShow.message){

   this.videoUrl=tvShow;
   const embed =this.basicUrl+tvShow.key
  this.videoUrl.safeUrl=this._sanitizer.bypassSecurityTrustResourceUrl(embed)
 this.detailsServices.getVideoDetails(this.mediaType,this.id).subscribe(details=>{
   console.log(details,'this is video details')
 })
 }
 else{
   console.log(tvShow.message)
 }
})
}
// getTvShow(){


//   this.detailsServices.getTvShow(this.id).subscribe(tvShow=>

// {

//  if(!tvShow.message){
//    console.log(tvShow.key)
//    this.videoUrl=tvShow;
//    const embed =this.basicUrl+tvShow.key
//   this.videoUrl.safeUrl=this._sanitizer.bypassSecurityTrustResourceUrl(embed)
//  this.detailsServices.getVideoDetails(this.mediaType,this.id).subscribe(details=>{
//    console.log(details)
//  })
//  }
//  else{
//    console.log(tvShow.message)
//  }
// })
// }
/* here i get the wishList from local storage and use it in the other functions */
getWithList(){
  try {
    const wishList=localStorage.getItem('wishList')

    if(wishList) this.wishListItems=JSON.parse(wishList)
  } catch (error) {
    console.log(error)
  }
}
/* here i add the item to wish list

first i get the wish list items
and check if the item is in the with list item to not added it again
if not found in the wish list i make a new wish list and added the new item to it

*/
add(){
  this.getWithList()
const item={
  id:this.id,
  title:this.videoInfo.title,
  backdrop_path:this.videoInfo.backdrop_path,
media_type:this.mediaType
}

  if(this.wishListItems.length){
    const isInWishList=this.checkIsInWishList(this.id)

if(!isInWishList){
  this.wishListItems.push(item)


  localStorage.setItem('wishList',JSON.stringify(this.wishListItems))
  this.isRemoveButton()
}


  }else{
    this.wishListItems.push(item)
    localStorage.setItem('wishList',JSON.stringify(this.wishListItems))
    this.isRemoveButton()
  }
  this.color='success'
  this.changeSuccessMessage('item added successfully')

}
/* here i check is the wish list have a specific item or not  */
checkIsInWishList(id:any):boolean{

  const isInWishList=this.wishListItems.some((item:any)=>{
return item.id == id
  })
  return isInWishList
}


}





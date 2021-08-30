import { SafeResourceUrl } from "@angular/platform-browser";

export interface IMedia{
  id: number,
media_type: string,
name: string,
poster_path: string
}

export interface Movie{
type:string,
site:string,
name:string,
key:string,
safeUrl?:SafeResourceUrl,
message?:string
runtime?:number
}

export interface Results{
  id: number,
  title:string,
 backdrop_path: string,
 media_type:string
}

export interface Cast{
  id: number,
  name: string,
  profile_path:string,
  character: string
}

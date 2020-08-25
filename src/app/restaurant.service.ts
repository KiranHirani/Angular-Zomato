import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  userKey='aaa43873ecb121e60783c1cf24591b60';
  url='https://developers.zomato.com/api/v2.1/';

  getEntityId(query)
  {
    return this.http.get(`${this.url}locations?query=${query}`,{
      headers:{
        ['user-key']:this.userKey
      }
    });
  }

  getRestaurants(entityId)
  {
    return this.http.get(`${this.url}search?entity_id=${entityId}&entity_type=city&collection_id=1`,{
      headers:{
        ['user-key']:this.userKey
      }
    })
  }
}

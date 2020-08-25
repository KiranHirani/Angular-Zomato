import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import {Restaurant} from '../restaurant';

@Component({
  selector: 'restaurant-collection',
  templateUrl: './restaurant-collection.component.html',
  styleUrls: ['./restaurant-collection.component.css']
})
export class RestaurantCollectionComponent implements OnInit {

  constructor(private restaurantService:RestaurantService) { }
  title='Best Restaurants to Dine In ';
  arrayEntityId:any[]=[];
  entity_id;
  city;
  ngOnInit(): void {}
  restaurant:Restaurant=new Restaurant();
  restaurants:Restaurant[]=[];

  getEntityId(cityName)
  {
    console.log(cityName.value);
    this.city=this.title+cityName.value;
    this.restaurantService.getEntityId(cityName.value).subscribe(data=>{
       this.entity_id=data['location_suggestions'][0]['entity_id'];
    });
    setTimeout(()=>
    {
      this.getRestaurant();
    },1000);
    cityName.value=''; 
  }

  getRestaurant()
  {
    this.restaurantService.getRestaurants(this.entity_id).subscribe(data=>{
      console.log(data);
      for(let i=0;i<data['restaurants'].length;i++)
      {
        this.restaurant.name=data['restaurants'][i].restaurant.name;
        this.restaurant.phone=data['restaurants'][i].restaurant.phone_numbers;
        this.restaurant.location=data['restaurants'][i].restaurant.location.address;
        this.restaurant.rating=data['restaurants'][i].restaurant.user_rating.aggregate_rating;
        this.restaurant.image=data['restaurants'][i].restaurant.featured_image;
        this.restaurant.averageCost=data['restaurants'][i].restaurant.average_cost_for_two;
        this.restaurants.push(this.restaurant);
        this.restaurant=new Restaurant();
      }
      console.log(this.restaurants);
    });
   this.restaurants=[];
  }
}

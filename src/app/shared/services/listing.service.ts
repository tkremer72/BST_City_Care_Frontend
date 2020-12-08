import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private listingsApi: string = 'http://uscitycare-env.eba-cjgmkkyx.us-east-2.elasticbeanstalk.com/listings';

  public users: User[];
  public listings: Listing[];

  constructor(
    private http: HttpClient,
  ) { }

  //GET all of  the listings made by an organization for the profile page
  getUserListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.listingsApi}/listings`);
  }
  // DELETE an organizations listing
  deleteListing(listingId: number): Observable<Listing> {
    return this.http.delete<Listing>(`${this.listingsApi}/delete/${listingId}`);
  }
  //GET an organizations listing by the listing id
  getUserListing(listingId: number): Observable<Listing> {
    return this.http.get<Listing>(`${this.listingsApi}/listing/${listingId}`);
  }
  //CREATE an organization listing
  createListing(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(`${this.listingsApi}/create`, listing);
  }
  //UPDATE an organization listing
  updateListing(listingId: number, listing: any): Observable<Listing> {
    return this.http.put<Listing>(`${this.listingsApi}/update/${listingId}`, listing);
  }
  //GET all the organization users and their listings for the site tally page
  getEverythingOrgs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.listingsApi}/findOrgs`);
  }
}

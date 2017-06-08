import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Hero } from './hero.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private http: Http) { }


    /** 
     * Get the whole set of Heroes
     */
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
    }

    /** 
     * Get a single Heroe based on ID
     */
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
                .toPromise()
                .then(response => response.json().data as Hero)
                .catch(this.handleError);
    }

    /** 
     * Updates a Heroe based on ID
     */
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

    /** 
     * Deletes a hero based on ID
     */
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /** 
     * Handles the HTTP errors in this service
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
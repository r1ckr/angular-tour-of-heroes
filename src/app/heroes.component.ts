import { Component, OnInit } from '@angular/core';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  
  heroes: Hero[];
  selectedHero : Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // This is the callback function for when the Promise returns the value
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
}
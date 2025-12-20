# Architecture

## Start Screen

A place to start the screen. Players can pick from different regions to play in.

All the regions are available at: 
https://pokeapi.co/api/v2/region

region.pokedexes[0].url

We can get id's of pokemon from a given region from the region's pokedex.
https://pokeapi.co/api/v2/pokedex/{id}/

Lastly, we get information about the pokemon:
https://pokeapi.co/api/v2/pokemon/{id or name}/

sprites = pokemon.sprites
sprite = sprites.other.dream_world.front_default

## Game Manager

This is responsible for managing the logic for the game. It calls the API for images and passes it to the Game component to update the memory cards.

## Game

This displays the game to the user. It is responsible for managing all the changes across the DOM

## Components

- Card Model
- Timer Component
- Header

## Utility Functions

- API Call
A function to call the poke
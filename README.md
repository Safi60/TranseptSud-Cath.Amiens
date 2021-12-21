<div align="center">
  <a href="https://github.com/Safi60/TranseptSud-Cath.Amiens">
    <img src="images/cathedrale.png" alt="Logo" width="80" height="80">
  </a>
  <h1 align="center">TranseptSud -Cath. Amiens</h1>
  <p align="center">
    Jeu à la 1ère personne sous forme d'énigmes pour faire découvrir une anecdote sur la cathédrale d'Amiens.
  </p>
</div>


## About The Project

[![Projet image 1][product-screenshot1]](https://github.com/Safi60/TranseptSud-Cath.Amiens.com)
[![Projet image 2][product-screenshot2]](https://github.com/Safi60/TranseptSud-Cath.Amiens)

Ce projet à été réalisé lors de mon DUT Informatique dans le module WebGL - ThreeJS en mars 2021.

L' objectif a été de concevoir un mini-jeu « sérieux » pour faire découvrir une anecdote, un objet particulier, un détail de décoration, etc. à un jeune public sur la cathédrale d'Amiens.
Pour cela, nous devions faire déplacer un personnage en vue subjective à l'intérieur d'un environnement clos - une partie de la Cathédrale d'Amiens - et lui faire chercher
des indices lui permettant de résoudre des énigmes et de parvenir au but final. 

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

Les technos utilisées : 

* [Three.js](https://threejs.org/)
* [WebGL](https://www.khronos.org/webgl/)

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

Pour utiliser ce projet, c'est très simple...

1. Clonez le repo
   ```sh
   git clone https://github.com/Safi60/TranseptSud-Cath.Amiens.git
   ```
2. Lancez le projet en utilisant votre serveur (Xampp, Wamp, Laragon, ...)

<p align="right">(<a href="#top">back to top</a>)</p>


## HELP

1. Construction de la scène et des Objets 3D
    * chargement de l'objet, redressement en position verticale.
    * chargement des textures : la texture principale représentant le transept sud.
    * utilisation d'une lumière ambiante.

2. Déplacement du personnage
    * Gestion des touches du clavier : `SHIFT` + flèches directionnelles

## Solution

* Vous vous retrouvez au départ au centre de la cathédrale. 
* Vous devez vous retourner et vous verrez un cube apparaître. 
* Vous irez jusqu’au cube et vous vous apercevez que rien ne se passe. La subtilité est qu’il faut se positionner sur le cube tout en regardant la position initiale où vous étiez au départ. 
* Vous apercevrez alors un message vous demandant : Combien de portails possèdent la cathédrale d’Amiens. Il faudra taper au clavier le chiffre 3.
* Ensuite, on nous demande de compter le nombre de cylindre présent dans la pièce : Il y en a qu'un au plafond, il faut donc taper la touche 1 : la lumière revient à la normale et on découvre l’intérieur de la cathédrale, avec un texte de fin de jeu.


## Contact

Contact - [@saficodeur](https://twitter.com/saficodeur) - safi.hanifa06@gmail.com
Website - [safihanifa.com](https://www.safihanifa.com/)

Project Link: [https://github.com/Safi60/TranseptSud-Cath.Amiens](https://github.com/Safi60/TranseptSud-Cath.Amiens)

<p align="right">(<a href="#top">back to top</a>)</p>


## Authors

* **Safi Hanifa** - *FrontEnd Developer* - [Safi60](https://github.com/Safi60)

<!-- images -->
[product-screenshot1]: images/webgl1.png
[product-screenshot2]: images/webgl2.png

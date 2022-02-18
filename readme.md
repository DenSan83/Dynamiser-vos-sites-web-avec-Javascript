# Jeu Pig Game (Projet JS pour évaluation du cours Studi)

### <ins>Dynamiser vos sites web avec Javascript</ins>

### Couleurs de base :
* Noir de base : #212529 (couleur par défaut)
* Rouge : #EB4D4D
* Blanc foncé : #F7F7F7

### Famille de font demandée :
* Lato

## Description :
Le projet propose de créer un jeu de dés (connu en anglais comme Pig Game) qui base son fonctionnement du côté frontend avec Javascript.
Le site est fait en anglais comme la maquette.

Pour améliorer mes compétences en Développement Orienté Objet, j'ai axé mon code sur deux class: Dice et Game. 
Pour améliorer la scalabilité du code, j'ai séparé les sélecteurs du dom dans un fichier. Cela pourra permettre de réutiliser mon code sur un autre template.

Comme l'interface est responsive, j'ai décidé d'ajouter une demande afin de tourner l'écran en mode paysage pour une bonne lisibilité des éléments.
L'hauteur minimale d'écran pour pouvoir jouer est de 320px. Sinon les éléments se cachent.

De mon point de vue, le jeu aurait perdu de ludicité si le dé avait affiché directement un résultat.
J'ai donc préféré ajouter une animation qui le déroule sur ses 6 faces avant d'afficher le résultat.
Puis, j'ai rajouté 3 pistes de son libres de droits* pour donner vie à mes animations.

Pour finir, pour ceux qui comme moi ne connaissent pas les règles du jeu j'ai ajouté une modale qui explique les règles.

## (*) Remerciement :
L'un des effets de son nécessite de citer la source :
* Effet du dé roulant : [nicovideo.jp](http://commons.nicovideo.jp/material/nc93322)

## Demo du jeu : [Dice game](https://dice.desan.fr)
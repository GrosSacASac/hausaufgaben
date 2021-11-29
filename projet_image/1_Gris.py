# -*- coding: utf-8 -*-

"""
Description:
Ouvre une image ppm couleur (Rouge,Vert,Bleu ou Red,Green,Blue)
Sort une image pgm grise( noir et blanc).
Les commentaires ne sont pas copiés.


Fonctions:
Image.readline()__Cette fonction retourne la ligne de la variable fichier lu en chaine.
Déplace également le curseur de lecture.Si la ligne est vide une chaine vide est retournée

ImageGris.write(string)__Cette fonction écrit la chaine dans la variable fichier en 'w' ou 'a'

Ligne.split(" ")__Sépare la chaine en liste de chainespour chaque espace.( ainsi "255 134 26"-->[255,134,25] )

round(X)__arrondi X
int(X)__transforme X en entier
str(X)__transforme X en chaine

Variables:
NumLigne__entier,indique quel ligne est lue.
ligne 1: nombre magique,
ligne 2: Largeur"espace"Hauteur
ligne 3: Valeur maximale du niveau de couleur
ligne 4-fin: Valeur des couleurs

R__(Red)Valeur du rouge
G__(Green)Valeur du vert
B__(Blue)Valeur du bleu
Gris=int(round(0.299*R+0.587*G+0.114*B))
0.299*R+0.587*G+0.114*B est la formule pour trouver une valeur équivalente en gris.
"""



#Initialisation
NomImage = input("Nom du fichier image ppm en couleurque vous voulez mettre en gris:\n")
Image=open(NomImage,'r')

NomGris="ImageGris.pgm"
ImageGris=open(NomGris,'w')

NumLigne,Compteur=0,-1
NvMagi="P2"
#Fin Initialisation



#Traitement
print ("En cours de traitement ...")
Ligne=Image.readline()
while Ligne != "":#La boucle se términe à la dernière ligne du fichier
    if Ligne[0]=="#":#Les comentaires commencent par "#"
        print ("Commentaire:\n"+Ligne[1:]
               +"Les commentaires ne sont PAS copiés !"
               )
    else:
        NumLigne+=1
        if NumLigne==1:#ligne 1: nombre magique
            print ("Première Ligne: "+Ligne+
                   "remplacée par le nombre magique du gris: "
                   +NvMagi)
            ImageGris.write(NvMagi+"\n")
        elif NumLigne==2:#ligne 2: Largeur"espace"Hauteur
            Largeur=int(Ligne.split(" ")[0])
            Hauteur=int(Ligne.split(" ")[1])
            PixTotal=Largeur*Hauteur
            ImageGris.write(Ligne)
        elif NumLigne==3:#ligne 3: Valeur maximale du niveau de couleur
            ValMax=int(Ligne)
            ImageGris.write(Ligne)
        else:#ligne 4-fin: Valeur des couleurs
            ListLigne=Ligne.split(" ")
            for Objets in ListLigne:
                Compteur+=1
#Ici on utilise le reste de la div. par 3( X %3 ) pour déterminer quel nombre on lit
#Une fois sur trois c'est rouge,vert puis bleu de façcon cyclique.
                if Compteur%3==0:
                    R=int(Objets)
                elif Compteur%3==1:
                    G=int(Objets)
                elif Compteur%3==2:
                    B=int(Objets)
                    Gris=int(round(0.299*R+0.587*G+0.114*B))
                    ImageGris.write(str(Gris)+"\n")

    Ligne=Image.readline()#On lit la ligne suivante
#Fin Traitement



#Sortie(Resumé):
print ("Nombre de lignes lu(commentaires exclus, informations sans importance): "
       +str(NumLigne)+
       "\nLargeur: "+str(Largeur)+
       " et Hauteur: "+str(Hauteur)+
       "\nAu total il y a "+str(PixTotal)+" pixels"
       "\nLe niveau maximum de gris est: "+str(ValMax)+
       "\nLe nouveau fichier se nomme: << "+NomGris+" >>"+
       "\net se trouve dans le même dossier."
       )
#Fin Sortie


#Fermeture des fichiers
Image.close()
ImageGris.close()

# -*- coding: utf-8 -*-

from random import randint
#Ouvre une image ppm couleur (Rouge,Vert,Bleu ou Red,Green,Blue)


NomImage = raw_input("Nom du fichier image avec juste 4 niv de gris:\n")
Image=open(NomImage,'r')

Nom4Couleurs="Image4Couleurs.ppm"
Image4Couleurs=open(Nom4Couleurs,'w')

Orange=[255,127,0]
Autre=[63,127,255]

Noir=[0,0,0]
Blanc=[255,255,255]

Bleu=[0,0,255]
Vert=[0,255,0]
Cyan=[0,255,255]
Rouge=[255,0,0]
Magenta=[255,0,255]
Jaune=[255,255,0]

ListeEntiere=[Orange,Autre,Noir,Blanc,Bleu,Vert,Cyan,Rouge,Magenta,Jaune]
NbCouleurs=len(ListeEntiere)
ListeC=[]

for Couleurs in range(0,4):
    Nombre=randint(0,NbCouleurs)
    CouleurChoisie=ListeEntiere[Nombre]
    ListeC.append(CouleurChoisie)

NumLigne,NumPixel=0,0

Ligne=Image.readline()
print "En cours de traitement ..."
while Ligne != "":
    NumLigne+=1
    if NumLigne==1:
        Image4Couleurs.write("P3"+"\n")
    elif NumLigne==2:
        #print Ligne.split(" ")
        Largeur=int(Ligne.split(" ")[0])
        Hauteur=int(Ligne.split(" ")[1])
        PixTotal=Largeur*Hauteur
        Image4Couleurs.write(Ligne)
    elif NumLigne==3:
        Image4Couleurs.write(str(255)+"\n")
    else:
        NivGris=int(Ligne)
        Courante=ListeC[NivGris]
        for Composantes in range(0,3):#R,G,B
            Nuance=str(Courante[Composantes])
            Image4Couleurs.write(Nuance+"\n")
        #NumPixel+=1
        #print str(100*NumPixel/PixTotal)+"%"
    Ligne=Image.readline()

#Resumé:
print ("Nombre de lignes lu(commentaires exclus, informations sans importance): "+
       str(NumLigne)+
       "\nLargeur: "+str(Largeur)+
       " et Hauteur: "+str(Hauteur)+
       "\nLe nouveau niveau maximum de couleur est: 256"+
       "\nLe coefficient de l'une à l'autre image est de 64."+
       "\nLes couleurs choisies sont: "+#ne marche pas...", ".join(ListeC)+
       "\nLe nouveau fichier se nomme: << "+Nom4Couleurs+" >>"+
       "\net se trouve dans le même dossier."
       )

Image.close
Image4Couleurs.close

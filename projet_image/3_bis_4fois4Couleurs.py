# -*- coding: utf-8 -*-

"""
Ouvre une image ppm couleur (Rouge,Vert,Bleu ou Red,Green,Blue)
"""




#Initialisation
from random import randint#importation de la fonction randint(x,y)

Nom=input("Nom du fichier image avec juste 4 niv de gris:\n")
ImageLu=open(Nom,'r')

NomImageFinal="GrandeImage16Couleurs.ppm"
Image16Couleurs=open(NomImageFinal,'w')

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

ListeEntiere=[Orange,Autre,Noir,Blanc,Bleu,
              Vert,Cyan,Rouge,Magenta,Jaune]
NbCouleurs=len(ListeEntiere)
print (NbCouleurs,randint(0,NbCouleurs-1),type(ImageLu))

GListe=[]
for Image in range(0,4):
    ListeC=[]
    for Couleurs in range(0,4):
        Nombre=randint(0,NbCouleurs-1)
        CouleurChoisie=ListeEntiere[Nombre]
        ListeC.append(CouleurChoisie)
    GListe.append(ListeC)
NumLigne,NumPixel=0,0
#Fin Initialisation



#Traitement
print ("En cours de traitement ...")
Ligne=ImageLu.readline()
while NumLigne != 3:
    NumLigne+=1
    if NumLigne==1:
        Image16Couleurs.write("P3"+"\n")
    elif NumLigne==2:
        print (Ligne.split(" "))
        Largeur=int(Ligne.split(" ")[0])
        NvLargeur=Largeur*2
        Hauteur=int(Ligne.split(" ")[1])
        NvHauteur=Hauteur*2
        PixTotal=NvLargeur*NvHauteur
        NvLigne=(str(NvLargeur)+" "+str(NvHauteur)+"\n")
        Image16Couleurs.write(NvLigne)
    elif NumLigne==3:
        Image16Couleurs.write(str(255)+"\n")
    Ligne=ImageLu.readline()



Lignes=ImageLu.readlines()
print (len(Lignes),"---")
for ImDColonne in range(0,4,2):
    for h in range(0,Hauteur):
        for ImDLigne in range(0,2):
            LotCouleurs=GListe[ImDLigne+ImDColonne]
            for l in range(0,Largeur):
                try:
                    Ligne=Lignes[3+l+(h*Largeur)]
                except IndexError:
                    print ("Valeux max atteinte")
                    #print 3+l+(h*Largeur),"   ",l,h,Largeur
                NivGris=int(Ligne.split(".")[0])
                Courante=LotCouleurs[NivGris]
                for Composantes in Courante:#R,G,B
                    Nuance=str(Composantes)
                    Image16Couleurs.write(Nuance+"\n")
#Fin Traitement



#Sortie(Resumé):
print ("Nombre de lignes lu(commentaires exclus, informations sans importance): "+
       str(NumLigne)+
       "\nlargeur: "+str(Largeur)+
       " et hauteur: "+str(Hauteur)+
       "\nAu total il y a "+str(PixTotal)+" pixels"+
       "\nNouvelle taille: nouvelle largeur: "+str(NvLargeur)+
       ", nouvelle hauteur: "+str(NvHauteur)+"."+
       "\nDans la nouvelle image il y a "+str(4*PixTotal)+" pixels"+
       "\nLe nouveau niveau maximum de couleur est: 256"+
       "\nLe coefficient de l'une à l'autre image est de 64."+
       "\nLes couleurs choisies sont: "+#ne marche pas...", ".join(ListeC)+
       "\nLe nouveau fichier se nomme: << "+NomImageFinal+" >>"+
       "\net se trouve dans le même dossier."+""
       )
#Fin Sortie


#Fermeture des fichiers
ImageLu.close()
Image16Couleurs.close()

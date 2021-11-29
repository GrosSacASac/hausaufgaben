# -*- coding: utf-8 -*-

"""
#Ouvre une image
"""

#Initialisation
NomImage = input("Nom du fichier image pgm en gris:\n")
Image=open(NomImage,'r')

Nom4Gris="Image4Gris.pgm"
Image4Gris=open(Nom4Gris,'w')

NumLigne=0
NvNiveau=3
#Fin Initialisation



#Traitement
print ("En cours de traitement ...")
Ligne=Image.readline()
while Ligne != "":
    NumLigne+=1
    if NumLigne==1:
        Image4Gris.write("P2"+"\n")
    elif NumLigne==2:
        Largeur=int(Ligne.split(" ")[0])
        Hauteur=int(Ligne.split(" ")[1])
        PixTotal=Largeur*Hauteur
        Image4Gris.write(Ligne)
    elif NumLigne==3:
        ValMax=int(Ligne)
        Coeff=(ValMax+1)/(NvNiveau+1)
        Image4Gris.write(str(NvNiveau)+"\n")
    else:            
        NvValeur=(int(Ligne))/Coeff
        Image4Gris.write(str(NvValeur)+"\n")
    Ligne=Image.readline()
#Fin Traitement



#Sortie(Resumé):
print ("Nombre de lignes lu(commentaires exclus, informations sans importance): "+
       str(NumLigne)+
       "\nLargeur: "+str(Largeur)+
       " et Hauteur: "+str(Hauteur)+
       "\nAu total il y a "+str(PixTotal)+" pixels"+
       "\nLe nouveau niveau maximum de couleur est: "+str(NvNiveau)+
       "\nLe coefficient de l'une à l'autre image est de: "+str(Coeff)+
       "\nLe nouveau fichier se nomme: << "+Nom4Gris+" >>"+
       "\n et se trouve dans le même dossier."
       )
#Fin Sortie


#Fermeture des fichiers
Image.close()
Image4Gris.close()

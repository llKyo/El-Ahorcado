
archivo = open("diccionario.txt", "r")
lineas = archivo.readlines()
archivoResultado = open('diccionario.js','a')
archivoResultado.write('window.diccionario = [\n')
for linea in lineas:
    archivoResultado.write('"'+linea.strip()+'",\n')

archivoResultado.write("];")
archivo.close()
archivoResultado.close()

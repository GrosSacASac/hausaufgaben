import bpy
filepath = 'exportxyz.txt'
objectNameToExport = 'b'

scene = bpy.context.scene
object = bpy.data.objects[objectNameToExport]
vertices = object.data.vertices
# x, y, z = object.location

with open(filepath, 'w' ,encoding='utf-8') as opened_file:
    # opened_file.write("%s" % objectNameToExport)
    opened_file.write("\n")
    for v in vertices:
        co = v.co
        x,y,z = map(str, co)
        opened_file.write("[%s,%s,%s]," % (x,y,z))
        opened_file.write("\n")

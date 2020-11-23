import json
import sys

# fileObject2 = open('D:/aCSDS395/pythonReadWrite/itemsSample.json')
# filename = sys.argv[1] # python JsonTest.py D:/aCSDS395/pythonReadWrite/itemsSample.json
# fileObject2 = open(filename)
# testinput = json.load(fileObject2)
testinput = json.loads(sys.argv[1]) # this should be a json object
testx = {
    "seller": testinput['seller'],
    "credit": 8.8
}
testoutput = json.dumps(testx)
# print(testoutput)
sys.stdout.write(testoutput)
sys.exit(0)
# sample running phrase in terminal:
# python JsonTest.py (the input JsonObject) > tempout.txt
# so the content will stored in tempout.txt, you may use other format of file

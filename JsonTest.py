import numpy as np
import json
import sys


jsoninput = json.loads(sys.argv[1])
inputList = []
if jsoninput['comments']!=[]: # check if there is feedback value
		value = 5
		if inputItem['sizeInfo']=='':
			value -= 1
		if inputItem['detachable']=='':
			value -= 1
		if inputItem['careIns']=='':
			value -= 1
		if inputItem['productInsurance']=='':
			value -= 1
		if inputItem['damage']=='':
			value -= 1
        inputList.append(value)
        purchase = 0.0
        service = 0.0
        for i in range(len(jsoninput['comments'])):
            purchase = purchase + jsoninput['comments'][i]['rating']
            server = server + jsoninput['comments'][i]['serviceRating']
        purchase = purchase / len(jsoninput['comments'])
        service = service / len(jsoninput['comments'])
        inputList.append(purchase)
        inputList.append(service)
        inputList.append(jsoninput['imageScore'])
thisJson = {
        "seller": jsoninput['seller'],
        "credit": int(round(3.5*2))
    }
jsonOut = json.dumps(thisJson)
sys.stdout.write(jsonOut)
sys.exit(0)


















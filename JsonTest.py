import numpy as np
import json
import sys
# test run on MongoDB terminal with input commend:
# python3 CreditScoringCalculator.py '{"seller": "ABC"}'
# and the program outputs this:
# {"seller": "ABC", "credit": 8.8}


def infoIntegrityCompute(inputItem):
    value = 5 # default score for infoIntegrity
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
    return value


def readJSON():
    # the input json object is info about 'one' sold item
    # items = localTest()
    items = json.loads(sys.argv[1])
    # inputList = [informationIntegrity,purchaseExperience,serviceExperience,pictureQuality]
    inputList = []
    if items['comments']!=[]: # check if there is feedback value
        # print("is sold out and comments non zero")
        inputList.append(infoIntegrityCompute(items))
        purchase = 0.0
        service = 0.0
        for i in range(len(items['comments'])):
            purchase = purchase + items['comments'][i]['rating']
            server = server + items['comments'][i]['serviceRating']
        purchase = purchase / len(items['comments'])
        service = service / len(items['comments'])
        inputList.append(purchase)
        inputList.append(service)
        inputList.append(items['imageScore'])
    return inputList, items['seller']


def outputJsonObject(seller, credit):
    # output to the terminal
    # seller is str, credit is float
    # since the site use 10 credit scale, double and then round to int
    thisJson = {
        "seller": seller,
        "credit": int(round(credit*2))
    }
    return thisJson
    


# weight = readNN()
# thiscredit, thisseller = readJSON()
# finalcredit = computeCredits(thiscredit,weight)
# outputJsonObject(thisseller,finalcredit[0])

thiscredit, thisseller = readJSON()
value = outputJsonObject(thisseller, 3.5)
jsonOut = json.dumps(value)
sys.stdout.write(jsonOut)
sys.exit(0)

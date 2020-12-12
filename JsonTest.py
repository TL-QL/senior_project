import numpy as np
import json
import sys
# test run on MongoDB terminal with input commend:
# python3 CreditScoringCalculator.py '{"seller": "ABC"}'
# and the program outputs this:
# {"seller": "ABC", "credit": 8.8}


def readNN():
    # read the .txt files(that store NN output) from local
    fileObject1 = open(r"NN_output.txt")
    outputMatrix = fileObject1.read()
    arrayOfMatrix = outputMatrix.split('[')
    matrixList = []
    for i in range(len(arrayOfMatrix)):
        if i == 0:
            continue
        temp = arrayOfMatrix[i]
        thisMatrix = temp.split(']')[0]
        arrayOfRows = thisMatrix.split(';')
        rowList = []
        for j in range(len(arrayOfRows)):
            row = []
            tempRow = arrayOfRows[j]
            values = tempRow.split(',')
            for k in range(len(values)):
                row.append(float(values[k]))
            rowList.append(row)
        pattern = np.array(rowList)
        matrixList.append(pattern)
    return matrixList


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


def terminalTest():
    # return the json object as input argv from terminal
    return json.loads(sys.argv[1])


def readJSON():
    # the input json object is info about 'one' sold item
    # items = localTest()
    items = terminalTest()
    # inputList = [informationIntegrity,purchaseExperience,serviceExperience,pictureQuality]
    inputList = []
    if items['comments']!=[]: # check if there is feedback value
        # print("is sold out and comments non zero")
        inputList.append(infoIntegrityCompute(items))
        purchase = 0.0
        service = 0.0
        for i in range(len(items['comments'])):
            purchase = purchase + (items['comments'][i]['rating'] / 2)
            service = service + (items['comments'][i]['serviceRating'] /2)
        purchase = purchase / len(items['comments'])
        service = service / len(items['comments'])
        inputList.append(purchase)
        inputList.append(service)
        inputList.append(items['imageScore'])
    return inputList, items['seller'], items['credit']


def outputJsonObject(seller, credit):
    # output to the terminal
    # seller is str, credit is float
    # since the site use 10 credit scale, double and then round to int
    thisJson = {
        "seller": seller,
        "credit": credit
    }
    JsonOut = json.dumps(thisJson)
    # sys.stdout.write(JsonOut)
    # sys.exit(0)
    print(JsonOut)
    sys.stdout.flush()


def provideInt(creditarray, finalcredit):
    num = 0
    for i in creditarray:
        num += i
    num = num / len(creditarray)
    num = num * 2
    print(num)
    if num >= finalcredit:
        num = (num + finalcredit)/2
    else:
        num = (num + finalcredit)/2
        num = num // 1
    num = int(np.round(num))
    return num


def sigmoid(x):
    x=np.transpose(x)
    if np.size(x) == 1:
        k=(1/(1 + np.exp(-x)))
    else:
        k =  np.zeros(len(x))
        for i in range (len(x)):
            k[i] = (1/(1 + np.exp(-x[i])))
        k=(k)
    return k


def computeCredits(creditarray, weightarray): # input: credit array, weight array, bias array; output: float
    creditarray=np.concatenate(([1], creditarray), axis=0)
    # np.array([1,3,5,4.8,20]) #notice concatenated a 1
    # print(len(weightarray))
    num_hidden_layers=len(weightarray)-1

    u_matrice = np.zeros((num_hidden_layers+1), dtype=np.object)
    phi_matrice= np.zeros((num_hidden_layers+1), dtype=np.object)

    # readNN()[0][0] 3X1 vetor u_matrice
    u_matrice[0] = np.dot((weightarray[0]),creditarray.T) # weight[1] * input_pattern

    phi_matrice[0] = sigmoid(u_matrice[0])
    phi_matrice[0][0]= 1
    # u_matrice[0] [0]= 1
    for i in range(1,len(weightarray)):
        u_matrice[i] =  np.dot((weightarray[i]),phi_matrice[i-1])
        phi_matrice[i] = sigmoid(u_matrice[i])
    credit = phi_matrice[len(phi_matrice)-1]
    return credit*10


def updatecredit(creditarray, finalcredit, currentcredit):
    computevalue = provideInt(creditarray, finalcredit)
    if currentcredit == -1:
        return computevalue
    else:
        return (computevalue + currentcredit) / 2


weight = readNN()
thiscredit, thisseller, currentcredit = readJSON()
finalcredit = computeCredits(thiscredit,weight)
finalvalue = updatecredit(thiscredit, finalcredit[0], currentcredit)
outputJsonObject(thisseller,finalvalue)


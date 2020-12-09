# The purpose of this program is to creat a nueral network that would classify input data in a vector form of {infomation integrity,purchase_experience,responsing_speed,picture_quality}
# and out put categories {1,2,3,4,5} as credit scores 


## Reference List 
# https://machinelearningmastery.com/implement-resampling-methods-scratch-python/ How to implement python cross 


# this part of code is for a simple fully connected networks 
# consideer to upgarde to CNN, RNN, LSTM 

import numpy as np 
import matplotlib.pyplot as plt 
from random import seed
from random import randrange
import csv

with open('data for scoring system - amazon.csv', encoding="utf8", newline='') as csvfile:
     data = list(csv.reader(csvfile))

input_temp=data[1:len(data)]

# find the appropriate input data 
input_fina_1l=np.array(input_temp)[:,4:8]
input_fina_1l=input_fina_1l.astype(np.float)

# read the last column from imported data and set the type
# as np float 
label_temp = np.array([np.array(input_temp)[:,12]])
label_tem = label_temp.astype(np.float)
together = np.concatenate((input_fina_1l, label_tem.T), axis=1)

#normalized_label = (temp-np.min(temp))/(np.max(temp)-np.min(temp))
#input_final = np.concatenate((input_fina_1l, normalized_label.T), axis=1)

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

def sigmoid_prime(x): 
    x_=np.transpose(x)
    
    if np.size(x) == 1:
        k=np.dot(sigmoid(x),1-sigmoid(x))

    else:
        k =  np.zeros(len(x_))
        for i in range (len(x_)):
            k[i] = (sigmoid(x[i])*(1-sigmoid(x[i])))
            
    return k 
    
    

def tanh(x):
    x=np.transpose(x)

    k =  np.zeros(len(x))
    for i in range(len(x)):
        k[i] = np.tanh(x[i]);
    return k 


def tanh_prime(x):
    x=np.transpose(x)

    k =  np.zeros(len(x))
    for i in range( len(x)):
        k[i] = 1-np.tanh(x[i])**2;
    return k 

def bipolar(x):
    y=0
    if x > 0:
        y = 1
    else :
        y =-1
    return y


def gen_full_weight(onto_layer_num_node, from_layer_num_node):
    return (np.random.rand(onto_layer_num_node, from_layer_num_node) - 0.5)
  
    
    
def gen_kernaled_weight(onto_layer_num_node, from_layer_num_node,kernal):
    temp =  (np.random.rand(onto_layer_num_node, from_layer_num_node) - 0.5)
    temp_flatten = temp)
    temp_faletten_kernal = np.flatten #[1010]
    # potentially we want a size check with the kernal,make sure that 
    # you can raise an exception when there is a problem with kernal size and the outut 
    
    for i in range (0, len(temp)):
        if temp_faletten_kernal(i) == 0:
            print(temp_flatten(i))
       
    return temp
    
    
def gen_bia (num_node_layer):
    return np.random.rand(1, num_node_layer) - 0.5


def foward_u(input_data,weight):
  #  print(weight)
    output =  np.dot(weight,input_data)
    return output

def mse(label, y):
    return np.mean(np.power(label-y, 2));

def caculate_error(weight,input_pattern,num_hidden_layer,target_pattern):
    npats=np.size(target_pattern)
    noutputs=np.size(target_pattern[0])

    esqd=0;
    for i in range(0,npats):
        stim_vec=input_pattern[i,:]
        [u_m,p_m]=fedforwd(weight,input_pattern,num_hidden_layers,stim_vec)

        errvec=p_m[len(p_m)-1]-target_pattern[i,:]
        esqd=esqd+errvec.T*errvec;

    rmserr=np.sqrt(esqd/npats)
    
    return rmserr,esqd



def fedforwd(weight,input_pattern,num_hidden_layers,stim_vec):

    u_matrice = np.zeros((num_hidden_layers+1), dtype=np.object)
    phi_matrice= np.zeros((num_hidden_layers+1), dtype=np.object)
    
    u_matrice[0] = foward_u(stim_vec.T,(weight[0]))##weight[1] * input_pattern
    phi_matrice[0] = sigmoid(u_matrice[0])
    phi_matrice[0] [0]= 1;
   # u_matrice[0] [0]= 1;

    for i in range(1,num_hidden_layers+1):
        u_matrice[i] =  foward_u(phi_matrice[i-1],(weight[i]))
        phi_matrice[i] = sigmoid(u_matrice[i])  
    return u_matrice,phi_matrice


def k_fold_cross_validation(dataset, folds):
    folds=3
    dataset_split = np.array()
    dataset_copy = input_final
    data_index_len = int(np.size(input_final[:,1]))##9
    fold_size = int(np.size(input_final[:,1]) / folds)
    k=random.sample(range(1, data_index_len), 2*fold_size)
    train = data_copy[k]
    mask =np.ones(data_index_len, dtype=bool)
    mask[k] = False
    test = data_copy[mask]

    return train,test

   

def split_label(dataset):
    label = input_final[:,len(input_final[0])-1];
    input_pattern = input_final[:,0:(len(input_final[0])-1)]

    return input_pattern,label


def train_test_split(input_final, split=0.60):
    seed(1) #set seed 
    data_index_len = int(np.size(input_final[:,1]))##99 
    train = list()
    train_size = int(split * data_index_len)
    test_size = data_index_len-train_size
    data_copy=input_final
    #    while len(train) < train_size:
    #       index = randrange(len(dataset_copy))
    #      train.append(dataset_copy.pop(index))
    data_copy=input_final
    k=random.sample(range(1, data_index_len), train_size)
    train = data_copy[k]
    mask =np.ones(data_index_len, dtype=bool)
    mask[k] = False
    test = data_copy[mask]

    return train, test, dataset_copy


def back_propogation(target, input_pattern,layer_matrice,weight, learning_rate, num_itr,num_hidden_layers):
    for itration in range(0,num_itr):
        u_matrice = np.zeros((num_hidden_layers+1), dtype=np.object)
        phi_matrice= np.zeros((num_hidden_layers+1), dtype=np.object)


        dW_cum_laywer=np.zeros((num_hidden_layers+1), dtype=np.object)
        delta_cum_laywer=np.zeros((num_hidden_layers+1), dtype=np.object)

        for p in range (0,len( input_pattern)):
            stim_vec=input_pattern[p,:]
            #print("hell")
            
            [u_matrice,phi_matrice]=fedforwd(weight,input_pattern,num_hidden_layers, stim_vec)
            ## start 
            output =  phi_matrice[len(phi_matrice)-1]
            error = output[0]-target[0]

            d_E_d_y = error

            delta_l = error * sigmoid_prime(u_matrice[len(u_matrice)-1])
            delta_cum_laywer[num_hidden_layers]=np.add(delta_cum_laywer[num_hidden_layers],delta_l)

            dW_l = delta_l * phi_matrice[len(u_matrice)-2]
            dW_cum_laywer[num_hidden_layers] = np.add(dW_cum_laywer[num_hidden_layers],dW_l)
            delta_l_m=[delta_l]
            ##iterative loop
            for i in range(1,num_hidden_layers):
                #i=1
                phi_prime = np.multiply(np.transpose([phi_matrice[len(phi_matrice)-1-i]]),1-np.transpose([phi_matrice[len(phi_matrice)-1-i]]))

                delta_l_m=np.multiply(np.dot(weight[len(weight)-1-i+1].T,delta_l_m) , phi_prime)
                delta_cum_laywer[i]=np.add(delta_cum_laywer[i],delta_l_m)

                dW=np.dot(delta_l_m,[phi_matrice[len(u_matrice)-2]])  #get notice that phi and u matrice are not array and not col vect     
                dW_cum_laywer[i]= np.add(dW_cum_laywer[i],dW)


          #indent end 

            #for the very last layer 
            #layer = 0
            phi_prime = np.multiply(np.transpose([phi_matrice[0]]),1-np.transpose([phi_matrice[0]]))
            delta_l_m= np.multiply(np.dot(weight[1].T,delta_l_m) , phi_prime) #the last one went out 
            delta_cum_laywer[0]=np.add(delta_cum_laywer[0],delta_l_m)

            dW=np.dot(delta_l_m,[input_pattern[p,:]])
            dW_cum_laywer[0]=np.add(dW_cum_laywer[0],dW)
        ##end p loop 


        [rmserr,Esqd] = caculate_error(weight,input_pattern,num_hidden_layers,target_pattern)
        weight_original = weight
        #update weight 
        for i in range(0,num_hidden_layers+1):
            #print( weight[i])
            weight[i]=np.subtract(weight[i],learning_rate*dW_cum_laywer[i])
            #print( weight[i])

        #print error
        #weight,input_pattern,target,      
         
      
        [rms,Esqd_new] =  caculate_error(weight,input_pattern,num_hidden_layers,target_pattern)
        dE = 0.5*(Esqd_new-Esqd);
        if (dE>0): 
            eta=0.5*learning_rate;
            weight= weight_original
        
        learning_rate = learning_rate*1.1;

        
    print("error")
    print(rmserr)
            
    return weight


def back_propogation_CNN(target, input_pattern,layer_matrice,weight, learning_rate, num_itr,num_hidden_layers):
    for itration in range(0,num_itr):
        u_matrice = np.zeros((num_hidden_layers+1), dtype=np.object)
        phi_matrice= np.zeros((num_hidden_layers+1), dtype=np.object)


        dW_cum_laywer=np.zeros((num_hidden_layers+1), dtype=np.object)
        delta_cum_laywer=np.zeros((num_hidden_layers+1), dtype=np.object)

        for p in range (0,len( input_pattern)):
            stim_vec=input_pattern[p,:]
            #print("hell")
            
            [u_matrice,phi_matrice]=fedforwd(weight,input_pattern,num_hidden_layers, stim_vec)
            ## start 
            output =  phi_matrice[len(phi_matrice)-1]
            error = output[0]-target[0]

            d_E_d_y = error

            delta_l = error * sigmoid_prime(u_matrice[len(u_matrice)-1])
            delta_cum_laywer[num_hidden_layers]=np.add(delta_cum_laywer[num_hidden_layers],delta_l)

            dW_l = delta_l * phi_matrice[len(u_matrice)-2]
            dW_cum_laywer[num_hidden_layers] = np.add(dW_cum_laywer[num_hidden_layers],dW_l)
            delta_l_m=[delta_l]
            ##iterative loop
            for i in range(1,num_hidden_layers):
                #i=1
                phi_prime = np.multiply(np.transpose([phi_matrice[len(phi_matrice)-1-i]]),1-np.transpose([phi_matrice[len(phi_matrice)-1-i]]))

                delta_l_m=np.multiply(np.dot(weight[len(weight)-1-i+1].T,delta_l_m) , phi_prime)
                delta_cum_laywer[i]=np.add(delta_cum_laywer[i],delta_l_m)

                dW=np.dot(delta_l_m,[phi_matrice[len(u_matrice)-2]])  #get notice that phi and u matrice are not array and not col vect     
                dW_cum_laywer[i]= np.add(dW_cum_laywer[i],dW)


          #indent end 

            #for the very last layer 
            #layer = 0
            phi_prime = np.multiply(np.transpose([phi_matrice[0]]),1-np.transpose([phi_matrice[0]]))
            delta_l_m= np.multiply(np.dot(weight[1].T,delta_l_m) , phi_prime) #the last one went out 
            delta_cum_laywer[0]=np.add(delta_cum_laywer[0],delta_l_m)

            dW=np.dot(delta_l_m,[input_pattern[p,:]])
            dW_cum_laywer[0]=np.add(dW_cum_laywer[0],dW)
        ##end p loop 


        [rmserr,Esqd] = caculate_error(weight,input_pattern,num_hidden_layers,target_pattern)
        weight_original = weight
        #update weight 
        for i in range(0,num_hidden_layers+1):
            #print( weight[i])
            weight[i]=np.subtract(weight[i],learning_rate*dW_cum_laywer[i])
            #print( weight[i])

        #print error
        #weight,input_pattern,target,      
         
      
        [rms,Esqd_new] =  caculate_error(weight,input_pattern,num_hidden_layers,target_pattern)
        dE = 0.5*(Esqd_new-Esqd);
        if (dE>0): 
            eta=0.5*learning_rate;
            weight= weight_original
        
        learning_rate = learning_rate*1.1;

        
    print("error")
    print(rmserr)
            
    return weight













# var initializations, change accordingly 
num_hidden_layers = 2;
num_node_in_hidden_layer = 3;
num_output = 1;
# 5 inputs for testing purpose; consider add the size for more
x1 = [1,3,5,4.8,20]
x2 = [1,5,5,4.8,20]
x3 = [1,3,5,4.8,20]
x4 = [1,3,5,4.8,16]
x5 = [1,5,5,4.8,20]


#input_pattern = np.row_stack((x1,x2,x3,x4,x5))
#target_pattern = np.row_stack((4,3.5,4,3.5,4))

# input directly the 
input_pattern=input_fina_1l
target_pattern=np.transpose(label_tem)

target_pattern = np.row_stack((4,3.5,4,3.5,4))
temp_l = label_temp.astype(np.float)


#set the learning rate
learning_rate = 0.05

#get
#num_input = len(input_pattern)

# creates an empty weight and bias matrice and then fill in with loop
weight = np.zeros((num_hidden_layers+1), dtype=np.object)
bias =  np.zeros((num_hidden_layers+1), dtype=np.object)
layer_matrice =np.zeros((num_hidden_layers+2), dtype=np.object)

num_itr = 100

itr = 0;
layer_matrice[0] = len(input_pattern[0])
for i in range(1,num_hidden_layers+1):
    layer_matrice[i] =num_node_in_hidden_layer 
layer_matrice[num_hidden_layers+1] = num_output

for i in range(0,num_hidden_layers+1):
    print(layer_matrice[i])
    weight[i] = gen_full_weight(layer_matrice[i+1], layer_matrice[i]) ## onto_from_layer_num_node
    bias[i]= gen_bia (layer_matrice[i+1])

back_propogation(np.transpose(label_tem) ,input_fina_1l,layer_matrice,weight, learning_rate, 1000,num_hidden_layers)



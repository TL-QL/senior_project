#!/usr/bin/env python
# coding: utf-8

# In[21]:


import integration_code
import pandas as pd
import random
import json
from sklearn.feature_extraction.text import TfidfVectorizer
import sklearn
from sklearn.metrics.pairwise import linear_kernel,cosine_similarity
import numpy as np
from sklearn.decomposition import TruncatedSVD
import sys


# In[4]:


def get_purchase_list(username):
    purchase_list = []
    bought_list = df_1["buyer"]
    
    for b in df_1["buyer"]:
        if username in b:
            item_id = df_1.loc[df_1["buyer"].astype(str) == str(b)]["item_id"].array
            purchase_list.append(item_id[0])           
            
    return purchase_list

    
def get_index(purchase_list):
    return random.randint(0,len(purchase_list)-1)


# In[15]:


def recommend(item_id, num):
    item_id = str(item_id)
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 4), min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(df_1['description'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    results = {}
    for idx, row in df_1.iterrows():
        similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
        similar_items = [(cosine_similarities[idx][i], df_1['item_id'][i]) for i in similar_indices]
        results[row['item_id']] = similar_items[1:]
    recs = results[item_id][:num]
    rec_list = []
    for rec in recs:
        rec_list.append(rec[1]) 
    return rec_list


# In[16]:


def col_fil(item_index,num,final_ver_df):    
    final_ver_df.sort_values("rating",ascending=False)
    ratings_utility_matrix = final_ver_df.pivot_table(values='rating', index= "buyer", columns='item_id', fill_value=0)

    ratings_utility_matrix.shape
    
    X = ratings_utility_matrix.T
    X1 = X
    
    SVD = TruncatedSVD(n_components=2)
    decomposed_matrix = SVD.fit_transform(X)
    correlation_matrix = np.corrcoef(decomposed_matrix)
    X.index[item_index]
    product_names = list(X.index)
    product_ID = product_names.index(X.index[item_index])
    correlation_product_ID = correlation_matrix[product_ID]
    Recommend = list(X.index[correlation_product_ID > 0.80])
    Recommend.remove(X.index[item_index]) 
    return Recommend[0:num]


# In[22]:


if __name__ == "__main__":
#     obj = json.loads(sys.argv[1])
    
    obj = integration_code.testinput
    
    with open("test2.json","w",encoding="utf-8") as f:
        f.write(obj)
    
    with open("test2.json","r",encoding="utf-8") as f:
        info=f.read()
        data_list = json.loads(info)
        username = data_list["username"]
        items = data_list["items"]
        df_1=pd.DataFrame(items)
        
    new_rating = []

    for r in df_1["rating"]:
        if len(r) == 0:
            new_rating.append(5.0)
        else:
            sum = 0
            for i in r:
                sum = sum + i
            avg = sum* 1.0/(len(r) * 1.0)
            new_rating.append(avg)

    
    df_1["rating"] = new_rating

    new_buyer = []
    all_buyer = []

    for b in df_1["buyer"]:
        if len(b)>0:
            buyer_list = b.split(',')
            new_buyer.append(buyer_list)
            for i in buyer_list:
                if i not in all_buyer:
                    all_buyer.append(i)
        else:
            new_buyer.append([])
    df_1["buyer"] = new_buyer

    
    array_display = df_1.to_numpy()
    new_list = []

    for i in array_display:
        item = []
        for j in i:
            if isinstance(j, list) == False:
                item.append(j)
        new_list.append(item)
    
    final_version = []
    index = 0

    for i in new_buyer:
        for j in i:
            item = []
            item = new_list[index].copy()
            item.append(j)
            final_version.append(item)
        index = index + 1
    
    final_ver_df = pd.DataFrame(final_version, columns=["item_id", "description","rating","buyer"])
    
    purchase_list = get_purchase_list(username)
    get_index(purchase_list)
    content_based_index = get_index(purchase_list)
    content_based_res = recommend(content_based_index, 3)
    col_fil_index = get_index(purchase_list)
    col_fil_res = col_fil(col_fil_index,3,final_ver_df)
    
    final_res = []
    for i in content_based_res:
        if i not in final_res:
            final_res.append(i)
    for i in col_fil_res:
        if i not in final_res:
            final_res.append(i)
    testx = final_res
    testoutput = json.dumps(testx)
    sys.stdout.write(testoutput)
    sys.exit(0)
#     print(content_based_res)  
#     print(col_fil_res)
#     print(final_res)
    
#     main()


#!/usr/bin/env python
# coding: utf-8

# In[17]:


# reference website https://heartbeat.fritz.ai/recommender-systems-with-python-part-i-content-based-filtering-5df4940bd831
# reference website https://towardsdatascience.com/recommender-system-singular-value-decomposition-svd-truncated-svd-97096338f361

# import integration_code
import pandas as pd
import random
import json
from sklearn.feature_extraction.text import TfidfVectorizer
import sklearn
from sklearn.metrics.pairwise import linear_kernel,cosine_similarity
import numpy as np
from sklearn.decomposition import TruncatedSVD
import sys
from rake_nltk import Rake
import gc


# In[2]:


# !pip install rake-nltk


# In[49]:


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


# In[57]:


def recommend(item_id, num,df_1):
    item_id = str(item_id)
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 4), min_df=0, stop_words='english')
    df_1['key_words'] = ''
    r = Rake() 
    for index, row in df_1.iterrows():
        r.extract_keywords_from_text(row['description'])
        key_words_dict_scores = r.get_word_degrees()
        row['key_words'] = list(key_words_dict_scores.keys())
    columns = ['key_words'] 
    for index, row in df_1.iterrows():
        words = ''
        for col in columns:
            words += ' '.join(row[col]) + ' '
        row['description'] = words
    tfidf_matrix = tf.fit_transform(df_1['description'])
    cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)
    results = {}
    for index, row in df_1.iterrows():        
        similar_index = cosine_similarities[index].argsort()
        similar_items = [(cosine_similarities[index][i], df_1['item_id'][i]) for i in similar_index]
        results[row['item_id']] = similar_items[1:]
#     print(item_id)
    recs = results[item_id][:num]
    rec_list = []
    for rec in recs:
        rec_list.append(rec[1]) 
    return rec_list


# In[4]:


def col_fil(item_index,num,final_ver_df):    
    final_ver_df.sort_values("rating",ascending=False)
    ratings_utility_matrix = final_ver_df.pivot_table(values='rating', index= "buyer", columns='item_id', fill_value=0)
    X = ratings_utility_matrix.T
    X1 = X
    
    SVD = TruncatedSVD(n_components=3)
    decomposed_matrix = SVD.fit_transform(X)
    correlation_matrix = np.corrcoef(decomposed_matrix)
    X.index[item_index]
    product_names = list(X.index)
    product_ID = product_names.index(X.index[item_index])
    correlation_product_ID = correlation_matrix[product_ID]
    Recommend = list(X.index[correlation_product_ID > 0.80])
    Recommend.remove(X.index[item_index]) 
    return Recommend[0:num]


# In[68]:


if __name__ == "__main__":
    obj = sys.argv[1]

#     obj = '{"username":"TooLazy","items":[{"item_id":"0","description":"It is spongebob. It belongs to category home. Product insurance . Detaching Info . Care Instruction . Description on damages ","comments":[],"buyer":"TooLazy,Buyer1"},{"item_id":"1","description":"It is sofa2. It belongs to category home. Product insurance NO insurance. Detaching Info dvdvdvddcdddddddddddddddddddddddddddddddddddddddddddddddddddd. Care Instruction ccccccccccccccccccccccccccccccccccccc. Description on damages Perfect. No damage","comments":[{"rating":3,"author":"TooLazy"},{"rating":7,"author":"Buyer11"}],"buyer":""},{"item_id":"3","description":"It is Genki textbook. It belongs to category books. Product insurance no insurance. Detaching Info not detachable. Care Instruction just a book. Description on damages almost perfect, some notes being taken","comments":[{"rating":9,"author":"TooLazy"}],"buyer":""},{"item_id":"4","description":"It is Harry Potter and the Sorcerers Stone. It belongs to category books. Product insurance no insurance. Detaching Info not detachable. Care Instruction just a book. Description on damages perfect, no damage","comments":[],"buyer":""},{"item_id":"7","description":"It is iclicker. It belongs to category electronics. Product insurance no insurance. Detaching Info . Care Instruction no batteries included, need to plugin batteries yourself. Description on damages there are light scratches but the item is totally functional","comments":[],"buyer":""},{"item_id":"8","description":"It is HP laptop. It belongs to category electronics. Product insurance No insurance. Detaching Info . Care Instruction charger is included. Description on damages there are scratches on the bottom, and little issues with the fans","comments":[],"buyer":""},{"item_id":"9","description":"It is Iphone 11, 128GB. It belongs to category electronics. Product insurance No insurance. Detaching Info . Care Instruction no charger/USB included. Description on damages there are some sort of light scratches on the back, otherwise, perfect","comments":[],"buyer":""},{"item_id":"11","description":"It is dog outdoor tent. It belongs to category pets. Product insurance no insurance. Detaching Info detachable. Care Instruction . Description on damages there is a hole on left side","comments":[],"buyer":""},{"item_id":"12","description":"It is outdoor pink bike. It belongs to category motors. Product insurance No insurance. Detaching Info No detaching info. Care Instruction . Description on damages perfect but little scratches on the body","comments":[],"buyer":"TooLazy"},{"item_id":"13","description":"It is bike. It belongs to category motors. Product insurance NO insurance. Detaching Info . Care Instruction . Description on damages ","comments":[{"rating":8,"author":"TooLazy"}],"buyer":""},{"item_id":"15","description":"It is bb-8. It belongs to category home. Product insurance . Detaching Info . Care Instruction . Description on damages ","comments":[],"buyer":"Buyer1,Buyer2"},{"item_id":"16","description":"It is bb-88. It belongs to category home. Product insurance . Detaching Info . Care Instruction . Description on damages ","comments":[],"buyer":""}]}'
    data = json.dumps(eval(obj))
    data_list = json.loads(data)


    username = data_list["username"]
    items = data_list["items"]
#     print(len(items))

    df_1=pd.DataFrame(items)

    all_rate = []
    all_buyer = []
    new_buyer = []
    for b in df_1["buyer"]:
        if len(b)>0:
            buyer_list = b.split(',')
            new_buyer.append(buyer_list)
        else:
            new_buyer.append([])  

    index = 0
    for c in df_1["comments"].array:
        comment_list = c
        current_rate = []
        current_author = []
        for i in comment_list:
            if i["author"] in new_buyer[index]:
                current_rate.append(i["rating"])
                current_author.append(i["author"])
        all_rate.append(current_rate)
        all_buyer.append(current_author)
        index = index + 1

    df_1["buyer"] = new_buyer
    df_2 = df_1.drop(columns=["comments"])

    array_display = df_2.to_numpy()
    new_list = []

    for i in array_display:
        item = []
        for j in i:
            if isinstance(j, list) == False:
                item.append(j)
        new_list.append(item)

    final_version = []
    index = 0

    for i in all_buyer:
        rating_index = 0
        for j in i:
            item = []
            item = new_list[index].copy()
            item.append(all_rate[index][rating_index])
            item.append(j)
            final_version.append(item)
            rating_index = rating_index + 1
        index = index + 1

    final_ver_df = pd.DataFrame(final_version, columns=["item_id", "description","rating","buyer"])


    purchase_list = get_purchase_list(username)
    final_res = []
    if len(purchase_list) > 0:
#         print(purchase_list)
        content_based_res = []
        col_fil_res = []
        content_based_index = get_index(purchase_list)
#         print(purchase_list)
        content_based_res = recommend(purchase_list[content_based_index], 3,df_1)

        try:
            col_fil_index = get_index(purchase_list)
            col_fil_res = col_fil(purchase_list[col_fil_index],3,final_ver_df)
        except Exception:
            pass

#         print(content_based_res)
        for i in content_based_res:
            if i not in final_res:
                final_res.append(i)
        for i in col_fil_res:
            if i not in final_res:
                final_res.append(i)
       
    if len(final_res) is 0:
        while(len(final_res) < 3):
            option = random.randint(0, len(items) -1)
            if option not in final_res:
                final_res.append(str(option))
    testx = final_res

    JsonOut = json.dumps(final_res)
    print(JsonOut)
    sys.stdout.flush()

    


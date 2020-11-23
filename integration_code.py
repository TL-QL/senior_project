#!/usr/bin/env python
# coding: utf-8

# In[1]:


import json
import sys

testinput = json.loads(sys.argv[1])
testx = ["1","2","0"]
testoutput = json.dumps(testx)
sys.stdout.write(testoutput)
sys.exit(0)


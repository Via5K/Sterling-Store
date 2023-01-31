from bs4 import BeautifulSoup
import requests
import re
import sqlalchemy as db
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy_utils import database_exists, create_database


headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
search = input("Enter the Product Type i.e Electrical, CD's, ETC: ")
page = requests.get("https://flipkart.com/search?q="+search)
 
# IN CASE YOU WANT TO DO VIA LINK, USE THIS
# URL = input("Enter the URL OF THE FLIPKART PAGE AFTER SEARCHING FOR A PRODUCT: ")
# page = requests.get(url = URL, headers=headers)
number = int(input("How Many items of that type do you want?: "))
# URL = "https://flipkart.com/"
soup = BeautifulSoup(page.content, 'html.parser')
# r = requests.get(url=URL, headers=headers)
x= 0
value_list =[]
for item in soup.select('[data-id]'):
    try:

        if(x>number):
            break
        print('---------------------')
        temp = {}
        print(x)
        name = item.select('a img')[0]['alt']
        url = 'flipkart.com'+item.select('a')[0]['href']
        productImage = item.select('a img')[0]['src']
        rating = item.select('[id*=productRating]')[0].get_text().strip()
        prices = item.find_all(text=re.compile('₹'))
        
        # print("Description:\n")
        desc = ''
        for i in item.select('li'):
            # print(i.get_text())
            desc += i.get_text()+','

        # temp['productId']=1
        temp['type'] = 1
        temp['cost'] = prices[0]
        temp['name'] = name
        temp['description'] = desc
        temp['url'] = url
        temp['seller'] = '0x21....'
        temp['validTill'] = 1
        temp['rating'] = rating
        temp['productImage'] = productImage
        
        discounts = item.find_all(text=re.compile('off'))
        print("Discount = "+discounts[0])
        
        x+=1
        value_list.append(temp)
    except Exception as e:
        #rasie e
        b=0


# print(value_list)
#Createed A databse called products.
engine = create_engine("sqlite:///products.sqlite",echo=True)
#checking if the database exists?
if not database_exists(engine.url):
    #if not then create the databse.
    create_database(engine.url)
#Then, print if the database is created or not?
print(database_exists(engine.url))
#Now, connect to the engine.
connection = engine.connect()

meta = MetaData()
#Creating product table 
products = Table('products', meta, 
   Column('productId', Integer, primary_key=True, autoincrement=True), 
   Column('type', Integer),  #used for nft type, so we can classify.
   Column('cost', Integer), #cost of the product
   Column('name', String),  #name of the product
   Column('description', String),  #description of the product
   Column('url', String),  # url of the product
   Column('seller', String),  #seller's address. I.e the address of teh person who is selling
   Column('validTill', String), #Item is valid till? this is useful to destroy or expire the nft in future.
   Column('rating', Integer),  #rating given to the product.
   Column('productImage', String),  #rating given to the product.
    )
meta.create_all(engine)

#go inside the products table
q1 = db.select([products])
#this will insert the data in the products table,
q2 = db.insert(products)
#this is the data that will be inserted in the products table.
# value_list = [
#     {'productId': 1,
#     'type':2,
#     'cost':10000,
#     'name':'Product1',
#     'description':'This is product1 usefult to clean the related items',
#     'url':'https://github.com/via5k',
#     'seller':'0x23naaskj12aqe1uhi12nk121mn12wq',
#     'validTill':14281412,
#     'rating': 4.5}
#     ]
#the query 2, is executed along with the value list. and result is stored in result2.
result2 = connection.execute(q2,value_list)

#get all the data in the products table.
res = connection.execute(db.select([products])).fetchall()
#print the res
# print(res)


# NOW THE TASK IS TO CREATE VALUE_LIST.
# 1. CREATE value_list by using bs4.
# 2. STORE IT IN A FILE.
# 3. THEN CREATE THE DATABASE.
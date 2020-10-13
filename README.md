# Senior Project

## Team members
- Qiwen Luo: Full Stack Web Developer
- Peifeng Hu: Recommendation System Designer
- Lina Dong & Ruyuan Zuo: Credit Model Designers
- Tianxin Jiang: Chatbot Designer

## Folders
- Folder models stores all DB collections' schema 
- Folder wowowui stores all front-end files
- Folder routes usually deal with back-end issues

## How to run the website
- Download: Node JS (https://nodejs.org/en/) and MongoDB (https://www.mongodb.com/)
- Start MongoDB
     - Create a folder named mongodb on your computer and create a subfolder under it named data 
     - Move to the mongodb folder and then start the MongoDB server by typing the following at the prompt: mongod --dbpath=data --bind_ip 127.0.0.1
     - Open another command window and then type the following at the command prompt to start the mongo REPL shell: mongo
     - The Mongo REPL shell will start running and give you a prompt to issue commands to the MongoDB server. At the Mongo REPL prompt, type the following command: use wow
- Run the website
     - Open another command window and move to the folder that contains all files (UI, backend, DB)
     - Type the following at the command prompt to install all dependencies: npm install
     - Type the following at the command prompt to run the website: npm run dev 
     - Client and server will run concurrently
     - Client runs on http://localhost:3000
     - Server runs on http://localhost:5000

## Endpoints
- /home
- /profileseller (backend incomplete)
- /profilebuyer (backend incomplete)
- /search (backend incomplete)
- /aboutus
- /contactus (backend incomplete)
- /favorite (backend incomplete)
- /shoppingcart (backend incomplete)
- /sellerpost (backend incomplete)
- /sellersubmission (backend incomplete)
- /itemdetail (backend incomplete)
- /users/signupseller
- /users/signupbuyer (backend incomplete)
- /adminverify (backend incomplete)

## Notes
- To access the pages with incomplete back-end implementation, please type full URLs (Ex. http://localhost:3000/profileseller) to visit these pages.
- User Manual & Function Specification: https://docs.google.com/document/d/1U9XByjcjFJJ60AYanxge_nRDpEeNZTyfXa8YF1j33xI/edit?usp=sharing

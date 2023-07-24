# TRI-NIT
## Team - Bug Resolvers

### Dynamic Entity Clustering
- Dynamic Clustering of data can improve data processing efficiencies manifold. Let’s say there is an entity with the initial set of parameters. The system is expected to group entities based on “similar” parameters. “Similarity” could mean different things for different parameters. For example, if we consider users as the entity.
- Possible parameters could be: name, date of birth, gender, age, address, etc. Similarity for gender is an exact match, for age is an exact match, whereas, for name, some partial matching algorithm would be used. The rules for clustering should also be easily configurable, we might initially want to cluster based on name only, but moving forward, we might want to cluster based on age as well.

### Project Structure
- [Frontend - React JS, Vis JS, React-Query, Tailwind CSS, Vite](https://github.com/Devang-Shah-49/TRINIT_BUGRESOLVERS_DEV_04/tree/main/webapp)
- [Backend - Flask, PyMongo, MongoDB, Node JS, Express JS](https://github.com/Devang-Shah-49/TRINIT_BUGRESOLVERS_DEV_04/tree/main/api/users)
- [Clustering Algorithm - Python, Proximity Measures](https://github.com/Devang-Shah-49/TRINIT_BUGRESOLVERS_DEV_04/tree/main/api/clusters)
- [Deployment - Docker Containers](https://github.com/Devang-Shah-49/TRINIT_BUGRESOLVERS_DEV_04/blob/main/dockerfile)
- [Dynamic real-time Clustering - Pusher JS](https://github.com/Devang-Shah-49/TRINIT_BUGRESOLVERS_DEV_04/blob/main/api/clusters/cluster.py)

### Challenges we ran into
- Deploying on docker was difficult when using Sockets - Used PusherJS
- Dynamically sending data: Used PusherJS library, works similar to socket programming
- Used proximity measures for clustering high dimensional data instead of classical clustering algorithms
- Making the cluster plots interactive - Used Vis.js, an interactive JS plotting library

### Screenshots
![image](https://user-images.githubusercontent.com/80088008/221364457-3ed0d571-2843-4136-beb8-f0e75edc9139.png)
![image](https://user-images.githubusercontent.com/80088008/221364501-cb853806-f4cd-455a-bac7-46261b48ba19.png)
![image](https://user-images.githubusercontent.com/80088008/221364646-ab0a37ef-8676-40e3-b42b-59e0630fc221.png)

### Getting Started

#### Prerequisites
- Install Node JS - Refer to https://nodejs.org/en/ to install nodejs

#### Cloning the repository locally
- Clone the project on localhost
```bash
git clone https://github.com/Devang-Shah-49/TRINIT_BUGRESOLVERS_DEV_04.git
```
- Move to the project directory
```bash
cd .\webapp\
```
- Install required yarn packages
```bash
yarn
```
#### Connecting to the Database
- Spin up your cluster in MongoDB and also create a `.env` file
- Replace your connection with URI in `.env`
- If you face any problems, refer to the [MongoDB](https://www.mongodb.com/blog/postquick-start-nodejs-mongodb--how-to-get-connected-to-your-database) website.

#### Connecting to the Database if you haven't used MongoDB Atlas before
Install the MongoDB Node.js Driver with the following command:
```bash
yarn add mongodb
```

Set up a [MongoDB Atlas Database](https://www.youtube.com/watch?v=rPqRyYJmx2g) by following this short MongoDB setup video till the *3:20* mark. Stop after that mark!

On your Cluster home page, select CONNECT > Connect your application. 
1. Select Node.js in the drop down for your driver, and select the latest version. 
2. Then, copy the connecting string (URI).
3. Paste this string as the value of mongoURI inside `.env` of this project.

Replace the `<password>` section of the string with your Database Access password. Your server should now successfuly connect to MongoDB!

#### Running the website locally
- Execute the command 
```bash
npm run start
```
- Nodemon will automatically run node server.js for you
- Hurray! The web would now be up and running on http://127.0.0.1:5173/home

### Contributors
- [Devang Shah](https://github.com/Devang-Shah-49)
- [Kunal Joshi](https://github.com/kunalx86)
- [Sairaaj Surve](https://github.com/SairaajSurve)

Extension of this projecct: https://github.com/Devang-Shah-49/BugResolvers_Datahack


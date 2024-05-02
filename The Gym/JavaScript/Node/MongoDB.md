![[mongo.png]]
[[MongoDB]] is a popular open-source NoSQL database that provides high performance, high availability, and easy scalability. It works on the concept of collections and documents, using a flexible, JSON-like document model that can vary from record to record. This means that unlike relational databases, which require a fixed schema, MongoDB allows for a more flexible data model.

Here are some key features and concepts of MongoDB:

1. **Document-Oriented**: MongoDB stores data in BSON format, which is a binary representation of JSON-like documents. This allows for a flexible schema, as each document in a collection can have a different structure.

2. **Collections**: Data in MongoDB is stored in collections, which are analogous to tables in relational databases. However, unlike tables, collections do not require a fixed schema.

3. **Replication**: MongoDB supports replication to provide high availability and automatic failover. This means that data can be automatically copied to multiple servers, and if one server fails, the data can be recovered from another server.

4. **Sharding**: MongoDB supports horizontal scaling through sharding, which allows you to distribute data across multiple servers. This can help to manage large datasets and high traffic loads.

5. **Indexing**: MongoDB provides indexing capabilities to improve query performance. You can create indexes on any field or combination of fields in your documents.

6. **Aggregation Framework**: MongoDB includes an aggregation framework that allows you to perform complex data processing and analysis directly within the database.

7. **Transactions**: MongoDB supports multi-document transactions, which allow you to perform multiple operations atomically.

8. **Query Language**: MongoDB uses a rich query language that allows for complex queries and data manipulation.

9. **GridFS**: For storing and retrieving large files such as images, audio files, and video files, MongoDB provides GridFS, which splits files into chunks and stores each chunk as a separate document.

10. **Geospatial Support**: MongoDB has built-in support for geospatial data, allowing you to perform queries based on location.

MongoDB is often used in applications that require flexibility in data modeling, scalability, and performance. It's particularly well-suited for applications that need to handle large volumes of data and require fast read and write operations.

To interact with MongoDB in a Node.js application, you would typically use a MongoDB driver, such as the official MongoDB Node.js driver, which allows you to connect to a MongoDB database, perform CRUD operations, and execute queries.

### Collections
In MongoDB, a collection is a group of MongoDB documents and is the equivalent of an RDBMS table. Collections do not enforce a fixed schema, which means that documents within a collection can have different fields and structures. This flexibility allows for a wide variety of data models to be used within a single collection.

Here are some key points about collections in MongoDB:

1. **Schema-less**: Unlike tables in relational databases, MongoDB collections do not require a fixed schema. Each document within a collection can have a different set of fields.

2. **Dynamic**: You can add new fields to documents in a collection without having to modify the collection's schema.

3. **Flexible**: Collections can store any type of data, including text, numbers, dates, arrays, and even nested documents.

4. **Scalability**: Collections can grow in size as needed, and MongoDB can handle large amounts of data across many servers.

5. **Indexing**: You can create indexes on any field or combination of fields in a collection to improve query performance.

6. **Aggregation**: MongoDB provides powerful aggregation capabilities that allow you to perform complex data processing and analysis directly within the database.

7. **Replication**: Collections can be replicated across multiple servers for high availability and automatic failover.

8. **Sharding**: Collections can be sharded to distribute data across multiple servers, which can help to manage large datasets and high traffic loads.

When working with MongoDB, you typically organize your data into collections based on the type of data you are storing or the operations you need to perform. 
For example, you might have a `users` collection for storing user data, a `products` collection for storing product information, and so on.

Here's an example of how you might create a collection in MongoDB using the MongoDB Node.js driver:

```javascript
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Get the collection
  const collection = db.collection('users');

  // Insert a document into the collection
  collection.insertOne({ name: 'John Doe', age:  30 }, function(err, result) {
    if (err) throw err;
    console.log("Document inserted");
    client.close();
  });
});
```

In this example, we're connecting to a MongoDB server, selecting a database (`myproject`), and then working with a collection named `users`. We insert a document into the `users` collection and then close the connection.

Collections are a fundamental part of MongoDB's data model and provide the flexibility needed for many different types of applications.

### MongoDB setup & Atlas
MongoDB Atlas is a fully-managed cloud database service provided by MongoDB. It offers a variety of features such as automatic scaling, backups, and security controls, making it a popular choice for developers who want to deploy MongoDB databases without the overhead of managing the infrastructure themselves.

Here's a step-by-step guide to setting up MongoDB Atlas and connecting to it from a Node.js application:

### Setting Up MongoDB Atlas

1. **Create an Account**: Go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas) and sign up for a new account or log in if you already have one.

2. **Create a New Project**: Once logged in, create a new project by clicking on the "New Project" button.

3. **Create a New Cluster**: Within your project, create a new cluster by clicking on the "Build a Cluster" button. You can choose between a free tier (M0 Sandbox) or a paid tier based on your needs.

4. **Configure Cluster**: During the cluster creation process, you can configure various settings such as the cloud provider, region, and additional features like backups and monitoring.

5. **Create a Database User**: Before you can connect to your cluster, you need to create a database user with the necessary permissions. Go to the "Database Access" section and add a new user.

6. **Whitelist IP Address**: To connect to your cluster, you need to whitelist your IP address. Go to the "Network Access" section and add your current IP address or allow access from anywhere (not recommended for production).

7. **Connect to Your Cluster**: Once your cluster is set up and your IP address is whitelisted, you can connect to it. Click on the "Connect" button on your cluster's overview page.

8. **Choose a Connection Method**: You can connect to your cluster using the MongoDB shell, MongoDB Compass, or by connecting through an application. For a Node.js application, you'll want to choose the "Connect Your Application" option.

9. **Get the Connection String**: You'll be provided with a connection string that includes the username, password, and host information. Make sure to replace `<password>` with the actual password of the database user you created.

### Connecting to MongoDB Atlas from a Node.js Application

To connect to MongoDB Atlas from a Node.js application, you'll need the MongoDB Node.js driver. Here's how you can install it and use it to connect to your MongoDB Atlas cluster:

1. **Install the MongoDB Driver**: Run the following command in your Node.js project directory to install the MongoDB driver:

   ```sh
   npm install mongodb
   ```

2. **Use the Connection String**: Use the connection string provided by MongoDB Atlas in your Node.js application to connect to the database.

Here's an example of how to connect to MongoDB Atlas using the MongoDB Node.js driver:

```javascript
const MongoClient = require('mongodb').MongoClient;

// Replace the following with your Atlas connection string
const uri = 'mongodb+srv://username:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Use connect method to connect to the server
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected successfully to server");

  const db = client.db('test');

  // Perform operations on the collection
  const collection = db.collection('documents');
  // ...

  client.close();
});
```

Make sure to replace `username`, `<password>`, and `myFirstDatabase` with the actual username, password, and database name from your MongoDB Atlas cluster.

By following these steps, you can set up a MongoDB Atlas cluster and connect to it from your Node.js application. Remember to keep your connection string secure and not to expose it in your code or version control system.

### Connect to Atlas with mongose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data and includes built-in type casting, validation, query building, and business logic hooks.

To connect to MongoDB Atlas using Mongoose, you'll need to follow these steps:

1. **Install Mongoose**: First, you need to install Mongoose in your Node.js project. You can do this using npm:

   ```sh
   npm install mongoose
   ```

2. **Get the Connection String**: Log in to your MongoDB Atlas account and navigate to your cluster. Click on the "Connect" button, then choose "Connect Your Application." You'll be provided with a connection string that includes the username, password, and host information. Make sure to replace `<password>` with the actual password of the database user you created.

3. **Connect to MongoDB Atlas**: Use the connection string to connect to MongoDB Atlas from your Node.js application using Mongoose.

Here's an example of how to connect to MongoDB Atlas using Mongoose:

```javascript
const mongoose = require('mongoose');

// Replace the following with your Atlas connection string
const uri = 'mongodb+srv://username:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define a schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// Now you can use the User model to interact with the 'users' collection in MongoDB
```

Make sure to replace `username`, `<password>`, and `myFirstDatabase` with the actual username, password, and database name from your MongoDB Atlas cluster.

By using Mongoose, you can define schemas for your collections, which allows you to take advantage of Mongoose's features such as validation, middleware, and query building.

Remember to keep your connection string secure and not to expose it in your code or version control system. It's a good practice to use environment variables to store sensitive information like your database connection string.

### Mongoose, Models & Schemas
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data. A Mongoose model is a constructor compiled from a Schema definition. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

Here's a breakdown of how Mongoose models and schemas work:

### Schemas

A Mongoose schema defines the structure of documents within a collection. It maps to a MongoDB collection and defines the shape of the documents within that collection. A schema can be defined using the `Schema` constructor provided by Mongoose.

Here's an example of defining a schema:

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
```

In this example, we define a `userSchema` with three fields: `name`, `email`, and `password`. Each field has a type and some fields have additional properties like `required` and `unique`.

### Models

Once you have defined a schema, you can create a model from it. A model is a constructor that you define and it represents a collection in the database. You can use models to create, read, update, and delete documents in the collection.

Here's an example of creating a model from a schema:

```javascript
const User = mongoose.model('User', userSchema);
```

In this example, we create a `User` model from the `userSchema`. The first argument to `mongoose.model()` is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name in the MongoDB database.

### Using Models

Once you have a model, you can use it to interact with the database. Here are some examples of how to use a Mongoose model:

```javascript
// Create a new user
const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: 'secret' });
newUser.save(function(err) {
  if (err) return handleError(err);
  // saved!
});

// Find a user by email
User.findOne({ email: 'john@example.com' }, function(err, user) {
  if (err) return handleError(err);
  console.log(user);
});

// Update a user's name
User.updateOne({ email: 'john@example.com' }, { name: 'Jane Doe' }, function(err, res) {
  if (err) return handleError(err);
  console.log(res);
});

// Delete a user
User.deleteOne({ email: 'john@example.com' }, function(err) {
  if (err) return handleError(err);
  // deleted!
});
```

In these examples, we're using the `User` model to create a new user, find a user by email, update a user's name, and delete a user.

Mongoose models provide a powerful interface for interacting with your MongoDB database. They allow you to define the structure of your data, enforce validation, and perform complex queries and updates.
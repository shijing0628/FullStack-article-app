import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'
import path from 'path'

// const articlesInfo = {
//  'learn-react': {
//   upvotes: 0,
//   comments: [],
//  },
//  'learn-CSS': {
//   upvotes: 0,
//   comments: [],
//  }, 'learn-JS': {
//   upvotes: 0,
//   comments: [],
//  }
// }

const app = express();
//launch this app
app.use(express.static(path.join(__dirname, 'build')))
//launch this app end
app.use(bodyParser.json())

const withDB = async (operations) => {
 try {
  const url =
   `mongodb+srv://root:Password0@cluster0.eenp7.mongodb.net/my-blog?retryWrites=true&w=majority`
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = client.db('my-blog');
  await operations(db);
  client.close();
 } catch (error) {
  res.status(500).json({ message: "error connect to DB", error });
 }
}

app.get('/api/articles/:name', async (req, res) => {
 withDB(async (db) => {
  const articleName = req.params.name;
  const articleInfo = await db.collection('articles').findOne({ name: articleName })
  res.status(200).json(articleInfo);
 }, res)

})

// like feature
app.post('/api/articles/:name/upvote', async (req, res) => {
 withDB(async (db) => {
  const articleName = req.params.name;
  const articleInfo = await db.collection('articles').findOne({ name: articleName });

  await db.collection('articles').updateOne(
   { name: articleName },
   {
    '$set': {
     upvote: articleInfo.upvote + 1,
    }
   }
  );
  const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
  res.status(200).json(updatedArticleInfo);
 }, res)
})

app.post('/api/articles/:name/add-comment', (req, res) => {
 const { username, text } = req.body;
 const articleName = req.params.name;

 withDB(async (db) => {
  const articleInfo = await db.collection('articles').findOne({ name: articleName });

  await db.collection('articles').updateOne(
   { name: articleName },
   {
    '$set': {
     comments: articleInfo.comments.concat({ username, text }),
    }
   }
  );
  const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

  console.log(updatedArticleInfo)
  res.status(200).json(updatedArticleInfo);
 }, res)

})

//launch this app
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname + '/build/index.html'));
})
//end launch this app

app.listen(8000, () => console.log('listening 8000'));
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BLOGTABLE_ARN
	STORAGE_BLOGTABLE_NAME
	STORAGE_BLOGTABLE_STREAMARN
Amplify Params - DO NOT EDIT */const express = require('express');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  QueryCommand,
} = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const TABLE_NAME = process.env.STORAGE_BLOGTABLE_NAME || 'BlogPosts';
const API_SECRET = process.env.BLOG_API_SECRET; // set this in Amplify env vars

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// ─── Auth middleware for write operations ────────────────────────────────────
function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!API_SECRET || key !== API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ─── GET /posts — list all posts (newest first) ──────────────────────────────
app.get('/posts', async (req, res) => {
  try {
    const { limit = '20', lastKey } = req.query;

    const params = {
      TableName: TABLE_NAME,
      Limit: parseInt(limit),
    };

    if (lastKey) {
      params.ExclusiveStartKey = JSON.parse(
        Buffer.from(lastKey, 'base64').toString('utf8')
      );
    }

    const result = await docClient.send(new ScanCommand(params));

    // Sort by publishedAt descending
    const items = (result.Items || []).sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    const response = { posts: items };

    if (result.LastEvaluatedKey) {
      response.nextKey = Buffer.from(
        JSON.stringify(result.LastEvaluatedKey)
      ).toString('base64');
    }

    res.json(response);
  } catch (err) {
    console.error('GET /posts error:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// ─── GET /posts/:id — get a single post ──────────────────────────────────────
app.get('/posts/:id', async (req, res) => {
  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: req.params.id },
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.Item);
  } catch (err) {
    console.error('GET /posts/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// ─── POST /posts — create a new post (n8n will call this) ────────────────────
app.post('/posts', requireApiKey, async (req, res) => {
  try {
    const {
      title,
      summary,
      sourceUrl,
      sourceName,
      publishedAt,
      tags,
      imageUrl,
    } = req.body;

    if (!title || !summary || !sourceUrl) {
      return res.status(400).json({ error: 'title, summary, and sourceUrl are required' });
    }

    const post = {
      id: uuidv4(),
      title,
      summary,
      sourceUrl,
      sourceName: sourceName || '',
      publishedAt: publishedAt || new Date().toISOString(),
      tags: tags || [],
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: post,
      })
    );

    res.status(201).json(post);
  } catch (err) {
    console.error('POST /posts error:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/posts/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
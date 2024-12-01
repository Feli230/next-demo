//POST /api/new-meetup

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        try {
            const client = await MongoClient.connect(
                'mongodb+srv://kun:mFdoym4mMrK9bD5u@cluster0.jl7re.mongodb.net/meetups?retryWrites=true&w=majority'
            )
            const db = client.db();
     
            const meetupsCollection = db.collection('meetups');
     
            const result = await meetupsCollection.insertOne(data);
     
            console.log(result);
            
            client.close();
     
            res.status(201).json({message: 'Meetup Inserted!'});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ 
                message: 'Oops! Something went wrong.', 
                error: error.message 
            });
        }
    };
}
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://pashamalyshkin2003:p29082003@clusternextdemo.em1ct5b.mongodb.net/?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup" });
  }
}

export default handler;

import { MongoClient, ObjectId } from "mongodb";
import classes from "./index.module.css";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <section className={classes.detail}>
        <img src={props.meetupData.image} alt={props.meetupData.title} />
        <h1>{props.meetupData.title}</h1>
        <address>{props.meetupData.address}</address>
        <p>{props.meetupData.description}</p>
      </section>
    </>
  );
}
export async function getStaticPaths() {
  const uri =
    "mongodb+srv://pashamalyshkin2003:p29082003@clusternextdemo.em1ct5b.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { id: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const id = context.params.id;

  const uri =
    "mongodb+srv://pashamalyshkin2003:p29082003@clusternextdemo.em1ct5b.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(id),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;

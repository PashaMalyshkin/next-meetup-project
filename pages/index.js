import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="You can see and add my meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const uri =
    "mongodb+srv://pashamalyshkin2003:p29082003@clusternextdemo.em1ct5b.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

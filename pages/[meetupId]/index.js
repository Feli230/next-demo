import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetailsPage(props) {
    return ( 
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta 
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetails 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
        
     );
};

export async function getStaticPaths() {

    const client = await MongoClient.connect(
        'mongodb+srv://kun:mFdoym4mMrK9bD5u@cluster0.jl7re.mongodb.net/meetups?retryWrites=true&w=majority'
    )
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    // find({}, { _id:1 }) we passed empty object {} cause we have no criteria means we need all the objects in the db

    return {
        fallback: false,// it allows to generate some pages for the ids. true false 2 values jab false ho to 404 error dega agar m3 ko visit karoge kyun k niche humne add nai kiya wa, aur id ka mtbl hume sirf id chaiye
        paths: meetups.map(meetup => ({ params: {meetupId : meetup._id.toString()} }))
    }
}

export async function getStaticProps(context) {
    // fetch api response
    
    // then
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://kun:mFdoym4mMrK9bD5u@cluster0.jl7re.mongodb.net/meetups?retryWrites=true&w=majority'
    )
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetups = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

    client.close();

    // console.log(meetupId);
    
    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                description: selectedMeetups.description,
                image: selectedMeetups.image
            }
        }
    }
}

export default MeetupDetailsPage;
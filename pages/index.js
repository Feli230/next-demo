import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
    return ( 
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
     );
    }
    
export async function getStaticProps() {
    // getch data from API

    const client = await MongoClient.connect(
        'mongodb+srv://kun:mFdoym4mMrK9bD5u@cluster0.jl7re.mongodb.net/meetups?retryWrites=true&w=majority'
    )
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();// toArray() this is to get back an array of documents

    client.close();
    return {
        props: {
            meetups: meetups.map((meet) => ({
                    id: meet._id.toString(),
                    title: meet.title,
                    image: meet.image,
                    address: meet.address,
            })
            )
        },
        revalidate: 1
    }
}

export default HomePage;

// export async function getServerSideProps(context) {
//     // getch data from API
//     // u get request and response object in the context

//     const req = context.req;
//     const res = context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
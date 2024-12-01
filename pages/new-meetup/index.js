import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(meetData) {
        
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);
        
        router.push('/');
    };
    return ( 
        <Fragment>
            <Head>
                <title>Add a New Meetups</title>
                <meta 
                    name="description"
                    content="Add your own meetups and create amazing opportunities"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
     );
}

export default NewMeetupPage;
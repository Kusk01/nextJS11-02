import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enteredMeetupData)
        });

        const data = await response.json();

        console.log(data)

        router.push("/")
    }


    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    );
}



export default NewMeetup;
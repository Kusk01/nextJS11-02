import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import MeetupList from '../components/meetups/MeetupList';


// const DUMMY_MEETUP = [
//     {
//         id: 'm1',
//         title: 'First Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Poland-00808_-_Castle_Square_%2831215382745%29.jpg/1280px-Poland-00808_-_Castle_Square_%2831215382745%29.jpg',
//         address: 'Warsaw',
//         description: "First Meetup description"
//     },
//     {
//         id: 'm2',
//         title: 'Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Wilan%C3%B3w_Palace.jpg/1920px-Wilan%C3%B3w_Palace.jpg',
//         address: 'Krakow',
//         description: "Second Meetup description"
//     }
// ];


function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     // send an http request and fetch data
    //     setLoadedMeetups(DUMMY_MEETUP);

    // }, []);

    return (
        <Fragment>
            <Head>
                <title>React meetups</title>
                <meta name='description'
                 content='Browse a huge list of highly active React meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         },
//     };
// }

export async function getStaticProps() {
    // fetch data from an API

    const client = await MongoClient.connect("mongodb+srv://test:zLb58FzEFgEw8HYr@cluster0.kqcvgj4.mongodb.net/?retryWrites=true&w=majority");

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map( meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
};

export default HomePage;
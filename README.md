# lisa

## About

Lisa is an Express application designed for entities in the hospitality industry to share their experiences with their less-than-savory guests. Staff members can make accounts, create forums for a certain guest, and comment their experiences in the forums.

The impetus for this app is not the negative experience borne of subpar customer service, but of self-induced negativity from the guest (the guest that looks for any reason to have a negative experience and lash out at staff). Having worked in hospitality, this is an app I wish I had while on the job.

## Cool features

Create, update, and delete entries relating to a guest who is also stored in the PMS used by the resort/hotel. Note, this app does not connect to any third-party API containing guest data.

Create user accounts and comment on these entries. Comments include user's name, comment, an image, and timestamps. Users can edit and delete their comments as well!

## Technologies

The app is a fullstack app running on Node.js with MongoDB as the database. Express.js and Mongoose.js are used to organize the code and thought process; EJS serves the views.

Datetime display is happily powered by Moment.js because the native Date object in JS => (╯°_°）╯︵ ┻━┻

Bootstrap and some jQuery helpers are used for CSS. 

## What's next

Give users the ability to upload an image to use as their profile picture.

Allow users to reply to other users' comments.

Add permissions to regular users and create superusers that have the most broad permissions.

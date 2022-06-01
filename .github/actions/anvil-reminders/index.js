const { context } = require('@actions/github')

console.log(context.payload);

const anvilBotUser = 'kml';
const eventPayload = context.payload
const commentAuthor = eventPayload.comment.user.login

if (commentAuthor == anvilBotUser) {
  if ( eventPayload.comment.body.match(/^\s*-\s{1,4}\[ \]/) ) {
    console.log('Unchecked item in comment made by kml.')
  } else {
    console.log('No unchecked comment in the comment made by kml.')
  }

}
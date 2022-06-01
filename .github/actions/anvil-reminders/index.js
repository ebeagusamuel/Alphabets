import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'

console.log(context.payload)

const githubToken = core.getInput('token')
const octokit = getOctokit(githubToken)
const anvilBotUsers = ['kml']
const regex = /^\s*-\s{1,4}\[ \]/
const eventPayload = context.payload
const { owner, repo, number } = context.issue
const commentAuthor = eventPayload.comment.user.login
const prHeadSha = eventPayload.comment.pull_request.head.sha
const statusContext = 'Anvil Reminders'
const successDescription = 'Good to go! No unchecked item found in anvil reminders comment.'
const failureDescription = 'Please check unfinished items in the anvil reminders comment(s).'


const commentsCheckSuccessful = () => !eventPayload.comment.body.match(regex) && extraCommentsCheck()
const extraCommentsCheck = () => {
  const response = octokit.rest.pulls.listReviewCommentsForRepo({
    owner,
    repo,
    number
  })
  const reviewCommentsFromAnvil = response.filter( commentObject => {
    if (anvilBotUsers.includes(commentObject.user.login)) {
      return true
    } else {
      return false
    }
  }).map(commentObject => commentObject.body)

  return reviewCommentsFromAnvil.every(comment => !comment.match(regex))
}

const setStatus = (status, description) => {
  octokit.rest.repos.createCommitStatus({
    owner,
    repo,
    sha: prHeadSha,
    state: status,
    description: description,
    context: statusContext
  })
}

if (anvilBotUsers.includes(commentAuthor)) {
  if(commentsCheckSuccessful()) {
    setStatus('success', successDescription)
  }else {
    setStatus('failure', failureDescription)
  }
} else {
  setStatus('success', successDescription)
}
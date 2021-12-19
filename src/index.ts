import { Probot } from "probot";
import { createScheduler } from "probot/sc"

export = (app: Probot) => {

  app.sc

  app.on("pull_request.opened", async (context) => {
    console.log('[Pull Request Opened]');
    await context.octokit.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: context.payload.pull_request.number,
      body: 'Thanks for opening this PR!',
    });
  });

  app.on("pull_request.closed", async (context) => {
    console.log('[Pull Request Closed]', context.payload);
  });

  app.on("issues.opened", async (context) => {
    console.log('[issues.opened]', context.payload);
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });

  
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {

    constructor(){}

    onStar( payload: GitHubStarPayload ): string {

        let message: string = '';

        const { action, sender, repository, starred_at } = payload;

        if( starred_at ){
            message = `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`;
        } else {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`
        }

        return message;
    }

    onIssue( payload: GitHubIssuePayload ): string {

        let message: string = `Unhandled action for the issue event ${payload.action}`;

        const { action, sender, repository, issue } = payload;

        if( action === 'opened'){
            message = `User ${sender.login} ${action} issue on ${repository.full_name} with title ${issue.title}`;
        }

        if( action === 'closed'){
            message = `User ${sender.login} ${action} issue on ${repository.full_name} with title ${issue.title}`;
        }

        if( action === 'reopened'){
            message = `User ${sender.login} ${action} issue on ${repository.full_name} with title ${issue.title}`;
        }
    
        return message;
    }
}
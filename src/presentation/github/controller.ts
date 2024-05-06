import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";


export class GithubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ){}

    webhookHandler = (req: Request, res: Response) => {

        // Cuando tiene una x es un header personalizado
        const githubEvent = req.header('x-github-event') ?? 'unknown'; 
        // const signature = req.header('x-hub-signature-256') ?? 'unknown'; 
        const payload = req.body;

        // console.log(`Received event ${githubEvent}`);
        // console.log(`Received signature ${signature}`);        

        let message:string = '';

        switch( githubEvent ){
            case 'star':
                message = this.githubService.onStar( payload );
            break;
            case 'issues':
                message = this.githubService.onIssue( payload );
            break;

            default:
                console.log(`Event ${githubEvent} not supported`);
        }

        this.discordService.notify(message)
            .then( () => res.status(202).send("Accepted"))
            .catch( () => res.status(500).send("Internal Server Error"));
    }
}
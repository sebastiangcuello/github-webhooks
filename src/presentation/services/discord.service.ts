import { Envs } from "../../config";

export class DiscordService {

    private readonly discordWebhookUrl = Envs.DISCORD_WEBHOOK_URL;

    constructor(){}

    async notify( message: string ){

        const body = {
            content: message,
            embeds: [
                {
                    image: { url: 'https://media.giphy.com/media/WzR8zb0PN6bUmfz4DW/giphy.gif' }
                }
            ]
        };

        const response = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        });

        if( !response ){
            console.log( 'Error sending message to Discord' );
            return false;
        }

        return true;

    }

}
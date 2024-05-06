import express from 'express';
import { Envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';

(() => {

main();

})();

function main() {

    const app = express();
    const controller = new GithubController();

    app.use( express.json() );

    app.use( GithubSha256Middleware.verifySignature );

    app.post('/api/github', controller.webhookHandler );

    app.listen( Envs.PORT, () => {

        console.log(`Server listening on port ${Envs.PORT}`);

    });


}
import * as express from 'express';
const routes = express.Router();

import { BaseApiError } from '../Types/ApiErrorTypes';
import gitHubController from '../Components/GitHub';

/**
 * @openapi
 * /github/repo/{owner}/{repo}/pulls:
 *  get:
 *    description: Gets all open pull requests associated with a GitHub repository
 *    parameters:
 *      - in: path
 *        name: owner
 *        required: true
 *        description: The username of the owner of the Github repository
 *      - in: path
 *        name: repo
 *        required: true
 *        description: The name of the GitHub repository
 *    responses:
 *      200:
 *        description: Array of pull requests
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: The pull request ID
 *                    example: 122352
 *                  number:
 *                    type: integer
 *                    description: The pull request number
 *                    example: 33
 *                  title:
 *                    type: string
 *                    description: The title of the pull request
 *                    example: Add user signup flow
 *                  author:
 *                    type: string
 *                    description: The author of the pull request
 *                    example: patrickmc21
 *                  commit_count:
 *                    type: integer
 *                    description: The number of commits in the pull request
 *                    example: 50
 *      404:
 *        description: Resource not found
 *      500:
 *        description: Internal server error
 *      502:
 *        description: Bad gateway
 */
routes.get('/repo/:owner/:repo/pulls', async (req, res) => {
  const { owner, repo } = req.params;

  try {
    const pullRequests = await gitHubController.getOpenPullRequestsByRepo(owner, repo);
    return res.status(200).json(pullRequests);
  } catch (error) {
    if (error instanceof BaseApiError) {
      return res.status(error.status).json(error);
    }
    return res.status(500).json(error);
  }
});

export default routes;

import express from "express"

interface RepoInfo {
    name: string
    stargazers_count: number
	html_url: string
}


const port = 3000;
const app = express();

import fs from 'fs';

app.use(express.json());

app.post('/gh_user_repos', async (req: any, res: any) => {
    const { username } = req.body;
    if (!username) {
        return res.status(422).json({
            payload: { github_username: username },
            message: "GitHub username not provided."
        })
    }
    const ret = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!ret.ok) {
        return res.status(500).json({
            payload: { github_username: username },
            message: "Error fetching user repositories from GitHub"
        });
    }
    if (ret.ok) {
        const json: RepoInfo[] = await ret.json();
        const repositoriesInfo: RepoInfo[] = json.map(repo => ({
            name: repo.name,
            stargazers_count: repo.stargazers_count,
            html_url: repo.html_url,
        }));
        let existingData: any = {};
        try {
                existingData = JSON.parse(fs.readFileSync('repositories.json', 'utf-8'));
        } catch (error) {
            console.log("Error reading JSON file:", error);
        }
        existingData[username] = repositoriesInfo;
        fs.writeFileSync('repositories.json', JSON.stringify(existingData, null, 2));
        return res.status(201).json({
            payload: { github_username: username },
            message: "Request created"
        });
    }
});

app.get('/gh_user_repos/:user', async (req: any, res: any) => {
    const user = req.params.user;
    try
    {
        const repository = JSON.parse(fs.readFileSync('repositories.json', 'utf-8'));
        const repos = {
            repos:repository[user]
            };
        if (!repository[user])
        {
            return res.status(500).json({
                payload: { github_username: user },
                message: "Error, user was not found"
            })
        }
        return (res.status(200).json({
            repos: repository[user]
        }))
    }
    catch (error)
    {
        return res.status(500).json({
            payload: { github_username: user },
            message: "Error fetching user repositories from GitHub"
        });
    }
});

app.get('/gh_user_repos/', async (req: any, res: any) => {
    const user = req.params.user;
    if (!user)
    {
        return res.status(422).json({
        payload: { github_username: user },
        message: "GitHub username not provided."
        })
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
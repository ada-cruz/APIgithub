"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
app.use(express_1.default.json());
app.post('/gh_user_repos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        return res.status(422).json({
            payload: { github_username: username },
            message: "GitHub username not provided."
        });
    }
    const ret = yield fetch(`https://api.github.com/users/${username}/repos`);
    if (!ret.ok) {
        return res.status(500).json({
            payload: { github_username: username },
            message: "Error fetching user repositories from GitHub"
        });
    }
    if (ret.ok) {
        const json = yield ret.json();
        const repositoriesInfo = json.map(repo => ({
            name: repo.name,
            stargazers_count: repo.stargazers_count,
            html_url: repo.html_url,
        }));
        let existingData = {};
        try {
            existingData = JSON.parse(fs_1.default.readFileSync('repositories.json', 'utf-8'));
        }
        catch (error) {
            console.log("Error reading JSON file:", error);
        }
        existingData[username] = repositoriesInfo;
        fs_1.default.writeFileSync('repositories.json', JSON.stringify(existingData, null, 2));
        return res.status(201).json({
            payload: { github_username: username },
            message: "Request created"
        });
    }
}));
app.get('/gh_user_repos/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.user;
    try {
        const repository = JSON.parse(fs_1.default.readFileSync('repositories.json', 'utf-8'));
        const repos = {
            repos: repository[user]
        };
        if (!repository[user]) {
            return res.status(500).json({
                payload: { github_username: user },
                message: "Error, user was not found"
            });
        }
        return (res.status(200).json({
            repos: repository[user]
        }));
    }
    catch (error) {
        return res.status(500).json({
            payload: { github_username: user },
            message: "Error fetching user repositories from GitHub"
        });
    }
}));
app.get('/gh_user_repos/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.user;
    if (!user) {
        return res.status(422).json({
            payload: { github_username: user },
            message: "GitHub username not provided."
        });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

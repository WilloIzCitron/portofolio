import { Elysia, file } from 'elysia'
import { node } from '@elysiajs/node'
import { html, Html } from '@elysiajs/html'
import { swagger } from '@elysiajs/swagger'
import appCkat from './sites/ckat'
import 'node-fetch'
import bijinDollAPI from './api/bijindoll'
import { Context } from '@netlify/functions'
const fs = require('fs');

const githubAPI = "https://api.github.com/users/WilloIzCitron"
const githubRepoApi = "https://api.github.com/repos/WilloIzCitron/"
var skill = ["Node.JS", "Java", "Python", "TypeScript", "Arduino"] // why do i write it manually? idk man.
const githubRepo = ["ArchiveDustry-Java", "siuuu", "Spin"];
var gitRepoData: { name: string; description: string; stars: number; forks: number; repoLink: string }[] = []

export default async (req: Request, con: Context) => {
    const app = new Elysia({ adapter: node() })
    app.use(html())
    app.use(swagger({
        scalarConfig: {
            customCss: `
            * { font-family: "Audiowide"; font-weight: normal; --scalar-font-bold: 500; --scalar-bold: 500;}
            `,
        }
    }))
    appCkat(app)
    app.get('/', () => {return file('public/portofolio.json')})
    bijinDollAPI(app)
        app.listen(process.env.PORT || 3000, ({ hostname, port }) => {
            console.log(`🌸🌸 Elysia Unified Server is running on http://${(hostname=="::") ? "localhost" : hostname}:${port}`)
            fetchGitHubData();
        })
        
        async function fetchGitHubData() {
        for (const repo of githubRepo) {
            const res1 = await fetch(githubRepoApi + repo, {
            method: "GET",
            headers: {
                "Authorization": `${process.env.GITHUB_TOKEN}`
            }
            });
            const json1 = await res1.json();
            try {
            gitRepoData.push({
                name: json1.name,
                description: json1.description,
                stars: json1.stargazers_count,
                forks: json1.forks,
                repoLink: json1.html_url
            });
            } catch (error) {
            console.log("Error: " + error);
            }
        }
        try {
            const res = await fetch(githubAPI, {
            method: "GET",
            headers: {
                "Authorization": `${process.env.GITHUB_TOKEN}`
            }
            });
        
            if (!res.ok) {
            if (res.status == 403) throw new Error("GitHub API rate limit exceeded");
            throw new Error("GitHub API is down/errored/no token provided "+res.status);
            }
        
            const json = await res.json();
        
            const result = {
            name: `${json.name} (${json.login})`,
            bio: json.bio,
            skills: skill,
            location: json.location,
            company: json.company,
            followers: json.followers,
            following: json.following,
            projects: gitRepoData,
            api: "go to /swagger to see the API documentation"
            };

            fs.writeFileSync('public/portofolio.json', JSON.stringify(result, null, 2));
        } catch (error) {
            console.log("Error: " + error.message);
        }
        }
    console.log("Done!")
};
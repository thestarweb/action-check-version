import * as core from '@actions/core';
import * as github from "@actions/github";
// import { GitHub } from "@actions/github";


export default async function run(){
	const octokit = github.getOctokit(process.env.GITHUB_TOKEN as string);

	const res = await octokit.repos.getLatestRelease(github.context.repo);
	core.setOutput("last", res.data.name);
}

//octokit.request({method:"get",url:""}).then(res)
// core.
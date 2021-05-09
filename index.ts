import * as core from '@actions/core';
import * as github from "@actions/github";
import * as fs from "fs";
import * as path from "path";


const octokit = github.getOctokit(process.env.GITHUB_TOKEN as string);
let last = "";
try{
	const res = await octokit.repos.getLatestRelease(github.context.repo);
	last = res.data.tag_name as string;
	core.setOutput("last", last);
}catch(e){
	core.error(e)
}
try{
	const fileData = fs.readFileSync(path.join(core.getInput('path'), "package.json"), "utf8");

	const j=JSON.parse(fileData);

	core.setOutput("current", j.version);
	core.setOutput("change", last == j.version ? 0 : 1);
}catch(e){
	core.error(e);
}
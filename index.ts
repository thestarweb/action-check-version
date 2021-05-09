import * as core from '@actions/core';
import * as github from "@actions/github";
import * as fs from "fs";
import * as path from "path";


const octokit = github.getOctokit(process.env.GITHUB_TOKEN as string);

const res = await octokit.repos.getLatestRelease(github.context.repo);
core.setOutput("last", res.data.name);
const package_patch = path.join(core.getInput("path"), "package.json");
core.info(package_patch);
core.info(process.cwd());
core.info(path.resolve("./"));
fs.readdir(path.dirname(package_patch),(error,files)=>{
	if(error){
		core.info(error.message);
	}else{
		files.forEach(f=>core.info(f))
	}
});
try{
	const fileData = fs.readFileSync(package_patch, "utf8");

	const j=JSON.parse(fileData);

	core.setOutput("current", j.version);


	core.setOutput("change", res.data.name == j.version ? 0 : 1);
}catch(e){}
import * as core from '@actions/core';
import * as github from "@actions/github";
import * as fs from "fs";
import * as path from "path";


const octokit = github.getOctokit(process.env.GITHUB_TOKEN as string);

const res = await octokit.repos.getLatestRelease(github.context.repo);
core.setOutput("last", res.data.name);

const fileData = fs.readFileSync(path.join(core.getInput('path')||"./", "package.json"), "utf8");

const j=JSON.parse(fileData);

core.setOutput("current", j.version);


core.setOutput("change", res.data.name == j.version ? 0 : 1);
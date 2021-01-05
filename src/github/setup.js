const dotenv = require('dotenv').config();
const { Octokit } = require('@octokit/core');
const { wait } = require('../tools/wait');

let octokit = undefined;

async function connectGithub() {
  octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  await wait();
}

function getOctokit() {
  return octokit;
}

module.exports = { getOctokit, connectGithub };

# Sync To Todoist

## Why

Need to bring Jira and Github issues to Todoist to manage everything in one convenient place.

## Requirements

Some of the elements (like column names) are hardcoded, but can be easily found and changed in ```config.js```. Sensitive information is required to be put in `.env` file with the following data:

```shell
JIRA_HOST=xxxxx
JIRA_BOARD=xxxxx
JIRA_USERNAME=xxxxx
JIRA_PASSWORD=xxxxx (token)
GITHUB_TOKEN=xxxxx
GITHUB_ORG=xxxxx
GITHUB_I_AM=xxxxx (github user name, not email)
GITHUB_IGNORE_PROJECTS_IDS=xxxxx;xxxxx;xxxxx
GITHUB_TODOIST_PRJ_MATCH=xxxxx:xxxxx;xxxxx:xxxxx;xxxxx:xxxxx
GITHUB_TODOIST_LABELS_MATCH=xxxxx:xxxxx;xxxxx:xxxxx;
TODOIST_API_TOKEN=xxxxx
TODOIST_PROJECT_ID=xxxxx
TODOIST_SECTION_ID=xxxxx
TODOIST_JIRA_LABEL_ID=xxxxx
TODOIST_GITHUB_LABEL_ID=xxxxx
```

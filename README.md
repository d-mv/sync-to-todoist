# Jira Issues to Todoist Sync

## Why

Need to bring Jira issues to Todoist to manage everything in one convenient place.

## Requirements

Some of the elements (like Jira board ID and status names) are hardcoded, but can be easily found and changed. Sensitive information is required to be put in `.env` file with the following data:

```shell
JIRA_HOST=xxxxx
JIRA_USERNAME=xxxxx
JIRA_PASSWORD=xxxxx (token)
TODOIST_API_TOKEN=xxxxx
TODOIST_PROJECT_ID=xxxxx
TODOIST_SECTION_ID=xxxxx
TODOIST_LABEL_ID=xxxxx
```

exports.routes = {
    "servers": "/servers",
    "cronjobs": "/cronjobs",
    "deploycronjobs": "/deploycronjobs",
    "cronjobsstatus": "/cronjobsstatus",
    "slack": "/slack",
    "servers_api": {
        "add": "/servers/add",
        "update": "/servers/update",
        "remove": "/servers/remove",
        "list": "/servers/list"
    },
    "cronjobs_api": {
        "add": "/cronjobs/add",
        "update": "/cronjobs/update",
        "remove": "/cronjobs/remove",
        "list": "/cronjobs/list"
    },
    "deploycronjobs_api": {
        "add": "/deploycronjobs/add",
        "update": "/deploycronjobs/update",
        "remove": "/deploycronjobs/remove",
        "list": "/deploycronjobs/list"
    },
    "cronjobsstatus_api": {
        "add": "/cronjobsstatus/add",
        "update": "/cronjobsstatus/update",
        "remove": "/cronjobsstatus/remove",
        "list": "/cronjobsstatus/list",
        "listener": "/cronjobsstatus/listener"
    },
    "slack_api": {
        "add": "/slack/add",
        "update": "/slack/update",
        "remove": "/slack/remove",
        "list": "/slack/list"
    },
    "crontabhook": {
        "complete": "/crontabhook/complete"
    }

};

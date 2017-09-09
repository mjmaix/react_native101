
## Setup firebase credentials on

create `functions/service_account.json`

## Setup twilio credentials

1. `cd functions`

2. Setup twilio config variables
```
firebase --project <project-name> functions:config:get > .runtimeconfig.json
```

or

```
firebase --project <project-name> functions:config:set twilio.account_sid="<account_sid>" twilio.auth_token="<auth_token>" twilio.own_number="<number>"
```

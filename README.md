# How to run

### 1st terminal: compile contract and start hardhat local eth

```shell
yarn run dc
yarn run dn
```

### 2nd terminal: start API

```shell
export ETH_PRIVKEY=use_one_you_saw_calling_yarn_run_dc 
yarn run start
```

### 3rd termal: call API

```shell
curl -X POST http://localhost:3000/lock/deploy -d "unlockTime=$(( $(date +"%s") + 60 ))&value=7"
echo created new lock
```

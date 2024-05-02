## How to kill a process in ubuntu
```bash
➜  ~ sudo kill -9 $(sudo lsof -t -i:$PORT)
```
> $PORT must be replaced with the port number you want to kill


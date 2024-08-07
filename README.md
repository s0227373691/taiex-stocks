### Server

Install package:
```shell
cd ./server-side/nodejs
pnpm install 
```

ENV config:
```env
PORT = 8555

DB_NAME = MongoDB name
DB_USERNAME = MongoDB username
DB_PASSWORD = MongoDB password

API_KEY = Crypto exchange apikey
SECRET = Crypto exchange secret

FUGLE_API_KEY = Fugle apikey
```

Run the development server:
```shell
pnpm run dev
```



### Web Client

Install package:
```shell
cd ./web
pnpm install 
```

ENV config:
```env
NEXT_PUBLIC_API_SERVER_protocal = "http:"
NEXT_PUBLIC_API_SERVER_HOST = "127.0.0.1"
NEXT_PUBLIC_API_SERVER_PORT = "8555"
```

Run the development server:
```shell
pnpm run dev
```

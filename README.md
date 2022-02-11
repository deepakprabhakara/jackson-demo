# Jackson Demo App

Demo web app that shows how to use [SAML Jackson](https://github.com/boxyhq/jackson)

## Setup Instructions

Follow the below instructions to setup this demo.

### Clone the repo

```
git clone https://github.com/boxyhq/jackson-demo.git
```

```
cd jackson-demo
```

### Install dependencies

```
npm install
```

### Setup environment variables

```
cp .env.example .env
```

Update the `NEXT_PUBLIC_JACKSON_SERVICE` variable in `.env` to point to the Jackson service.

### Start the server

```
npm run dev
```

### Testing

The demo app can be accessed locally using the following URL.

```
http://localhost:3000
```


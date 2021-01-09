# real-world-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Run the API for events with json-server
```
json-server --watch db.json
```
To test the Nprogress bar we can simulate a slower response using the command below
```
json-server -d 1500 db.json
```
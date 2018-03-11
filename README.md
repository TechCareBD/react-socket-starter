# React-Socket-Starter
_simple boilerplate for full-stack real-time apps built with ES6, react, express and socket.io_

See demo here: [http://react-socket-starter-demo.herokuapp.com/](http://react-socket-starter-demo.herokuapp.com/).

##What's included

* ES6 on both Client and Server (via babel)
* React on the client (with react-dom and react-router)
* Express and Socket.io on the server
* npm and gulp set up to get comfortably developing in no time (NB! Livereload is enabled via browser plugin, so you have to install it).
* sass stylesheets and [base](http://getbase.com) for simple sass styling

## Install & start Developing

* `git clone git@github.com:GeorgeStrakhov/react-socket-starter.git`
* `cd react-socket-starter`
* `rm -rf .git` - assuming that you want to have your own repo
* `npm install`
* `npm run dev` - starts dev server with watch and livereload (via [browser plugin](http://livereload.com/), make sure to have it installed).
* open browser [http://localhost:4242](http://localhost:4242) and start developing

## Deploy to Heroku
(remember that free apps on Heroku sleep for at least a few hours a day!)

* install heroku toolbelt
* standard git stuff: `git init && git add -A && git commit -am "init" && git push`
* `heroku create`
* `heroku stack:set cedar-14`
* `heroku features:enable http-session-affinity`
* `npm run deploy`



## TODO (pull requests welcome!)

* enable HMR
* optimize build process: gulp should run incremental builds on watch

# ts-backend
Desarrollo de backend utilizando TypeScrip como Backend
# Instalation
Clonar el proyecto desde el repositorio


<h1 align="center">Ts-BackEnd</h1>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  {{app_name}} 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Istalation</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/{{Jobzi}}" target="_blank">Jobzi</a>
</p>

<br>

## :dart: About ##

Desarrollo de backend utilizando NodeJs con TypeScrip

## :sparkles: Features ##

:heavy_check_mark: Api Rest;\
:heavy_check_mark: Api Rest;\
:heavy_check_mark: Sockect.io;

## :rocket: Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sockect.io](https://socket.io/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Istalation ##

To install and run this proyect just type and execute and nodemon
```bash
sudo npm i -g typescript
sudo npm i -g nodemon
```

Run server
```bash
tsc
node dist/app.js
```

Run Server With nodemon and tsc wacth
```bash
nodemon dist/app.js
tsc --watch
```
## :checkered_flag: Structure ##
```yaml
- /app  
# This is where all the application's directories will be contained  
    - /controller
    # Directory responsible for containing everything related to our data
        - /name
            # This is where we store our controller
            - name.controller.ts
    - /models
        - /db_models
            -usuario.model.ts

        - /core
            - server.ts
    - /routes
        -name.route.ts
- app.ts  
# main file

```
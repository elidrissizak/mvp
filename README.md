# Install

    git clone git@git.renault-digital.com:rrf/rrf-stack.git
    cd rrf-stack
    npm install

# Config file
You will find an exemple configuration file: `./src/assets/configs/config-dev.json`.  

    {
        "name": "configuration name",
        "healthEndpoint": "http://localhost:9090/api/health",
        "authEndpoint": "http://localhost:9090/api/v1/authenticate",
        "apiUrl": "http://localhost:9090/api",
        "oauth": {
            "LOGIN_URL": "http://localhost:8280/auth/realms/rrf/protocol/openid-connect/auth",
            "REDIRECT_URL": "http://localhost:4200/authorized",
            "CLIENT_ID": "client-rrf-frontend",
            "SCOPE": "openid",
            "LOGOUT_URL": ""
        },
        "startWith": "/core/bim-assistant",
        "disableAuthentication": true,
        "mocked": true,
        "autoDisplayLinksModal": false
    }

Rename it to `./src/assets/configs/config.json`.

# Build
    
    ./node_modules/.bin/ng build

# Test
    
    ./node_modules/.bin/ng test

# Test with code coverage

    ./node_modules/.bin/ng test --watch=false --code-coverage

Will generate a code coverage site in `./coverage/index.html` and a `lcov.info` file for Sonar Scanner.

# Sonar Scanner

Excluded from scanner : 
 * `*mock*` because of long lines
 * `*spec.ts` because of code coverage (we do not test the tests !)

Command line: 

    sonar-scanner -Dsonar.projectKey=rrf -Dsonar.sources=./src -Dsonar.exclusions=**/*mock*,**/*spec.ts -Dsonar.typescript.lcov.reportPaths=./coverage/lcov.info

# Documentation

    ./node_modules/.bin/compodoc -p tsconfig.json

Generated doc will be in the `./documentation` folder.

interface AppConstants {
    CONFIG: {
        [hostname: string]: {
            name: string;
            healthEndpoint: string;
            authEndpoint: string;
            apiUrl: string;
            oauth: {
                LOGIN_URL: string;
                REDIRECT_URL: string;
                CLIENT_ID: string;
                SCOPE: string;
                LOGOUT_URL: string;

            }
        }
    }
}

export let APP_CONSTANTS: AppConstants = {
    CONFIG: {
        'rf2.dok-dev.intra.renault.fr': {
            "name": "renault-dev",
            "healthEndpoint": "/api/health",
            "authEndpoint": "/api/v1/authenticate",
            "apiUrl": "/api",
            "oauth": {
                "LOGIN_URL": "https://idp.renault.com/nidp/oauth/nam/authz",
                "REDIRECT_URL": "https://rf2.dok-dev.intra.renault.fr/authorized",
                "CLIENT_ID": "1d18efa3-c214-4b13-ae90-1fa379ad43b5",
                "SCOPE": "openid arca",
                "LOGOUT_URL": ""
            }
        },
        'rf2.dok-re7.intra.renault.fr': {
            "name": "renault-re7",
            "healthEndpoint": "/api/health",
            "authEndpoint": "/api/v1/authenticate",
            "apiUrl": "/api",
            "oauth": {
                "LOGIN_URL": "https://idp.renault.com/nidp/oauth/nam/authz",
                "REDIRECT_URL": "https://rf2.dok-re7.intra.renault.fr/authorized",
                "CLIENT_ID": "c24492b5-6ce2-4fef-aa68-f021297f11c9",
                "SCOPE": "openid arca",
                "LOGOUT_URL": ""
            }
        },
        'rf2.intra.renault.fr': {
            "name": "renault-ope",
            "healthEndpoint": "/api/health",
            "authEndpoint": "/api/v1/authenticate",
            "apiUrl": "/api",
            "oauth": {
                "LOGIN_URL": "https://idp.renault.com/nidp/oauth/nam/authz",
                "REDIRECT_URL": "https://rf2.intra.renault.fr/authorized",
                "CLIENT_ID": "444b61c8-ccbc-4b73-86bf-6cb28c2222e2",
                "SCOPE": "openid arca",
                "LOGOUT_URL": ""
            },
        },
        'rf2.dok.intra.renault.fr': {
            "name": "renault-ope",
            "healthEndpoint": "/api/health",
            "authEndpoint": "/api/v1/authenticate",
            "apiUrl": "/api",
            "oauth": {
                "LOGIN_URL": "https://idp.renault.com/nidp/oauth/nam/authz",
                "REDIRECT_URL": "https://rf2.dok.intra.renault.fr/authorized",
                "CLIENT_ID": "444b61c8-ccbc-4b73-86bf-6cb28c2222e2",
                "SCOPE": "openid arca",
                "LOGOUT_URL": ""
            },
        }
    }
};

// config.js

export const SERVER_TYPES = {
    DOTNET_CORE: 'dotnet_core',
    EXPRESS_JS: 'express_js'
};

export const API_ENDPOINTS = {
    [SERVER_TYPES.DOTNET_CORE]: 'https://localhost:7210/api/', // Adjust port as per your .NET Core Web API
    [SERVER_TYPES.EXPRESS_JS]: 'https://localhost:3000/api/'   // Adjust port as per your Express.js server
};

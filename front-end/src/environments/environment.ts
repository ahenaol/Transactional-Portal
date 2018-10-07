// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth: {
    clientID: '71dc04ab-73ed-4368-863e-4fa1550fe2fb',
    authoritySuSi: 'https://login.microsoftonline.com/tfp/ahenaol.onmicrosoft.com/B2C_1_SiUpIn',
    authorityPR: 'https://login.microsoftonline.com/tfp/ahenaol.onmicrosoft.com/B2C_1_SSPR',
    b2cScopes: ['https://ahenaol.onmicrosoft.com/portal-transaccional/user.read'],
    cacheLocation: 'localStorage'
  }
};

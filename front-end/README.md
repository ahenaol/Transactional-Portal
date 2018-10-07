# Front End

Este componente es el front end del Portal Transaccional. Permite iniciar sesión utilizando una cuenta de Google o una cuenta local, para lo cual utiliza una instancia de Azure AD B2C de Microsoft.

## Cómo empezar

Este componente es un SPA construido con Angular 5 y Bootstrap. Hace uso de Microsoft Authentication Library for Angular para la comunicación con Azure AD B2C.

### Prerrequisitos

Regitrar la aplicación en Azure AD B2C para obtener el clientID:
- [Azure AD B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-tutorials-spa) - Tutorial: Enable single-page app authentication with accounts using Azure Active Directory B2C

### Configurar los parámetros de autenticación

Editar el archivo `enviroments/enviroments.ts` completando los siguiente parámetros con la información adecuada asociada a la configuración de Azure AD B2C:
- `clientID`: es el valor del `Application ID` de la aplicación
- `authoritySuSi`: es la política de `sign-up or sign-in`
- `authorityPR`: es la política de `password reset`
- `b2cScopes`: el/los `scope`
- `cacheLocation`: la ubicación del caché, puede ser `sessionstorage` (valor por defecto) o `localStorage`

Debe quedar algo como esto:
```
  auth: {
    clientID: '71dc04ab-73ed-4368-863e-4fa1550fe2fb',
    authoritySuSi: 'https://login.microsoftonline.com/tfp/ahenaol.onmicrosoft.com/B2C_1_SiUpIn',
    authorityPR: 'https://login.microsoftonline.com/tfp/ahenaol.onmicrosoft.com/B2C_1_SSPR',
    b2cScopes: ['https://ahenaol.onmicrosoft.com/portal-transaccional/user.read'],
    cacheLocation: 'localStorage'
  }
```

### Instalar las dependencias

```
$ npm install
```

### Ejecutar y probar la aplicación

```
$ npm serve -o
```

## Referencias

- [@azure/msal-angular](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/README.md) - Microsoft Authentication Library for Angular

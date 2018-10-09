# Front End

Este componente es el front-end del Portal Transaccional. Permite iniciar sesión utilizando una cuenta de Google o una cuenta local, para lo cual utiliza una instancia de Azure AD B2C de Microsoft. Con la sesión iniciada, permite:
- Navegar entre el Landing Page y el Porfil de Usuario.
- Hacer la consulta del perfil del usuario al servicio expuesto por el BFF (el método está implementado pero no se implementó el llamado a este).
- Cerrar la sesión.

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

### Configurar el proxy
Para consumir los servicios del BFF (https://localhost:5001) usando el CLI, se debe configurar un proxy. Esta configuración se hace en el archivo `proxy.config.json`.

### Instalar las dependencias

```
$ npm install
```

### Ejecutar y probar la aplicación

```
$ ng serve --proxy-config proxy.conf.json -o
```

## Referencias

- [@azure/msal-angular](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/README.md) - Microsoft Authentication Library for Angular
- [Angular - HttpClient](https://angular.io/guide/http) - Guía para el uso de HttpClient
- [Proxy To Backend](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md) - Proxy To Backend en Angular CLI
- [Angular Tutorial](https://angular.io/tutorial) - Tutorial: Tour of Heroes
- [Reactive Forms](https://angular.io/guide/reactive-forms) - Reactive Forms en Angular

# Acceso a Datos del Usuario

Este componente representa un servicio que provee el acceso a los datos personales del perfil de los usuarios. La entidad **User** se mapea contra una tabla en una base de datos con los siguientes campos:
- Email (identificador)
- Nombre
- Tipo de identificación
- Número de identificación
- Departamento
- Ciudad
- Dirección
- Teléfono del hogar
- Teléfono celular

El componete expone un servicio web que permite consultar y agregar/actualizar los datos de un usuario.

## Cómo empezar

Este componente está construido en Java haciendo uso de Maven y Spring, y una base de datos en MySQL.

### Prerrequisitos

Instalar y configurar:
- [Maven](https://maven.apache.org/) - Gestión de dependencias
- [MySQL](https://www.mysql.com/) - Base de datos relacional

### Crear la base de datos

Abrir el cliente MySQL con un usuario que permita crear nuevos usuarios.

Crear una nueva base de datos:
```
mysql> create database user_data;
mysql> create user 'userdataaccess'@'localhost' identified by 'userdataaccesspwd';
mysql> grant all on user_data.* to 'userdataaccess'@'localhost';
```

Se creó la base de datos **userdataaccess** y el usuario **userdataaccess**, con contraseña **userdataaccesspwd**.


### Configurar Hibernate para crear la tabla en la base de datos

En el archivo `src/main/resources/application.properties`, la propiedad `spring.jpa.hibernate.ddl-auto` puede fijarse en `none`, `update`, `create` o `create-drop`.

`none`: no cambia la estructura de la base de datos.
`update`: Hibernate cambia la base de datos de acuerdo con las estructuras dadas por la Entidad.
`create`: crea la base de datos cada vez, pero no la borra al cerrar.
`create-drop`: crea la base de datos y luego la borra cuando se cierra SessionFactory.

Para la primera ejecución se debe fijar la propiedad en `create` debido a que no se tiene todavía creada la estructura. Luego de la primera ejecución, se debe fijar la propiedad en `none`.

**__Como buena práctica de seguridad, al pasar la base de datos a un ambiente de producción se debe fijar la propiedad en `none`, revocar todos los privilegios de MySQL al usuario conectado a la aplicación y luego otorgarle unicamente los permisos de `SELECT`, `UPDATE`, `INSERT` y `DELETE`.__**

### Compilar y empaquetar con Maven

```
$ mvn compile
$ mvn package
```

Esto debe compilar la aplicación y luego generar el archivo `jar` en la carpeta `target`.

### Ejecutar y probar la aplicación

Una forma simple de probar la aplicación es utilizando el soporte embebido que tiene Spring para correr un ambiente de ejecución Tomcat. Esto fue configurado en el archivo `src/main/java/userdataaccess/Application.java`. Simplemente ejecutamos el archivo ´jar´:

```
java -jar target\user-data-access-0.0.1.jar
```

Al ejecutar la aplicación se inicia Tomcat en el pueto 8080. Se puede probar la aplicación con Curl o Postman.

Para crear/actualizar la información del usuario `alejo.catson@gmail.com`:

```
localhost:8080/userdataaccess/add?email=alejo.catson@gmail.com&name=Alejo Catson&idType=CC&idNumber=111222333&birthday=1980-06-28&state=Antioquia&city=Medellín&address=Crr. 14 No. 15-16&homePhone=3332211&cellPhone=3004442211
```

Para consultar la información del usuario `alejo.catson@gmail.com`:

```
localhost:8080/userdataaccess/getUser?email=alejo.catson@gmail.com
```

Si el usuario existe, el servidor responde con un código `200 OK` y un JSON con la información del usuario. En caso contrario, el servidor responde con un código `204 No Content`.
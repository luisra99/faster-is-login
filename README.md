# Faster IS Login

![npm](https://img.shields.io/npm/v/faster-is-login)
![GitHub](https://img.shields.io/github/license/luisra99/faster-is-login)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/faster-is-login)

Un componente React elegante y configurable para listar proveedores de identidad (Identity Providers) disponibles en el marco de trabajo y enviar al usuario hacia el inicio de sesión.

## Características

- ✅ Diseño moderno y responsive
- ✅ Soporte para múltiples proveedores de identidad
- ✅ Animaciones de carga integradas
- ✅ Tipado TypeScript completo
- ✅ Compatible con React 18+
- ✅ Estilizado con Material-UI (MUI)

## Instalación

```bash
npm install faster-is-login
# o
yarn add faster-is-login
```

## Uso Básico

```tsx
import IdentityProviderList from 'faster-is-login';

function LoginPage() {
  return (
    <IdentityProviderList
      variant="container"
      redirectPath="/dashboard"
      localAuth={true}
    />
  );
}
```

## Props

| Prop           | Tipo                | Por defecto | Descripción                                                                 |
|----------------|---------------------|-------------|-----------------------------------------------------------------------------|
| `variant`      | `"button" | "container"` | Requerido  | Controla si se muestra como botón o lista contenedora                       |
| `redirectPath` | `string`            | Requerido  | Path al que redirigir después del login                                   |
| `localAuth`    | `boolean`           | `false`     | Si es true, muestra un divider con "También puedes"                         |
| `specific`     | `boolean`           | `false`     | Si es true y hay un solo proveedor, muestra "Continuar con [Proveedor]"     |

## Ejemplos

### Como botón (abre modal)
```tsx
<IdentityProviderList
  variant="button"
  redirectPath="/dashboard"
/>
```

### Como contenedor
```tsx
<IdentityProviderList
  variant="container"
  redirectPath="/dashboard"
  localAuth={true}
/>
```

### Mostrando proveedor específico
```tsx
<IdentityProviderList
  variant="button"
  redirectPath="/dashboard"
  specific={true}
/>
```

## Personalización

El componente utiliza Material-UI para los estilos, por lo que puede ser fácilmente personalizado usando:

1. El tema de Material-UI
2. Propiedades `sx` inline
3. Sobreescritura de estilos CSS

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o PR en [GitHub](https://github.com/luisra99/faster-is-login).

## Licencia

ISC © [Luis Raúl](https://github.com/luisra99)

---

## Changelog

### 1.0.1
- Primer lanzamiento público
- Componente estable con todas las características básicas

## Roadmap

- [ ] Soporte para internacionalización
- [ ] Componente de logout integrado
- [ ] Más opciones de personalización visual
- [ ] Ejemplos de implementación con diferentes backends

## Soporte

Para reportar bugs o solicitar características, por favor usa los [issues de GitHub](https://github.com/luisra99/faster-is-login/issues).
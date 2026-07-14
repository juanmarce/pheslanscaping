# 🌿 Agente de Redes Sociales — Phes Landscaping

Sistema automático que publica contenido en **Facebook** e **Instagram** para Phes Landscaping. Funciona en tres piezas:

| Pieza | Qué hace |
|---|---|
| `content/queue/` | Cola de publicaciones (un archivo JSON por post, con fecha programada) |
| `publish.mjs` | Script que publica en Meta (Facebook/Instagram) los posts cuya fecha ya llegó |
| `.github/workflows/social-publish.yml` | GitHub Action que ejecuta el script **martes y viernes a las 9:00 AM** (hora central) |
| `.claude/agents/social-media-manager.md` | Agente de Claude Code que genera posts nuevos con la voz de la marca |

La voz de marca, servicios y reglas de contenido están en [`brand.md`](brand.md).

## Puesta en marcha (una sola vez)

Para que el agente pueda publicar de verdad, necesitas conectar tus cuentas de Meta:

1. **Convierte tu página de Facebook e Instagram a cuenta de empresa** y vincúlalas entre sí (Instagram → Configuración → Cuenta de empresa → vincular a la página de Facebook).
2. Entra a [developers.facebook.com](https://developers.facebook.com), crea una app de tipo *Business* y agrégale el producto **Facebook Login for Business / Graph API**.
3. Genera un **token de acceso de página de larga duración** con estos permisos:
   - `pages_manage_posts` y `pages_read_engagement` (Facebook)
   - `instagram_basic` e `instagram_content_publish` (Instagram)
4. Obtén los IDs:
   - **FB_PAGE_ID**: en tu página de Facebook → Información/About → Page ID.
   - **IG_USER_ID**: llama a `GET /me/accounts` y luego `GET /{page-id}?fields=instagram_business_account` en el [Graph API Explorer](https://developers.facebook.com/tools/explorer/).
5. En GitHub, ve a **Settings → Secrets and variables → Actions** del repositorio y crea estos secretos:
   - `META_ACCESS_TOKEN`
   - `FB_PAGE_ID`
   - `IG_USER_ID` (opcional — si no lo pones, solo publica en Facebook)

Listo. A partir de ahí el workflow publica solo, cada martes y viernes.

> 💡 **Prueba sin publicar:** en GitHub → Actions → "Publish social media posts" → *Run workflow* con la opción **dry run** marcada. También puedes probar localmente con `DRY_RUN=1 node social-agent/publish.mjs`.

## Formato de un post

Cada archivo en `content/queue/` se llama `YYYY-MM-DD-tema.json`:

```json
{
  "date": "2026-07-14",
  "platforms": ["facebook", "instagram"],
  "message": "Texto del post (en inglés, es el idioma del público local).",
  "hashtags": ["#HuntsvilleAL", "#PhesLandscaping"],
  "image_url": "https://... (URL pública de la foto, o \"\" si no hay)",
  "image_brief": "Descripción de la foto que conviene usar",
  "status": "pending"
}
```

Reglas:

- `status: "pending"` → se publicará cuando llegue su fecha. El script lo cambia a `"published"` automáticamente.
- **Instagram exige imagen**: si `image_url` está vacío, ese post se salta Instagram y sale solo en Facebook como texto.
- La imagen debe estar en una **URL pública** (por ejemplo, súbela a este repositorio en una carpeta `social-agent/images/` y usa la URL "raw" de GitHub).

## Generar más contenido

Abre Claude Code en este repositorio y pídeselo al agente, por ejemplo:

> "Usa el agente social-media-manager para crear los posts de septiembre"

El agente lee `brand.md`, revisa la cola para no duplicar temas y deja los archivos JSON listos con fechas de martes y viernes.

## Cola actual

Hay **8 publicaciones programadas** del 14 de julio al 7 de agosto de 2026 (temporada de verano: riego, consejos de corte, patios, mantillo, césped, diseño para otoño y testimonios). Todas tienen `image_brief` con la foto sugerida — sube las fotos y pega las URLs en `image_url` para que salgan también en Instagram.

# CLAUDE.md — mixmekatos-web

Repositorio del **sitio web público de MixMekatos**: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4 + shadcn/ui + Supabase. No está conectado al sistema Aurelius ERP/MES — es un sitio informativo/comercial independiente.

## Antes de trabajar acá

La gobernanza de este repositorio (convenciones de código, modelo de branching, backlog) vive en **[`../Docs-Web/`](../Docs-Web/)**, no en este archivo. Es obligatorio leer, antes de tocar código:

1. **[`../Docs-Web/AGENT-RULES.md`](../Docs-Web/AGENT-RULES.md)** — convenciones de código del stack y el modelo de branching real (GitFlow + automatización de `.github/workflows/`).
2. **[`../Docs-Web/DEVELOPMENT-METHODOLOGY.md`](../Docs-Web/DEVELOPMENT-METHODOLOGY.md)** — metodología de backlog (Epic → Feature → Story).

Para colores y tokens de diseño, ver **[`../Docs-Web/design-system/COLOR-SYSTEM.md`](../Docs-Web/design-system/COLOR-SYSTEM.md)** — es la referencia canónica, no hardcodear hex fuera de ese sistema.

## Contexto de negocio

El contexto de marca/negocio de MixMekatos como empresa vive en el `CLAUDE.md` raíz del proyecto de tesis, dos niveles por encima de este repositorio.

> **Deriva conocida**: ese `CLAUDE.md` raíz describe el stack de este website como "React 19 + Vite, sin TypeScript" (`WebSite/MixMekatos_V1/`). Eso está desactualizado respecto al stack real de este repositorio (Next.js 16 + TypeScript). No lo contradigas silenciosamente en otro lado — señalalo si lo editás, pero mientras tanto este archivo es la fuente correcta sobre el stack técnico real de `mixmekatos-web`.

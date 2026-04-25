# WellnessFest — Setup Guide

## Stack
- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Firebase** (Firestore) — armazena pedidos confirmados
- **Stripe** — gateway de pagamento (PIX, cartão, boleto)
- **Vercel** — deploy automático via GitHub

---

## 1. Clonar e instalar

```bash
git clone https://github.com/SEU_USUARIO/wellness-event.git
cd wellness-event
npm install
```

---

## 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo:
```bash
cp .env.local.example .env.local
```

Preencha cada variável:

### Stripe
1. Acesse https://dashboard.stripe.com/test/apikeys
2. Copie **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copie **Secret key** → `STRIPE_SECRET_KEY`

### Firebase
1. Acesse https://console.firebase.google.com
2. Crie um projeto → **Firestore Database** → modo produção
3. Vá em **Configurações do projeto** → **Seus apps** → adicione app Web
4. Copie as credenciais para as variáveis `NEXT_PUBLIC_FIREBASE_*`

---

## 3. Rodar localmente

```bash
npm run dev
# http://localhost:3000
```

---

## 4. Configurar Stripe Webhook (local)

```bash
# Instale o Stripe CLI
brew install stripe/stripe-cli/stripe

# Faça login
stripe login

# Inicie o forwarding
stripe listen --forward-to localhost:3000/api/webhook
# Copie o "webhook signing secret" → STRIPE_WEBHOOK_SECRET no .env.local
```

---

## 5. Deploy na Vercel

### Via GitHub (recomendado)
1. Suba o código para um repositório no GitHub
2. Acesse https://vercel.com/new
3. Importe o repositório
4. Em **Environment Variables**, adicione todas as variáveis do `.env.local`
5. Deploy!

### Webhook em produção
Após o deploy, vá em https://dashboard.stripe.com/webhooks:
- Adicione endpoint: `https://seu-dominio.vercel.app/api/webhook`
- Eventos: `payment_intent.succeeded`
- Copie o signing secret → adicione como variável na Vercel

---

## 6. Personalizar

| Arquivo | O que personalizar |
|---|---|
| `src/lib/stripe.ts` | Nomes, preços e benefícios dos ingressos |
| `src/components/Hero.tsx` | Título, subtítulo e CTA do hero |
| `src/components/EventDetails.tsx` | Data, local, palestrantes e stats |
| `src/components/AnnouncementBar.tsx` | Textos do ticker no topo |
| `src/app/globals.css` | Cores e animações |
| `src/app/layout.tsx` | Meta title e description (SEO) |

---

## 7. Segurança em produção (checklist)

- [ ] Trocar chaves Stripe de `test` para `live`
- [ ] Configurar regras do Firestore (bloquear leitura pública de `orders`)
- [ ] Adicionar `NEXT_PUBLIC_APP_URL` com a URL real
- [ ] Ativar rate limiting na API (ex: Upstash)

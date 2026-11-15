# GymFinity Trainer Access

Trainer portal for `trainer.thegymfinity.com`.

- Login: phone number + password set by the gym owner in `app.thegymfinity.com` → Trainers → portal access
- Read-only: clients by month, commission, salary/payroll, attendance, schedule

## Local

```bash
npm install
cp .env.example .env
npm run dev
```

Runs on port **5175**. Set `VITE_API_BASE_URL` to your GymFinity backend.

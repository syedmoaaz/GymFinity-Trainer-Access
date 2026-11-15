import api from "./axios";

export async function loginTrainer(phone, password) {
  const res = await api.post("/trainer-portal/login", { phone, password });
  return res.data;
}

export async function fetchMe() {
  const res = await api.get("/trainer-portal/me");
  return res.data;
}

export async function fetchHome() {
  const res = await api.get("/trainer-portal/home");
  return res.data;
}

export async function fetchMonths() {
  const res = await api.get("/trainer-portal/months");
  return res.data;
}

export async function fetchClients(month) {
  const res = await api.get("/trainer-portal/clients", { params: { month } });
  return res.data;
}

export async function fetchEarnings(month) {
  const res = await api.get("/trainer-portal/earnings", { params: { month } });
  return res.data;
}

export async function fetchAttendance(params = {}) {
  const res = await api.get("/trainer-portal/attendance", { params });
  return res.data;
}

export async function fetchSchedule() {
  const res = await api.get("/trainer-portal/schedule");
  return res.data;
}

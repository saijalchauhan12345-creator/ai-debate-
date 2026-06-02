const API = '/api';

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const startDebate = async (topic, token) => {
  const res = await fetch(`${API}/debate/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ topic })
  });
  return res.json();
};

export const sendMessage = async (debateId, message, token) => {
  const res = await fetch(`${API}/debate/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ debateId, message })
  });
  return res.json();
};

export const getHistory = async (token) => {
  const res = await fetch(`${API}/debate/history`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};
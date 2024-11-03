export function updateLocalStorage(item, modo) {
  localStorage.setItem(modo, JSON.stringify(item));
}

export function updateSessionStorage(item, modo) {
  sessionStorage.setItem(modo, JSON.stringify(item));
}

export function getVarLS(modo) {
  return JSON.parse(localStorage.getItem(modo)) || [];
}

export function getVarSS(modo) {
  return JSON.parse(sessionStorage.getItem(modo)) || [];
}

export function deleteLocalStorage(modo) {
  localStorage.removeItem(modo); 
}

export function deleteSessionStorage(modo) {
  sessionStorage.removeItem(modo);
}

export const login = async ({ email, password }) => {

  const response = await fetch("http://localhost:4000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data)
  }

  return data;
}

export const getMe = async () => {
    const response = await fetch("http://localhost:4000/me", {
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data)
  }

  return data;
}

export const deleteSession = async () => {
  const response = await fetch("http://localhost:4000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data)
  }

  return data;
}
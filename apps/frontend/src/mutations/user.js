export const createUser = async values =>  {
  const response = await fetch("http://localhost:4000/users/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(values)
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data);

  return data;
}

export const deleteUser = async id => {
  const response = await fetch(`http://localhost:4000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
  });

  const data = await response.json();

  if(!response.ok) throw new Error(data);

  return data;
}
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const parsedResponse = await response.json();

    if (!response.ok) throw new Error(parsedResponse.message);

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}

export const createUser = async (data) => {
  try {
    const response = await fetch(`http://localhost:4000/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include"
    });

    const parsedResponse = await response.json();

    if (!response.ok) throw new Error(parsedResponse.message);

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}


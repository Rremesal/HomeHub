export const loginUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/login", {
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

export const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:4000/logout", {
      method: "POST",
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

export const getMe = async () => {
  try {
    const response = await fetch("http://localhost:4000/me", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const parsedResponse = await response.json();

    if (!response.ok) throw new Error(parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const controlPlayer = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/control", {
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
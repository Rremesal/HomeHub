export const getSonosDevices = async () => {
  try {
    const response = await fetch(`http://localhost:4000/discover`);

    const parsedResponse = await response.json();

    if (!response.ok) throw new Error(parsedResponse.message);

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
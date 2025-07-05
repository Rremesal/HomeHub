export const getUsers = async ({ queryKey }) => {
  const params = queryKey[1];

  const preparedParams = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`http://localhost:4000/users/?${preparedParams}`);

    const parsedResponse = await response.json();

    if (!response.ok) throw new Error(parsedResponse.message);

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
export const  getUsers = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const paramObject = new URLSearchParams(params).toString() || "";
  const response = await fetch(`http://localhost:4000/users/?${paramObject}`);

  const data = await response.json();

  if (!response.ok) throw new Error(data);

  return data;
}
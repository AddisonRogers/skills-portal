const API_BASE_URL = 'https://api.example.com';

// A function to fetch a list of items
export async function getPeople() {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    // Gracefully handle the error, maybe return an empty array or a specific error object
    return [];
  }
}

// A function to fetch a single item by ID
export async function getItemById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
      return null; // Or handle not found case as needed
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    return null;
  }
}
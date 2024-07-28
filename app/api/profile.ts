const fetchUser = async (): Promise<UserWithRole> => {
  try {
    const response = await fetch('/api/profile');
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchUser:', error);
    throw error;
  }
};

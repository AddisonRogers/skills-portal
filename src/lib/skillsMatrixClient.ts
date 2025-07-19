import ky from "ky";

// It's a good practice to have the API URL in an environment variable.
// Make sure to create a .env.local file and add NEXT_PUBLIC_OPSHUB_API_URL={{url}} to it.
const api = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_SKILLS_MATRIX_API_URL,
	// If your API requires authentication, you can configure a hook like this:
	// hooks: {
	//   beforeRequest: [
	//     async (request) => {
	//       // Add your auth logic here, for example fetching a token
	//       const token = await getAuthToken();
	//       request.headers.set('Authorization', `Bearer ${token}`);
	//     },
	//   ],
	// },
});

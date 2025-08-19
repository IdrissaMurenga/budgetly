const BACKEND_GRAPHQL_URI = process.env.BACKEND_GRAPHQL_URI;

export const findUserByEmail = async (email: string) => {
    const query = `
        query GetUserByEmail($email: String!) {
            getUserByEmail(email: $email) {
                user{
                    id
                    email
                    userName
                }
                token
            }
        } 
    `
    const response = await fetch(BACKEND_GRAPHQL_URI as string, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: { email }
        })
    })
    const { data } = await response.json()

    return data?.getUserByEmail
};

export const createUser = async ({ email, provider, userName }: { email: string, userName: string, provider: string }) => {
    const query = `
        mutation OAuthsignup($input: OAuthInput!){
            oauthsignup(input: $input){
                user {
                    id
                    email
                    userName
                    provider
                }
                token
            }
        }
    `
    const response = await fetch(BACKEND_GRAPHQL_URI as string, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: {
                input: {
                    userName,
                    email,
                    provider,
                }
            }
        })
    })
    const result = await response.json();

    

    // Handle backend validation errors
    if (result.errors) {
        console.error('Backend error:', result.errors[0].message);
        return null;
    }

    return result.data?.oauthsignup ?? null
}
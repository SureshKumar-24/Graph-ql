import './App.css'
import { useQuery, gql } from '@apollo/client';

const GET_USER_TODO = gql`
  query GetAllTodo {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USER_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
   console.log('data',data);
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
     
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;

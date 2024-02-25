import './App.css';
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

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>{todo.user ? todo.user.name : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

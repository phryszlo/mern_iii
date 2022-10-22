import { useEffect, useState } from 'react'
import { getUsers } from '../utils/users-service'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UsersList() {
  const [users, setUsers] = useState([])

  const callGetUsers = async () => {
    try {
      const whatever = await getUsers()
      setUsers(whatever.data.users)
      // console.log(`getUsers return: ${JSON.stringify(whatever)}`)
      console.log(whatever.data.users[0].email)
    } catch (error) {
      console.log(`callGetUsers in UsersList failed with ${error}`);
    }
  }

  useEffect(() => {
    callGetUsers();
    console.log(`useEffete: ${users && JSON.stringify(users)}`);
  }, [])

  return (
    <div>
      aslkdjfhsjfd
      <ListGroup className="users-list" as="ul">
        {users ?
          <div>{users.length}{typeof (users)}
            {users.map(user =>
            (
              <ListGroup.Item as="li">
                  <p className="user-item-p">
                    {user.name}
                  </p>
                  <p className="user-item-p">
                    {user.email}
                  </p>
              </ListGroup.Item>
            )
            )}
          </div>

          : <h4>no users are found</h4>
        }

      </ListGroup>
    </div>
  )
}

export default UsersList
import { useEffect, useState } from 'react';

import { currentEnvironment } from '@constants';

import styles from './users.module.scss';

import './spinner.css';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);

  // Added "loading" state
  const [loading, setLoading] = useState(false);

  const getUsers = async (page: number, gender: Gender) => {
    setLoading(true);

    // Added "try" "finally" statement to show loading state
    try {
      // Added "${gender}" to the URL to fetch accordingly
      const result = await fetch(
        `${currentEnvironment.api.baseUrl}?results=5&gender=${gender}&page=${String(page)}`,
      );

      // The next line was the cause of users not being displayed
      // const usersResults = (await result.json()) as User[];

      // The problem was that userResults was returning an object and we had to
      // access the "results" array inside it
      const data = await result.json();
      const usersResults = data.results as User[];

      console.log(usersResults);
      setUsers(oldUsers =>
        page === 1 ? usersResults : [...oldUsers, ...usersResults],
      );
    } finally {
      setLoading(false); // After data is fetched, disable loader
    }
  };

  // The problem here is that the dependency array "[]" of useEffect was empty
  // meaning that the effect was running only once at the beggining, making
  // the "Load More" button to not work properly.
  // Now it re-runs every time "pageToGet" changes.

  // Furthermore, I added the "gender" to the dependency array so that it
  // will display the users according to the gender selected.
  useEffect(() => {
    void (async () => {
      await getUsers(pageToGet, gender);
    })();
  }, [pageToGet, gender]);

  return (
    <div>
      <div style={{ backgroundColor: 'grey' }}>
        Users
        <select
          id="gender"
          name="gender"
          onChange={event => {
            setGender(event.target.value as Gender);
            setPageToGet(1); // Added this line in order to reset when a new gender is selected
          }}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      {/* Check if loading true */}
      {loading ? (
        <div id="loading"></div>
      ) : (
        <div>
          <table style={{ width: '100%' }}>
            <thead style={{ fontWeight: 'bold' }}>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Gender</td>
              </tr>
            </thead>
            <tbody>
              {users.length > 0
                ? users.map((user: User) => (
                    <tr key={user.login.uuid}>
                      <td>{user.name.first}</td>
                      <td>{user.name.last}</td>
                      <td>{user.gender}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      )}

      <button
        className={styles.loadButton}
        type="button"
        onClick={() => {
          setPageToGet(v => v + 1);
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Users;

// 1. The logo looks tiny on smaller devices.
// 2. TEC theme is not displayed on the app bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change select.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain
// 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card

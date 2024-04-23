
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzEzODk0MzI4LCJleHAiOjE3MTM5MzAzMjgsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6ImM2ZDljYzNiLTU0YTItNDE0YS05M2QwLWIwOTFjOTZlODc2OCJ9.dAmCV9wd0c1P2JvWTGrc5ZiPmWF07GhL0DuIazIH7JXSYMf-PVd6qCgVl0Hyo2Az4GsHZGyHqmMJHc0gf4nRxJyqoT-WuumMDW5bLyaai2h8VXEWxiEniO-l_PgcNUggYRQCn2-TjtTEi_93G4Rvba9QQ48xReRUyyTKNLpR_YNPZMTB62CSZwwx_XRA-qTRrbaNxJj90Nzsluf1dLxm5UVc6LmvvlW2QJ35ill5gjT1fRL6F8FTc8yU4fHSEzy2BMJaG8ai-gdnVS3ku4Xszm8sMxW1Q2DcgsWX7u3QCSbXGZzQKRfblilMuJAW0XuoK5__6voqgYiodIcZn1RBy2BKn0Jtf5ZTtnFyrRu7YGTgeQJo9pceJU14x1ZXkxHdcBH6ZTDB4AK97-x4sqSyLjW46HiOTsEsTlJVN69pGARPhUUYcz5NOvAC8AlXMDmeyQTAm4x8MGgFhuOeJ7tQkRN9FAf8_yLgO6XVDQyDbYJkvjd1JRjBqUJCh9E2_upFU7eaeaLqiW5LcwdTJM7zmTPzF17dBKzaqSdbu_HG3esC2uisBGjw90zqU54Oy04OcSsRhtAu5y7jFwT0IjIGaPh8HOpEBwFRh3inKtPXxfyZi1KS0En4EKBQIp-Iag7bQ5vVUw27_EyzmZQMun52k1J_pwi4d5MJ7bCj0G3REms";
export const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getProjects(setProjects) {
  try {
    const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Sort the projects by the "from" field in descending order
    const sortedProjects = data.sort((a, b) => {
      // Convert the "from" values to Date objects for comparison
      const dateA = new Date(a.from);
      const dateB = new Date(b.from);

      // Compare the dates in reverse order (newest first)
      return dateB - dateA;
    });

    // Set the sorted projects in the state
    setProjects(sortedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
}

export async function getEmployeePhotoUuid(useruuid) {
  try {
    const response = await fetch(`https://api.trustworks.dk/public/users/${useruuid}/photo`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.file;
  }
  catch (error) {
    console.error(`Error fetching employee photo for user ${useruuid}:`, error.message);
    throw error;
  }
}

export async function getConsultants(setConsultants) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/users', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setConsultants(data);
  }
  catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export async function getClients(setClients) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/clients', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setClients(data);
  }
  catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export async function getClientLogoUudid(clientuuid) {
  try {
    const response = await fetch(`https://api.trustworks.dk/public/files/photos/${clientuuid}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.file;
  }
  catch (error) {
    console.error(`Error fetching client photo for client id ${clientuuid}:`, error.message);
    return null;
  }
}

//Update list of cliets with IDs and logos
export async function updateClientListWithIdPhoto(projects, setClients) {
  try {
    // Using Promise.all to wait for all requests to complete
    await Promise.all(
      projects?.map(async (project) => {
        const response = await fetch(
          `https://api.trustworks.dk/public/files/photos/${project.clientuuid}`,
          config
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setClients((clients) => [
          ...clients,
          { id: project.clientuuid, file: data.file },
        ]);
      })
    );
  } catch (error) {
    console.error(`Error fetching client photos:`, error.message);
    return null;
  }
}



//   //Set list with client IDs and logos
//   useEffect(() => {
//     projects?.map(project => {
//         axios.get(`https://api.trustworks.dk/public/files/photos/${project.clientuuid}`, config)
//         .then(response => {
//             setClientList(clientList => [...clientList, {id: project.clientuuid, file: response.data.file}])  
//         }).catch(error => {
//         console.log(error)
//         })
//     })
// }, [projects]);


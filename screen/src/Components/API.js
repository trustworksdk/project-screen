
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzA4NDM4MTQyLCJleHAiOjE3MDg0NzQxNDIsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IjVmZjBlZjU2LTEzNzAtNGZkZC05YmU4LTg3OTNjNDFiNjBiMCJ9.MtiW8RRxd5btdvmbRMqdb57rZnYrMyHQdjjEoDQZFHKwxxp7OOmZprBqcLJNZvGg_Ld4cwIQDn41Avu3BHrE2eoemT0AdkA7l2YUHHg5IZ0PN6IB947wvUuLZZOO1LYt0JNx0gTicFyXaPDFgj0pkGDMf2pXCnG1tqZih9eqiMzdeT4rCK0roUfFxYkGv-qIzbFX_gz_K9bYRvPqBRmxwpOH6b27YIrhVdHbUQY5zX_A1Ovg2FE2f1WTJSaDqt8gwy9ECK6QMW_9cagCI-wVXWqO7pxOOe8uDRIKoRp7pqOgeZAhIDwUc19-zw1ooTluDa9e9ot7lvqFbEvfGPxc7VQ2bDs6zhsEiuOJ1CmSqb7xlduU23am4SRHeLHGLKmWr4_krWe_0_Y9Yl7AaV40MUw14qqO4Qyv7sv7Y7_gYAzQ1--3UNw5nEkaGA7gm72teaSw4g3fdXlDyGfERh98e7wLv0bpMSmaVxw3XCkEXquQey4YSbG5iUL19K3reRVoFWPH1Q2uztJ2OLS2Ix18ZizYnHNwumknh0d28tKDQMuq5O2LcibB97agx5Ptmoz4pMtjja4OE7EnrA4GVJw5uED8rp-guo1GcWp0iRN_hPjFMYWq9fa2W3aahVnTpolhWH8E6AKbfvJIHWsVfm_HAJF2V8zF2kOS8C3bIu0lBBs";
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


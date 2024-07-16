
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzIxMTE1NDU1LCJleHAiOjE3MjExNTE0NTUsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IjAwMTg4OWUzLTE3NTQtNDVlMi04NmIxLTNkMjY2OGVhMTBiYyJ9.k-loqTumUy_nH2Sh7mBfIKPQDXZh0tl60QTNRDb69SuSQqnZpb4NlrLjIVayUmlvyoNo4XnyUoD0yaScSK_FroaBy3NeVeUTi7ZZVvtRdLY4OJGkxmxad16nRz-RNMl-dIkglf5mq7LrRSfZ7k3LLmkFKD8gLqPvK1X9Xw4cJb6Wc4jMWWC7eyLMzowgZ_SOlJxFC2L30PJA2J79nwrfTk97zQbVnfUT52nSSobT13aUpIsYcZaxr7Mpzpkm0I1dSBF_FjRms0ZPJKj1wZL2Pgfec569VQiUAmM0BjUUZ4dCALh7rfnaqcE4-YwB9kMxfObATSPLRJKTVUYJl6iVYS1xxFiIdkxgeGTXM8-e2pkg0gDAFu8KvRbBN-wZMenZ42FFT09rO4gFvcbjY1E8eu9sttp5yVnt6zEek34dAMdPjOwmYXO3mgwa-9aAWTyg4f21TNdcbTf4CP9YNgN6lhrptQrxMBrEbpXG7VnTbcCojOhlvtiYo-dcKHl3ZT6U80MXIjNrI3r_gpZWV9j-oTPbwFkqarL8jDP-qJVZf1qdarNeQzsGiB4toTJ3p-qmCiULagELfhqCHJCja1NUl-7cmMvsAetKqs4sAxjEQ5n1hf8aWvjuYlicvOLRwaSJ1VHufEDNwXv8lObMzAmUPDBc1D7Uj6qgmUaLuWkLClM";
export const config = { headers: { Authorization: `Bearer ${token}` } };

//async
export async function getProjects(setProjects) {
  try {
    // const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data = await response.json();
    

    const data = require('./testJson.json');
    console.log(data);


    // Sort the projects by the "from" field in descending order

    const sortedProjects = data.sort((a, b) => {
      // Convert the "from" values to Date objects for comparison
      const dateA = new Date(a.from);
      const dateB = new Date(b.from);

      // Compare the dates in reverse order (newest first)
      return dateB - dateA;
    });

    console.log('sortedProjects', sortedProjects)
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

    // Filter the consultants to include only active consultants
    const activeConsultants = data.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    // Update the state with the filtered list of active consultants
    setConsultants(activeConsultants);
    
  } catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export function getActiveConsultants(consultants) {
  try {
    const activeConsultants = consultants.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    return activeConsultants;

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



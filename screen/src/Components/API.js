const getToken = async () => {
  const url = `https://api.trustworks.dk/login?password=${process.env.REACT_APP_PASSWORD}&username=${process.env.REACT_APP_USERNAME}`
  console.log(url)
  const response = await fetch(url)
  console.log(response)
  const data = await response.json()
  console.log(data)
  return data.token
}

const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMzA5OTM1MCwiZXhwIjoxNzIzMTM1MzUwLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiI4Yjc2OWQ2Yi1lNWEyLTRmZGYtYWVmYS1kYmZmNDBiZDljMTQifQ.P_rYtA30siwawxxbPRJosQOrSkMfYFq_6pvAGHYT04TVUXWisaNn2wDzVWvwg26l9t5Xf0rj3rBPcrxaDW9XPMB-MTkAhER1CUBstslpSdqFMharWHn7YsNyKX3hTFgJwGvdutz7J3S5zT3RcTiH85uO8z6gTHU519s7HU0x7hzROjBT422lE0FeWgv9SmsdyCpBrwzboCwsjmUiVYDyNFtIAj3kYQBevgMfjlQT7pYwAPeS3M7zt1hKf5Bl9b74IJoOCau2BXmcp2n1m0J59TnYorLB5KpM36AIl5TZc18NR7oiIXVTZaWk3Pf8Kn8Q6rR_L_EfeIiES6wUH8fJHhSr1ewCuF-3hBXlwtzevyHKUx7Xtu3M6IEyUWxMsFJyBYQ2TIXMbKHIQ4Yt9I3P8sOShPA7yr8gJy8d30KAlV0gt9iFusCpIoWODToH3D1rxkme-n9Qq4O_gZgrIhvi4O2QNZZ9L7SkYSIs27Ath7AkXIxnoGTliBBTI1uj5MO3cxedS50YwfPsMARghra3ExoMkh2d_mt8ool3OLqxdVSyiQNCQ0p3ar60x2ZwdGLR_evuKxjhp5ZOsytr9OhP3-6mrULtJtvT0y9c2HfyCawP6rAG4TRvD1xLsUMHVF4dAZWLLO-nwLfe3RmSUMA9GM89xctTma8SGMMrf4ouiY8"
export const config = { headers: { Authorization: `Bearer ${token}` } };

// export const config = { headers: { Authorization: `Bearer ${await getToken()}` } };

export async function getEvents(setEvents) {
  try {
    // const response = await fetch('https://api.trustworks.dk/news/active', config);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json()
    const data = require('./events.json');
    setEvents(data)
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
}

export async function getProjects(setProjects) {
  try {
    // const response = await fetch('https://api.trustworks.dk/knowledge/projects', config);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json()
    const data = require('./projects.json');

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

    // Filter the consultants to include only active consultants
    const activeConsultants = data.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    // Update the state with the filtered list of active consultants
    setConsultants(data);

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



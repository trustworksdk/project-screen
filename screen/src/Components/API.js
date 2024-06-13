
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuaWNvbGUuYWdnZXJuaWVsc2VuIiwiaWF0IjoxNzE4MjYxODY4LCJleHAiOjE3MTgyOTc4NjgsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6ImRjNGJjN2Y4LTg2YmEtNGMzZS05NTdkLTgzNGRiNDk4MTg1NCJ9.EBLAUZIc1Pe0JyAcBjjjrTNuxYSPl2F5yQITzdUwmIBr3dvsrwyIpYW8lbJPmzdkcNPipPRFQSJRaoyI7KcplkDJD1sJWtJ-qN9Bt-OlzYN29MzYH7V3k5ZSt7qbaV6nunQ1D_ptqPyo-hPxm1WdZoTeVhNPWdktS0Tu4RLuYlelfFILM3lkRqHyq8cXP3yKu222wZkMczQuvFsdtSdyTJpxbHjxCtY-ShVrdtgJSDGiYG7x2O0yaveNzahgbSAq3tIu0HtU8VJKsCcLqHNsHhVMeQDxPssqGQKYaYgYkiZ3lN78C27Xh88q2dvWN-sEAThgLAaSecY6KMhgw6W3NlTHgzIg52M6tqK0srcOuH4ntzhzbXTd2y43axxgfV9nl8Ywm12JvXLAz7hfDu4j9yeXP_uV5c5K4D1W3v59bjGkR4cV7lTmjI6t0l5_hy18bLfqRKgChq2Oledsn4NfUHGCT3wjqmdsacqV2BgbE6qsW-bALbEf-vYqTshLFpmwhFiK8ZVGsOQiakPM89wPdLDAeJdMda-U-k5SgcXJl6cOZ4YEMHKZB9SklMww8Zfzpqm3S2cxrP1NY8NB7NuXJIQXspC6mH0d5dv-trqGlW3Wddrqh43qV23buDhxnfsK0jSynhxWOIVcj8AjqenTentMaFrqzarvq7bXVXP6yWw";
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



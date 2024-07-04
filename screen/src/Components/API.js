
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMDA3OTA1NiwiZXhwIjoxNzIwMTE1MDU2LCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiIwYWZjMGNlYS1hZWQwLTRlNjMtODQ3Ny0zZTc5NjQ5YmU4ZmQifQ.TBiqZ-EO1j5b3G_vED5ms61RVXwC98kRzBYoLyseHVI0uw_q5IrWc6YgoUJz54rH8TNquE9Rj6eYKqXPRmo5Zh2tPSdY5zzvOVTKNQCaZ8toYLh3t9-JYkrf9iGd2mhKVpxqdUDEKFT5qAd_YD4fLM5XGUQbPbAbAzElBan9LEm6QOLFOfzWUnvsGLFaF59kc4u9w5LTE7ZEYw44LF8T-VnwO4v8IihSte8MEZsre0CzjkS3Vqkq-mX3yXWcZe31BpJ6iLAGv_kaXtlLH-CdYsm2GQ8BBsVpnB_LR8QocRzRyQHcUVevWv9HFxQiSzOt54ewnLW5Eqk5nuhYpE3GAuA4eEaq_huxSfuYIKTmyu4-AFw8DrcKm7SIiSDseY_vlc3hgbHDnAdt51JD7_A46_23pI8mamImt5REbk7wZNo6fy5KjnBDx7iX8MhG7kCgGu9CIVCCRkoyMWvk8L6qf3j7Zoyz_vlzYwxD4rUgZfn1a-dnyD3i9NS-7eVTTwClmw-0hqnYKIOTl0fsP0l7_7DCa4s5s3sfi9bFuMeNNH-CGRIhoRnmcV-TvHNEeG7V5hQtu-v6uMFWRSFtFcpETihqOFJHbWEOoerRc7vzPXh1ANLUwXmrBSETrCVw7K4L1ziYbhVTleu4cHv-UyUYGtW4LXM8G2CeoDboCakBgt8";
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



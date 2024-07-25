const getToken = async () => {
  const url = `https://api.trustworks.dk/login?password=${process.env.REACT_APP_PASSWORD}&username=${process.env.REACT_APP_USERNAME}`
  const response = await fetch(url)
  const data = await response.json()
  return data.token
}

// export const config = { headers: { Authorization: `Bearer ${await getToken()}` } };
const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMTkwOTMyOSwiZXhwIjoxNzIxOTQ1MzI5LCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiJlYTFmOWRjMS0zYzVkLTQ5ZjEtOTE0Ni01NzFmYzFlODgzNWYifQ.HLZg9Xo3pxoXU-g8NsLt0rVKxnj2H2QcmFPAlUOH2GcG_5i39YnPmAYdLqlzFb81B9wrYB2U_Y336L5jXZJ8CXusYLq13NKHQqzRjE__kJca6EpQcIjj4HSREtWfJLYvhjWxK9e0K4OUVSLopFRYC_p8yfu38eF7xwnTAbFIkzzpWYv_Un6MIz6bYUetzeeSgg35AXNjKzN4zuH6EvrTduT77YoPtauh7WjszvOGELTvQ6owlE_VP-ZYKe5T4tj5rMKbb94jnQQPHshzAAvnLfp6_O9QNHQiEvXFshjNMMN_HDizX1UawxKRlAewZ7_wXpGK-KvOD-X1Wvp9L1XXgGD1Mqh55TWzB2Ev6wsl5uqlAl_yYehh9mCZbmH4o6RzbgnQ0sZOTlHJh3xh25zSJV4WcS63b0dFBfTV_pJb2I4ZwEH70XRyS9pMTvOMe0GyVib5C2q43sS7EJo91PunLchG1iws6thBBJB5BIOM04R8SNpdIrisN-7BCoF-029YBl23FO0c-cC0CQOsY5kCanMv9YcH--1dY7YYDX8LdaI3LN2boMNZfTRRz9DupqWaAcyJBnJNf2bmAig5_0WcLgO1uxgqY_ViuCkypxh2FP1mWhXUBjzG7grp6X8yzs4-9S-jQ7d1RHCyXYriLPGfmoMO1m6Tj7dB6omQ19Cyjf4"
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




const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcxOTU2MTY4MCwiZXhwIjoxNzE5NTk3NjgwLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiI5ZTM4NmFlZS1lZTk2LTRlODgtYmMyNS1lYzU4MTRmNGU5NTYifQ.k1_5o9HzJYfC1PuBzNqYnGqUuk3D6L5_ClPUy_1c9olwkXobDP1kj9atpmKZ-aOFbtefXfPAuIucyTg2s_PtrsTLXaMRaEmFqvvUh6fn8k52wo0XLc92R-UJtALrTabZYexjYmtSuyo0cvW3lbNzpX4kRnDXEpgfQTqRsL_SuQeElaJGGSIkFKZA5EI2v2h-ZWE2uEpNaxj31ekr7bOl-Rm_J4L-t1QU8STMvB54iI_lYUDK_HAMQhlJhu0KOMTaVT3EDoxpLWyRLRTfD8LtUpXG_4CVtiJRxhvwWcJx3fbriewyavdilhbnTewfhBEzinlrQTG7Td01VfSqsHmzlTwKbeem6DOeoov858vxZUlGLqDgw4o5-nSt9iNYHJCVJ4o8XxEB1R8qAdUTZXhMlSRZ4bHaj9LHeWOsl-PluO3JpbCjbDrW4IuPtHJntcXKog5NDEG65a63iH_Lp-99cN6ySQ1AXJYh3HS8Qw7A3ZNDNgVOJcDcKCI3CLCP7foHtf8oM-6LkWPQDKF8M_2AQjTO3SvStKAFD7PAm4bfLFgIFMshKeVim672QnbDA5EjX9SviDKHVczzP6QTjMOVaDo3wd0kd8m9MoFPy5NML73gcAaMxPZtb1CCp-xPDWsXD8uK_FsJW6we-YbDR2Xzc9G15nGzRGStJiexsaj8Alw";
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



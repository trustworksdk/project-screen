
  const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkYXZpZC52aW5qZSIsImlhdCI6MTcyMTM4NTg0MSwiZXhwIjoxNzIxNDIxODQxLCJncm91cHMiOlsiVVNFUiJdLCJqdGkiOiI1OWRiYmM0Zi1iYzNjLTQ2MzItYTA3Mi00ZWQ1NDUyMDk2NWUifQ.I8hW2ycLxmUxi6wfmef9E3wd3ar8n8B7eg8G6kaCxfb1JPJZUQgQl6QYPE0oeeDkgi6JL2n3DTUovY3_tGx23nEHV8rj7WD_NmGTZ677SlkVTV0CZnZ8TfqzSZUZ9wJ9E8fZGQ3VNvidRjOrZ3YWWsNN18UvCY3m35UBbFmDTWO5k2aNa-ghmhQScV3uoFL-_wlgJq06NhD5yao-ToRoOX265nnlUM_o99WFYozMjE7HxGicjuHL3xI-XPzQbao132Cif6k-EE08YTAIfmGjzkpQXsJAoSnEocENfPQRxdEg47n6mDVN0h70eTGqOBlxlMCv1NCcwiVgA23fMebiTpQbrrPVp1KrwiYsgoeUKCW2aq3hodJ6Kc2RFV6abj1mR20OL3F_HTsyjrZuuq_2diwnjyt4_lsjGhZQlR2yxFsSIOSGLb2MoGdUFOl3gnLfm-XRA79K-rh1caitmTXDi9nTcCE9S58Pn5A_8dDNU2CMKvqefaaTuhPqFb680ZFdTvmwvK6P1Gkp5BRlc0Z9n52Hw0j1NCd_HmC8zIrM4faPQaj9Xo-2yconFwsb-yhXhz1GBRD8zJ0jYE7kpVU1Ig3rKTWgkq648QQbY45B0wzNZ3kXETPbw6EojHyQG3ZI_2Eu0_vZBLxCh1Ah9PrA5Lp3e4YsqYphGVO4LriEnWc";
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


